"use strict"

const converters = module.exports = {}

let generateHeader = repeat => {
    return (input, json2md) => {
        return "#".repeat(repeat) + " " + json2md(input)
    }
}

let indent = (content, spaces, ignoreFirst) => {
    let lines = content

    if (typeof content === "string") {
        lines = content.split("\n")
    }

    if (ignoreFirst) {
        if (lines.length <= 1) {
            return lines.join("\n")
        }
        return lines[0] + "\n" + indent(lines.slice(1), spaces, false)
    }

    return lines.map(c => " ".repeat(spaces) + c).join("\n")
}

let parseTextFormat = text => {

    let formats = {
        strong: "**"
      , italic: "*"
      , underline: "_"
      , strikethrough: "~~"
    }

    return text
            .replace(/<\/?strong\>/gi, formats.strong)
            .replace(/<\/?bold\>/gi, formats.strong)
            .replace(/<\/?em\>/gi, formats.italic)
            .replace(/<\/?italic\>/gi, formats.italic)
            .replace(/<\/?u\>/gi, formats.underline)
            .replace(/<\/?strike\>/gi, formats.strikethrough)

}

// Headings
converters.h1 = generateHeader(1)
converters.h2 = generateHeader(2)
converters.h3 = generateHeader(3)
converters.h4 = generateHeader(4)
converters.h5 = generateHeader(5)
converters.h6 = generateHeader(6)

converters.blockquote = (input, json2md) => {
    return json2md(input, "> ")
}

converters.img = (input, json2md) => {

    debugger
    if (Array.isArray(input)) {
        return json2md(input, "", "img")
    }
    if (typeof input === "string") {
        return converters.img({ source: input, title: "", alt: ""})
    }
    input.title = input.title || ""
    input.alt = input.alt || ""
    return "![" + input.alt + "](" + input.source + " \"" + input.title + "\")"
}

converters.ul = (input, json2md) => {
    let c = ""
    for (let i = 0; i < input.length; ++i) {
        let marker = ""

        let type = Object.keys(input[i])[0]
        if(type !== "ul" && type !== "ol" && type !== 'taskLists'){
          marker += "\n - "
        }

        c += marker + parseTextFormat(indent(json2md(input[i]), 4, true))
    }
    return c
}

converters.ol = (input, json2md) => {
    let c = ""
    let jumpCount = 0
    for (let i = 0; i < input.length; ++i) {
        let marker = ""
        let type = Object.keys(input[i])[0]
        if(type !== "ul" && type !== "ol" && type !== 'taskLists'){
          marker = "\n " + (i + 1 - jumpCount) + ". "
        } else {
          jumpCount++
        }

        c += marker + parseTextFormat(indent(json2md(input[i]), 4, true))
    }
    return c
}

converters.taskLists = (input, json2md) => {
    let c = ""
    for (let i = 0; i < input.length; ++i) {
        let marker = ""

        let type = Object.keys(input[i])[0]
        if(type !== "ul" && type !== "ol" && type !== 'taskLists'){
            marker += input[i].isDone ? "\n - [x] " : "\n - [ ] "
        }

        c += marker + parseTextFormat(indent(json2md(input[i].title || input[i]), 4, true))
    }
    return c
}

converters.code = (input, json2md) => {
    let c = "```" + (input.language || "") + "\n"
    if (Array.isArray(input.content)) {
        c += input.content.join("\n")
    } else {
        c += input.content
    }
    c += "\n```"
    return c
}

converters.p = (input, json2md) => {
    return parseTextFormat(json2md(input, "\n"))
}

converters.table = (input, json2md) => {

    const ALIGNMENT = {
          CENTER: 'center'
        , RIGHT: 'right'
        , LEFT: 'left'
        , NONE: 'none'
    }

    const PREFERRED_LENGTH_PER_ALIGNMENT = {
          [ALIGNMENT.CENTER]: 3
        , [ALIGNMENT.RIGHT]: 2
        , [ALIGNMENT.LEFT]: 2
        , [ALIGNMENT.NONE]: 1
    }

    if (typeof input !== "object"
        || !input.hasOwnProperty("headers")
        || !input.hasOwnProperty("rows")) {
        return ""
    }

    const alignment = input.headers.map((_, index) => input.aligns && input.aligns[index]
        ? input.aligns[index]
        : ALIGNMENT.NONE
    )

    // try to match the space the column name and the dashes (and colons) take up. Minimum depends on alignment
    const preferred_lengths = input.headers.map((header, index) => Math.max(
        PREFERRED_LENGTH_PER_ALIGNMENT[alignment[index]],
        header.length - 2
    ))

    if (input.pretty === true) {
        // update preferred_lengths considering rows' cells length
        input.rows.forEach(row => {
            (Array.isArray(row) ? row : input.headers.map(col_id => row[col_id]))
                .forEach((cell, index) => {
                    preferred_lengths[index] = Math.max(preferred_lengths[index], String(cell).length-2)
                })
        })
    }

    const fill_right = function(diff, header) {
        return " ".repeat(diff) + header;
    }
    const fill_left = function(diff, header) {
        return header + " ".repeat(diff);
    }
    const fill_center = function(diff, header) {
        return " ".repeat(Math.floor(diff/2)) + header + " ".repeat(Math.ceil(diff/2));
    }

    const fill_th = (header, index) => {
        const diff = preferred_lengths[index]+2 - header.length;
        switch (alignment[index]) {
            case ALIGNMENT.RIGHT:   return fill_right(diff, header);
            case ALIGNMENT.LEFT:    return fill_left(diff, header);
            case ALIGNMENT.CENTER:
            case ALIGNMENT.NONE:
            default:                return fill_center(diff, header);
        }
    };

    const fill_td = (header, index) => {
        const diff = preferred_lengths[index]+2 - header.length;
        switch (alignment[index]) {
            case ALIGNMENT.RIGHT:   return fill_right(diff, header);
            case ALIGNMENT.NONE:
            case ALIGNMENT.LEFT:    return fill_left(diff, header);
            case ALIGNMENT.CENTER:
            default:                return fill_center(diff, header);
        }
    };

    // add spaces around column name if necessary (side(s) depends on alignment)
    const column_names = input.headers.map(fill_th)

    const header = "| " + column_names.join(" | ") + " |";

    const spaces = "| " + input.headers.map((_, index) => {
        const inner = "-".repeat(preferred_lengths[index])
        switch (alignment[index]) {
            case ALIGNMENT.CENTER:  return ":" + inner + ":";
            case ALIGNMENT.RIGHT:   return "-" + inner + ":";
            case ALIGNMENT.LEFT:    return ":" + inner + "-";
            case ALIGNMENT.NONE:
            default:                return "-" + inner + "-";
        }
    }).join(" | ") + " |";

    const fill_tbody_cell = (cell, index) => {
        if(input.pretty !== true) return cell;
        return fill_td(cell, index);
    }

    const data  = input.rows.map(row =>
        "| " + (Array.isArray(row) ? row : input.headers.map(col_id => row[col_id]))
            .map(cell => json2md(cell))
            .map(cell => parseTextFormat(cell))
            .map(cell => cell.replace(/([^\\])\|/g, "$1\\|"))
            .map(cell => cell.trim())
            .map(fill_tbody_cell)
            .join(" | ")  + " |"
    ).join("\n");

    return [header, spaces, data].join("\n")
}

converters.link = (input, json2md) => {
    if (Array.isArray(input)) {
        return json2md(input, "", "link")
    }
    if (typeof input === "string") {
        return converters.link({ source: input, title: "" })
    }
    return "[" + input.title + "](" + input.source + ")"
}

converters.hr = (input, json2md) => {
    return '---'
}
