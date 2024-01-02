"use strict"

const converters = require("./converters")
    , indento = require("indento")

/**
 * json2md
 * Converts a JSON input to markdown.
 *
 * **Supported elements**
 *
 * | Type         | Element            | Data                                                                                                                     | Example                                                                                                                                          |
 * |--------------|--------------------|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
 * | `h1`         | Heading 1          | The heading text as string.                                                                                              | `{ h1: "heading 1" }`                                                                                                                            |
 * | `h2`         | Heading 2          | The heading text as string.                                                                                              | `{ h2: "heading 2" }`                                                                                                                            |
 * | `h3`         | Heading 3          | The heading text as string.                                                                                              | `{ h3: "heading 3" }`                                                                                                                            |
 * | `h4`         | Heading 4          | The heading text as string.                                                                                              | `{ h4: "heading 4" }`                                                                                                                            |
 * | `h5`         | Heading 5          | The heading text as string.                                                                                              | `{ h5: "heading 5" }`                                                                                                                            |
 * | `h6`         | Heading 6          | The heading text as string.                                                                                              | `{ h6: "heading 6" }`                                                                                                                            |
 * | `p`          | Paragraphs         | The paragraph text as string or array (multiple paragraphs).                                                             | `{ p: "Hello World"}` or multiple paragraphs: `{ p: ["Hello", "World"] }`                                                                        |
 * | `blockquote` | Blockquote         | The blockquote as string or array (multiple blockquotes)                                                                 | `{ blockquote: "Hello World"}` or multiple blockquotes: `{ blockquote: ["Hello", "World"] }`                                                     |
 * | `img`        | Image              | An object or an array of objects containing the `title`, `source` and `alt`  fields.                                     | `{ img: { title: "My image title", source: "http://example.com/image.png", alt: "My image alt" } }`                                              |
 * | `ul`         | Unordered list     | An array of strings or lists representing the items.                                                                     | `{ ul: ["item 1", "item 2"] }`                                                                                                                   |
 * | `ol`         | Ordered list       | An array of strings or lists representing the items.                                                                     | `{ ol: ["item 1", "item 2"] }`                                                                                                                   |
 * | `hr`         | Separator          | None                                                                                                                     | `{ hr: "" }`                                                                                                                                     |
 * | `code`       | Code block element | An object containing the `language` (`String`) and `content` (`Array` or `String`)  fields.                              | `{ code: { "language": "html", "content": "<script src='dummy.js'></script>" } }`                                                                |
 * | `table`      | Table              | An object containing the `headers` (`Array` of `String`s) and `rows` (`Array` of `Array`s or `Object`s).                 | `{ table: { headers: ["a", "b"], rows: [{ a: "col1", b: "col2" }] } }` or `{ table: { headers: ["a", "b"], rows: [["col1", "col2"]] } }`         |
 * | `link`       | Link               | An object containing the `title` and the `source` fields.                                                                | `{ title: 'hello', source: 'https://ionicabizau.net' }`                                                                                          |
 *
 *
 * You can extend the `json2md.converters` object to support your custom types.
 *
 * ```js
 * json2md.converters.sayHello = function (input, json2md) {
 *    return "Hello " + input + "!"
 * }
 * ```
 *
 * Then you can use it:
 *
 * ```js
 * json2md({ sayHello: "World" })
 * // => "Hello World!"
 * ```
 *
 * @name json2md
 * @function
 * @param {Array|Object|String} data The input JSON data.
 * @param {String} prefix A snippet to add before each line.
 * @return {String} The generated markdown result.
 */
function json2md(data, prefix, _type) {
    prefix = prefix || ""
    if (typeof data === "string" || typeof data === "number") {
        return indento(data, 1, prefix)
    }

    let content = []

    // Handle arrays
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; ++i) {
            content.push(indento(json2md(data[i], "", _type), 1, prefix))
        }
        return content.join("\n")
    } else if (_type) {
    	let mdText = "";
        let func = converters[_type || type];
        if (typeof func === "function") {
            mdText += indento(func(_type ? data : data[type], json2md), 1, prefix) + "\n";
        } else {
            throw new Error("There is no such converter: " + type);
        }
        return mdText
    } else {
    	let mdText = "";
        Object.keys(data).forEach((type, index, array) => {
            let func = converters[_type || type];

            if (typeof func === "function") {
                mdText += indento(func(_type ? data : data[type], json2md), 1, prefix) + "\n";
            } else {
                throw new Error("There is no such converter: " + type);
            }
        });
        return mdText;
    }
}

/**
 * @param {Array|Object|String} data The input JSON data.
 * @param {String} prefix A snippet to add before each line.
 * @return {Promise.<String, Error>} The generated markdown result.
 */
json2md.async = (data, prefix, _type) => Promise.resolve().then(() => {
    prefix = prefix || ""
    if (typeof data === "string" || typeof data === "number") {
        return indento(data, 1, prefix)
    }

    let content = []

    // Handle arrays
    if (Array.isArray(data)) {
        const promises = data.map((d, index) => Promise.resolve()
            .then(() => json2md.async(d, "", _type))
            .then((result) => indento(result, 1, prefix))
            .then((result) => {
                content[index] = result;
            })
        )
        return Promise.all(promises).then(() => content.join("\n"))
    } else {
        let type = Object.keys(data)[0]
          , func = converters[_type || type]

        if (typeof func === "function") {
            return Promise.resolve()
                .then(() => func(_type ? data : data[type], json2md))
                .then((result) => indento(result, 1, prefix) + "\n")
        }
        throw new Error("There is no such converter: " + type)
    }
})

json2md.converters = converters

module.exports = json2md
