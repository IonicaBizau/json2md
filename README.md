
[![json2md](http://i.imgur.com/uj64JFw.png)](#)

# json2md

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/json2md.svg)](https://www.npmjs.com/package/json2md) [![Downloads](https://img.shields.io/npm/dt/json2md.svg)](https://www.npmjs.com/package/json2md) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> A JSON to Markdown converter.

If you're looking to use this on the client side, that's also possible. Check out the [`dist`](/dist) directory.

## :cloud: Installation

```sh
$ npm i --save json2md
```


## :clipboard: Example



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

## :memo: Documentation


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
| `img`        | Image              | An object or an array of objects containing the `title` and `source` fields.                                             | `{ img: { title: "My image title", source: "http://example.com/image.png" } }`                                                                   |
| `ul`         | Unordered list     | An array of strings representing the items.                                                                              | `{ ul: ["item 1", "item 2"] }`                                                                                                                   |
| `ol`         | Ordered list       | An array of strings representing the items.                                                                              | `{ ol: ["item 1", "item 2"] }`                                                                                                                   |
| `code`       | Code block element | An object containing the `language` (`String`) and `content` (`Array` or `String`)  fields.                              | `{ code: { "language": "html", "content": "<script src='dummy.js'></script>" } }`                                                                |
| `table`      | Table              | An object containing the `headers` (`Array` of `String`s) and `rows` (`Array` of `Array`s or `Object`s).                 | `{ table: { headers: ["a", "b"], rows: [{ a: "col1", b: "col2" }] } }` or `{ table: { headers: ["a", "b"], rows: [["col1", "col2"]] } }`         |

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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`doc-cli`](https://github.com/cnio/doc-cli#readme) (by CNIO)—doc generator for nodejs
 - [`react-docgen-markdown`](https://github.com/Moezalez/react-docgen-markdown#readme) (by Moritz Sattler)—
 - [`terraform2md`](https://github.com/shambarick/terraform2md#readme) (by Bryan LOT)—Generate the Markdown from a terraform.tfstate file.I am using this library to generate documentation for my projects, being integrated with [blah](https://github.com/IonicaBizau/node-blah).

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
