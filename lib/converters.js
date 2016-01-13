// converters
var converters = module.exports = {};

function generateHeader(repeat) {
    return function (input, json2md) {
        return "#".repeat(repeat) + " " + json2md(input);
    }
}

function indent(content, spaces, ignoreFirst) {
    var lines = content;
    if (typeof content === "string") {
        lines = content.split("\n");
    }

    if (ignoreFirst) {
        if (lines.length <= 1) {
            return lines.join("\n");
        }
        return lines[0] + "\n" + indent(lines.slice(1), spaces, false);
    }

    return lines.map(function (c) {
        return " ".repeat(spaces) + c;
    }).join("\n");
}

function parseTextFormat (text) {
    var formats = {
        strong: "**"
        ,italic: "*"
    };
    var formated = text.replace(/\<\/?strong\>/gi, formats.strong);
    formated = formated.replace(/\<\/?bold\>/gi, formats.strong);
    formated = formated.replace(/\<\/?em\>/gi, formats.italic);
    formated = formated.replace(/\<\/?italic\>/gi, formats.italic);
    return formated;
}

// Headings
converters.h1 = generateHeader(1);
converters.h2 = generateHeader(2);
converters.h3 = generateHeader(3);
converters.h4 = generateHeader(4);
converters.h5 = generateHeader(5);
converters.h6 = generateHeader(6);

converters.blockquote = function (input, json2md) {
    return json2md(input, "> ") + "\n";
};

converters.img = function (input, json2md) {
    if (Array.isArray(input)) {
        return json2md(input, "", "img");
    }
    if (typeof input === "string") {
        return converters.img({ source: input, title: "" });
    }
    input.title = input.title || "";
    return "![" + input.title + "](" + input.source + ")\n";
};

converters.ul = function (input, json2md) {
    for (var i = 0, c = ""; i < input.length; ++i) {
        c += "\n - " + parseTextFormat(indent(json2md(input[i]), 4, true));
    }
    return c + "\n";
};

converters.ol = function (input, json2md) {
    for (var i = 0, c = ""; i < input.length; ++i) {
        c += "\n " + (i + 1) + ". " + parseTextFormat(indent(json2md(input[i]), 4, true));
    }
    return c + "\n";
};

converters.code = function (input, json2md) {
    var c = "```" + (input.language || "") + "\n";
    if (Array.isArray(input.content)) {
        c += input.content.join("\n");
    } else {
        c += input.content;
    }
    c += "\n```";
    return c;
};

converters.p = function (input, json2md) {
    return parseTextFormat(json2md(input, "\n")) + "\n";
};

converters.table = function(input, json2md) {
    if (typeof input != 'object') {
        return '';
    }
    if (!input.hasOwnProperty('headers') || !input.hasOwnProperty('rows')) {
        return '';
    }
    var header = input.headers.join(' | ');
    var spaces = input.headers.map(function() { return '---'; }).join(' | ');
    var data  = input.rows.map(function(r) {
        return input.headers.map(function(h) {
            return parseTextFormat(json2md(r[h] ? r[h] + "" : ""));
        }).join(' | ');
    }).join('\n');

    return [header, spaces, data].join('\n');
};
