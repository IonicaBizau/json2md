// converters
var converters = module.exports = {};

function generateHeader(repeat) {
    return function (input, json2md) {
        return "#".repeat(repeat) + " " + json2md(input);
    }
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
        debugger
        return json2md(input, "", "img");
    }
    if (typeof input === "string") {
        return converters.img({ source: input, title: "" });
    }
    input.title = input.title || "";
    return "![" + input.title + "](" + input.source + ")\n";
};

converters.ul = function (input, json2md) {
    return "\n" + json2md(input, " - ") + "\n";
};

converters.ol = function (input, json2md) {
    for (var i = 0, c = ""; i < input.length; ++i) {
        c += json2md(input[i], "\n " + (i + 1) + ". ");
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
    return json2md(input, "\n") + "\n";
};
