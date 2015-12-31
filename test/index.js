// Dependencies
var json2md = require("../lib")
  , Assert = require("assert")
  ;

// Headings
it("should support headings", function (cb) {
    Assert.equal(json2md({ h1: "Heading 1" }), "# Heading 1");
    Assert.equal(json2md({ h2: "Heading 2" }), "## Heading 2");
    Assert.equal(json2md({ h3: "Heading 3" }), "### Heading 3");
    Assert.equal(json2md({ h4: "Heading 4" }), "#### Heading 4");
    Assert.equal(json2md({ h5: "Heading 5" }), "##### Heading 5");
    Assert.equal(json2md({ h6: "Heading 6" }), "###### Heading 6");
    cb();
});

// Blockquote
it("should support blockquotes", function (cb) {
    Assert.equal(json2md({ blockquote: "Some content" }), "> Some content\n");
    cb();
});

// Images
it("should support images", function (cb) {
    Assert.equal(json2md({
        img: {
            source: "source"
          , title: "title"
        }
    }), "![title](source)\n");
    cb();
});

// Unordered lists
it("should support unordered lists", function (cb) {
    Assert.equal(json2md({
        ul: [
            "item 1"
          , "item 2"
        ]
    }), "\n - item 1\n - item 2\n");
    cb();
});

it("should support unordered lists with emphasis format", function (cb) {
    Assert.equal(json2md({
        ul: [
            "<em>item 1</em>"
          , "<bold>item 2</bold>"
        ]
    }), "\n - *item 1*\n - **item 2**\n");
    cb();
});

// Ordered lists
it("should support ordered lists", function (cb) {
    Assert.equal(json2md({
        ol: [
            "item 1"
          , "item 2"
        ]
    }), "\n 1. item 1\n 2. item 2\n");
    cb();
});

// Code blocks
it("should support code blocks", function (cb) {
    Assert.equal(json2md({
        code: {
            language: "js"
          , content: [
              "function sum (a, b) {"
            , "   return a + b;"
            , "}"
            , "sum(1, 2);"
            ]
        }
    }), "```js\nfunction sum (a, b) {\n   return a + b;\n}\nsum(1, 2);\n```");
    cb();
});

// Paragraphs
it("should support paragraphs", function (cb) {
    Assert.equal(json2md({
        p: [
            "Two"
          , "Paragraphs"
        ]
    }), "\nTwo\n\nParagraphs\n");
    cb();
});

it("should support paragraphs with bold text", function (cb) {
    Assert.equal(json2md({
        p: [
            "Two <bold>more words</bold>"
          , "in this paragraph, <strong>right?</strong>"
        ]
    }), "\nTwo **more words**\n\nin this paragraph, **right?**\n");
    cb();
});

// Custom converters
it("should support custom types", function (cb) {
    json2md.converters.sayHello = function (input, json2md) {
        return "Hello " + input + "!";
    };
    Assert.equal(json2md({ sayHello: "World" }), "Hello World!")
    cb();
});

// Code blocks in lists
it("should correctly indent code blocks in lists", function (cb) {
    Assert.equal(json2md({
        ol: [
            [
                "Copy the code below:",
                {
                    code: {
                        language: "js"
                      , content: [
                          "function sum (a, b) {"
                        , "   return a + b;"
                        , "}"
                        , "sum(1, 2);"
                        ]
                    }
                }
            ]
        ]
    }),
`\n 1. Copy the code below:
    \`\`\`js
    function sum (a, b) {
       return a + b;
    }
    sum(1, 2);
    \`\`\`
`   )
    cb();
});

it("should correctly indent code blocks in unordered lists", function (cb) {
    Assert.equal(json2md({
        ul: [
            [
                "Copy the code below:",
                {
                    code: {
                        language: "js"
                      , content: [
                          "function sum (a, b) {"
                        , "   return a + b;"
                        , "}"
                        , "sum(1, 2);"
                        ]
                    }
                }
            ]
        ]
    }),
`\n - Copy the code below:
    \`\`\`js
    function sum (a, b) {
       return a + b;
    }
    sum(1, 2);
    \`\`\`
`   )
    cb();
});
