[![json2md](http://i.imgur.com/uj64JFw.png)](#)

# json2md [![Support this project][donate-now]][paypal-donations]
A JSON to Markdown converter.

## Installation

```sh
$ npm i json2md
```

## Example

```js
// Dependencies
var json2md = require("json2md");

console.log(json2md([
    { h1: "JSON To Markdown" }
  , { blockquote: "A JSON to Markdown converter." }
  , { img: [
        { title: "Some image", source: "https://example.com/some-image.png" }
      , { title: "Another image", source: "https://example.com/some-image1.png" }
      , { title: "Yet another image", source: "https://example.com/some-image2.png" }
      ]
    }
  , { h2: "Features" }
  , { ul: [
        "Easy to use"
      , "You can programatically generate Markdown content"
      , "..."
      ]
    }
  , { h2: "How to contribute" }
  , { ol: [
        "Fork the project"
      , "Create your branch"
      , "Raise a pull request"
      ]
    }
  , { h2: "Code blocks" }
  , { p: "Below you can see a code block example." }
  , { "code": {
        language: "js"
      , content: [
          "function sum (a, b) {"
        , "   return a + b;"
        , "}"
        , "sum(1, 2);"
        ]
      }
    }
]));
// =>
// # JSON To Markdown
// > A JSON to Markdown converter.
//
// ![Some image](https://example.com/some-image.png)
//
// ![Another image](https://example.com/some-image1.png)
//
// ![Yet another image](https://example.com/some-image2.png)
//
// ## Features
//
//  - Easy to use
//  - You can programatically generate Markdown content
//  - ...
//
// ## How to contribute
//
//  1. Fork the project
//  2. Create your branch
//  3. Raise a pull request
//
// ## Code blocks
//
// Below you can see a code block example.
//
// ```js
// function sum (a, b) {
//    return a + b;
// }
// sum(1, 2);
// ```
```

## Documentation

### `json2md(data, prefix)`
Converts a JSON input to markdown.

**Supported elements**

| Type         | Element            | Data                                                                                        | Example                                                                                      |
|--------------|--------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `h1`         | Heading 1          | The heading text as string.                                                                 | `{ h1: "heading 1" }`                                                                        |
| `h2`         | Heading 2          | The heading text as string.                                                                 | `{ h2: "heading 2" }`                                                                        |
| `h3`         | Heading 3          | The heading text as string.                                                                 | `{ h3: "heading 3" }`                                                                        |
| `h4`         | Heading 4          | The heading text as string.                                                                 | `{ h4: "heading 4" }`                                                                        |
| `h5`         | Heading 5          | The heading text as string.                                                                 | `{ h5: "heading 5" }`                                                                        |
| `h6`         | Heading 6          | The heading text as string.                                                                 | `{ h6: "heading 6" }`                                                                        |
| `p`          | Paragraphs         | The paragraph text as string or array (multiple paragraphs).                                | `{ p: "Hello World"}` or multiple paragraphs: `{ p: ["Hello", "World"] }`                    |
| `blockquote` | Blockquote         | The blockquote as string or array (multiple blockquotes)                                    | `{ blockquote: "Hello World"}` or multiple blockquotes: `{ blockquote: ["Hello", "World"] }` |
| `img`        | Image              | An object or an array of objects containing the `title` and `source` fields.                | `{ img: { title: "My image title", source: "http://example.com/image.png" } }`               |
| `ul`         | Unordered list     | An array of strings representing the items.                                                 | `{ ul: ["item 1", "item 2"] }`                                                               |
| `ol`         | Ordered list       | An array of strings representing the items.                                                 | `{ ol: ["item 1", "item 2"] }`                                                               |
| `code`       | Code block element | An object containing the `language` (`String`) and `content` (`Array` or `String`)  fields. |                                                                                              |

You can extend the `json2md.converters` object to support your custom types.

```js
json2md.converters.sayHello = function (input, json2md) {
   return "Hello " + input + "!";
};
```

Then you can use it:

```js
json2md({ sayHello: "World" });
// => "Hello World!"
```

#### Params
- **Array|Object|String** `data`: The input JSON data.
- **String** `prefix`: A snippet to add before each line.

#### Return
- **String** The generated markdown result.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - I am using this library to generate documentation for my projects, being integrated with [blah](https://github.com/IonicaBizau/node-blah)

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015
[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
