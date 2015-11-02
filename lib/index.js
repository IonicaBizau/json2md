// Converters
var Converters = {};

function generateHeader(repeat) {
    return function (input) {
        return "#".repeat(repeat) + " " + JsonToMarkdown(input);
    }
}

// Headings
Converters.h1 = generateHeader(1);
Converters.h2 = generateHeader(2);
Converters.h3 = generateHeader(3);
Converters.h4 = generateHeader(4);
Converters.h5 = generateHeader(5);
Converters.h6 = generateHeader(6);

Converters.blockquote = function (input) {
    return JsonToMarkdown(input, "> ") + "\n";
};

Converters.img = function (input) {
    if (Array.isArray(input)) {
        debugger
        return JsonToMarkdown(input, "", "img");
    }
    if (typeof input === "string") {
        return Converters.img({ source: input, title: "" });
    }
    input.title = input.title || "";
    return "![" + input.title + "](" + input.source + ")\n";
};

Converters.ul = function (input) {
    return "\n" + JsonToMarkdown(input, " - ") + "\n";
};

Converters.ol = function (input) {
    for (var i = 0, c = ""; i < input.length; ++i) {
        c += JsonToMarkdown(input[i], "\n " + (i + 1) + ". ");
    }
    return c + "\n";
};

Converters.code = function (input) {
    var c = "```" + (input.language || "") + "\n";
    c += input.content.join("\n") + "\n";
    c += "```";
    return c;
};

Converters.p = function (input) {
    return JsonToMarkdown(input, "\n") + "\n";
};

/**
 * JsonToMarkdown
 * Converts a JSON input to markdown.
 *
 * @name JsonToMarkdown
 * @function
 * @param {Array|Object|String} data The input JSON data.
 * @param {String} prefix A snippet to add before each line.
 * @return {String} The generated markdown result.
 */
function JsonToMarkdown(data, prefix, _type) {
    prefix = prefix || "";
    if (typeof data === "string") {
        return prefix + data;
    }

    var content = [];

    // Handle arrays
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; ++i) {
            content.push(prefix + JsonToMarkdown(data[i], "", _type));
        }
        return content.join("\n");
    } else {
        var type = Object.keys(data)[0]
          , func = Converters[_type || type]
          ;

        if (typeof func === "function") {
            return func(_type ? data : data[type]);
        }
        throw new Error("There is no such converter: " + type);
    }
}

JsonToMarkdown.Converters = Converters;

module.exports = JsonToMarkdown;
