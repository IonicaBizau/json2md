const json2md = require("../lib");

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
      , "You can programmatically generate Markdown content"
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
//  - You can programmatically generate Markdown content
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
