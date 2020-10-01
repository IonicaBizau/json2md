## Documentation

You can see below the API reference of this module.

### `json2md(data, prefix)`
Converts a JSON input to markdown.

**Supported elements**

| Type         | Element            | Data                                                                                                                     | Example                                                                                                                                          |
|--------------|--------------------|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `h1`         | Heading 1          | The heading text as string.                                                                                              | `{ h1: "heading 1" }`                                                                                                                            |
| `h2`         | Heading 2          | The heading text as string.                                                                                              | `{ h2: "heading 2" }`                                                                                                                            |
| `h3`         | Heading 3          | The heading text as string.                                                                                              | `{ h3: "heading 3" }`                                                                                                                            |
| `h4`         | Heading 4          | The heading text as string.                                                                                              | `{ h4: "heading 4" }`                                                                                                                            |
| `h5`         | Heading 5          | The heading text as string.                                                                                              | `{ h5: "heading 5" }`                                                                                                                            |
| `h6`         | Heading 6          | The heading text as string.                                                                                              | `{ h6: "heading 6" }`                                                                                                                            |
| `p`          | Paragraphs         | The paragraph text as string or array (multiple paragraphs).                                                             | `{ p: "Hello World"}` or multiple paragraphs: `{ p: ["Hello", "World"] }`                                                                        |
| `blockquote` | Blockquote         | The blockquote as string or array (multiple blockquotes)                                                                 | `{ blockquote: "Hello World"}` or multiple blockquotes: `{ blockquote: ["Hello", "World"] }`                                                     |
| `img`        | Image              | An object or an array of objects containing the `title`, `source` and `alt`  fields.                                     | `{ img: { title: "My image title", source: "http://example.com/image.png", alt: "My image alt" } }`                                                                   |
| `ul`         | Unordered list     | An array of strings representing the items.                                                                              | `{ ul: ["item 1", "item 2"] }`                                                                                                                   |
| `ol`         | Ordered list       | An array of strings representing the items.                                                                              | `{ ol: ["item 1", "item 2"] }`                                                                                                                   |
| `code`       | Code block element | An object containing the `language` (`String`) and `content` (`Array` or `String`)  fields.                              | `{ code: { "language": "html", "content": "<script src='dummy.js'></script>" } }`                                                                |
| `table`      | Table              | An object containing the `headers` (`Array` of `String`s) and `rows` (`Array` of `Array`s or `Object`s).                 | `{ table: { headers: ["a", "b"], rows: [{ a: "col1", b: "col2" }] } }` or `{ table: { headers: ["a", "b"], rows: [["col1", "col2"]] } }`         |
| `link`       | Link               | An object containing the `title` and the `source` fields.                                                                | `{ title: 'hello', source: 'https://ionicabizau.net' }

You can extend the `json2md.converters` object to support your custom types.

```js
json2md.converters.sayHello = function (input, json2md) {
   return "Hello " + input + "!"
}
```

Then you can use it:

```js
json2md({ sayHello: "World" })
// => "Hello World!"
```

#### Params

- **Array|Object|String** `data`: The input JSON data.
- **String** `prefix`: A snippet to add before each line.

#### Return
- **String** The generated markdown result.

### async

#### Params

- **Array|Object|String** `data`: The input JSON data.
- **String** `prefix`: A snippet to add before each line.

#### Return
- **Promise.\<String, Error>** The generated markdown result.

