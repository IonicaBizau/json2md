var JsonToMarkdown = require("../lib")
  , Assert = require("assert")
  ;

// Headings
it("should support headings", function (cb) {
    Assert.equal(JsonToMarkdown({ h1: "Heading 1" }), "# Heading 1");
    Assert.equal(JsonToMarkdown({ h2: "Heading 2" }), "## Heading 2");
    Assert.equal(JsonToMarkdown({ h3: "Heading 3" }), "### Heading 3");
    Assert.equal(JsonToMarkdown({ h4: "Heading 4" }), "#### Heading 4");
    Assert.equal(JsonToMarkdown({ h5: "Heading 5" }), "##### Heading 5");
    Assert.equal(JsonToMarkdown({ h6: "Heading 6" }), "###### Heading 6");
});

// Blockquote
it("should support blockquotes", function (cb) {
    Assert.equal(JsonToMarkdown({ blockquote: "Some content" }), "> Some content");
});

// Images
it("should support images", function (cb) {
    Assert.equal(JsonToMarkdown({
        img: {
            source; "source"
          , title: "title"
        }
    }), "![title](source)");
});

// Unordered lists
it("should support unordered lists", function (cb) {
    Assert.equal(JsonToMarkdown({
        ul: [
            "item 1"
          , "item 2"
        ]
    }), " - item 1\n - item 2");
});

// Ordered lists
it("should support ordered lists", function (cb) {
    Assert.equal(JsonToMarkdown({
        ol: [
            "item 1"
          , "item 2"
        ]
    }), " 1. item 1\n 2. item 2");
});

// Code blocks
it("should support code blocks", function (cb) {
    Assert.equal(JsonToMarkdown({
        code: {
            language: "js"
          , content: [
              "function sum (a, b) {"
            , "   return a + b;"
            , "}"
            , "sum(1, 2);"
            ]
        }
    }), "```js\nfunction sum (a, b) {\n   return a + b;\n}\nsum(1, 2);");
});

// Paragraphs
it("should support paragraphs", function (cb) {
    Assert.equal(JsonToMarkdown({
        p: [
            "Two"
          , "Paragraphs"
        ]
    }), "Two\nParagraphs");
});
