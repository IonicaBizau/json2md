// Dependencies
var json2md = require("../lib"),
    tester = require("tester");

tester.describe("json2md", test => {
    // Headings
    test.it("should support headings", function(cb) {
        test.expect(json2md({
            h1: "Heading 1"
        })).toBe("# Heading 1\n");
        test.expect(json2md({
            h2: "Heading 2"
        })).toBe("## Heading 2\n");
        test.expect(json2md({
            h3: "Heading 3"
        })).toBe("### Heading 3\n");
        test.expect(json2md({
            h4: "Heading 4"
        })).toBe("#### Heading 4\n");
        test.expect(json2md({
            h5: "Heading 5"
        })).toBe("##### Heading 5\n");
        test.expect(json2md({
            h6: "Heading 6"
        })).toBe("###### Heading 6\n");
        cb();
    });

    // Blockquote
    test.it("should support blockquotes", function(cb) {
        test.expect(json2md({
            blockquote: "Some content"
        })).toBe("> Some content\n");
        cb();
    });

    // Images
    test.it("should support images", function(cb) {
        test.expect(json2md({
            img: {
                source: "source",
                title: "title"
            }
        })).toBe("![title](source)\n");
        cb();
    });

    // Unordered lists
    test.it("should support unordered lists", function(cb) {
        test.expect(json2md({
            ul: [
                "item 1", "item 2"
            ]
        })).toBe("\n - item 1\n - item 2\n");
        cb();
    });

    test.it("should support unordered lists with emphasis format", function(cb) {
        test.expect(json2md({
            ul: [
                "<em>item 1</em>", "<bold>item 2</bold>"
            ]
        })).toBe("\n - *item 1*\n - **item 2**\n");
        cb();
    });

    // Ordered lists
    test.it("should support ordered lists", function(cb) {
        test.expect(json2md({
            ol: [
                "item 1", "item 2"
            ]
        })).toBe("\n 1. item 1\n 2. item 2\n");
        cb();
    });

    // Code blocks
    test.it("should support code blocks", function(cb) {
        test.expect(json2md({
            code: {
                language: "js",
                content: [
                    "function sum (a, b) {",
                    "   return a + b;",
                    "}",
                    "sum(1, 2);"
                ]
            }
        })).toBe("```js\nfunction sum (a, b) {\n   return a + b;\n}\nsum(1, 2);\n```\n");
        cb();
    });

    // Paragraphs
    test.it("should support paragraphs", function(cb) {
        test.expect(json2md({
            p: [
                "Two", "Paragraphs"
            ]
        })).toBe("\nTwo\n\nParagraphs\n");
        cb();
    });

    test.it("should support paragraphs with bold text", function(cb) {
        test.expect(json2md({
            p: [
                "Two <bold>more words</bold>", "in this paragraph, <strong>right?</strong>"
            ]
        })).toBe("\nTwo **more words**\n\nin this paragraph, **right?**\n");
        cb();
    });

    // Custom converters
    test.it("should support custom types", function(cb) {
        json2md.converters.sayHello = function(input, json2md) {
            return "Hello " + input + "!";
        };
        test.expect(json2md({
            sayHello: "World"
        })).toBe("Hello World!\n")
        cb();
    });

    // Code blocks in lists
    test.it("should correctly indent code blocks in lists", function(cb) {
        test.expect(json2md({
            ol: [
                [
                    "Copy the code below:", {
                        code: {
                            language: "js",
                            content: [
                                "function sum (a, b) {",
                                "   return a + b;",
                                "}",
                                "sum(1, 2);"
                            ]
                        }
                    }
                ]
            ]
        })).toBe(`
 1. Copy the code below:
    \`\`\`js
    function sum (a, b) {
       return a + b;
    }
    sum(1, 2);
    \`\`\`
    \n`);
        cb();
    });

    test.it("should correctly indent code blocks in unordered lists", function(cb) {
        test.expect(json2md({
            ul: [
                [
                    "Copy the code below:", {
                        code: {
                            language: "js",
                            content: [
                                "function sum (a, b) {", "   return a + b;", "}", "sum(1, 2);"
                            ]
                        }
                    }
                ]
            ]
        })).toBe(`
 - Copy the code below:
    \`\`\`js
    function sum (a, b) {
       return a + b;
    }
    sum(1, 2);
    \`\`\`
    \n`);
        cb();
    });

    test.it("should work when input is number", function(cb) {
        test.expect(json2md({
            blockquote: 123
        })).toBe("> 123\n");
        cb();
    });

    test.it("should support tables, rows is objects", function(cb) {
        test.expect(json2md({
            table: {
                headers: ["a", "b"],
                rows: [{
                    a: "col1",
                    b: "col2"
                }]
            }
        })).toBe("a | b\n--- | ---\ncol1 | col2\n");
        cb();
    })

    test.it("should support tables, rows is arrays", function(cb) {
        test.expect(json2md({
            table: {
                headers: ["a", "b"],
                rows: [
                    ["col1", "col2"]
                ]
            }
        })).toBe("a | b\n--- | ---\ncol1 | col2\n");
        cb();
    })
});
