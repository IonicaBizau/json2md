"use strict";

const converters = module.exports = {};

let generateHeader = repeat => {
    return (input, json2md) => {
        return "#".repeat(repeat) + " " + json2md(input);
    };
};

let indent = (content, spaces, ignoreFirst) => {
    let lines = content;

    if (typeof content === "string") {
        lines = content.split("\n");
    }

    if (ignoreFirst) {
        if (lines.length <= 1) {
            return lines.join("\n");
        }
        return lines[0] + "\n" + indent(lines.slice(1), spaces, false);
    }

    return lines.map(c => " ".repeat(spaces) + c).join("\n");
}

let parseTextFormat = text => {

    let formats = {
        strong: "**"
      , italic: "*"
    };

    return text
            .replace(/\<\/?strong\>/gi, formats.strong)
            .replace(/\<\/?bold\>/gi, formats.strong)
            .replace(/\<\/?em\>/gi, formats.italic)
            .replace(/\<\/?italic\>/gi, formats.italic)
            ;
}

// Headings
converters.h1 = generateHeader(1);
converters.h2 = generateHeader(2);
converters.h3 = generateHeader(3);
converters.h4 = generateHeader(4);
converters.h5 = generateHeader(5);
converters.h6 = generateHeader(6);

converters.blockquote = (input, json2md) => {
    return json2md(input, "> ") + "\n";
};

converters.img = (input, json2md) => {
    if (Array.isArray(input)) {
        return json2md(input, "", "img");
    }
    if (typeof input === "string") {
        return converters.img({ source: input, title: "" });
    }
    input.title = input.title || "";
    return "![" + input.title + "](" + input.source + ")\n";
};

converters.ul = (input, json2md) => {
    let c = "";
    for (let i = 0; i < input.length; ++i) {
        c += "\n - " + parseTextFormat(indent(json2md(input[i]), 4, true));
    }
    return c + "\n";
};

converters.ol = (input, json2md) => {
    let c = "";
    for (let i = 0; i < input.length; ++i) {
        c += "\n " + (i + 1) + ". " + parseTextFormat(indent(json2md(input[i]), 4, true));
    }
    return c + "\n";
};

converters.code = (input, json2md) => {
    let c = "```" + (input.language || "") + "\n";
    if (Array.isArray(input.content)) {
        c += input.content.join("\n");
    } else {
        c += input.content;
    }
    c += "\n```";
    return c;
};

converters.p = (input, json2md) => {
    return parseTextFormat(json2md(input, "\n")) + "\n";
};

converters.table = (input, json2md) => {

    if (typeof input != "object"
        || !input.hasOwnProperty("headers")
        || !input.hasOwnProperty("rows")) {
        return "";
    }

    let header = input.headers.join(" | ")
      , spaces = input.headers.map(() => "---").join(" | ")
      , data  = input.rows.map(r =>
            Array.isArray(r)
                ? r.map(el => parseTextFormat(json2md(el))).join(" | ")
                : input.headers.map(h => parseTextFormat(json2md(r[h]))).join(" | ")
        ).join("\n")
      ;

    return [header, spaces, data].join("\n");
};
