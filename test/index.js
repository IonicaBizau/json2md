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
                title: "title",
                alt: 'alt',
            }
        })).toBe('![alt](source "title")\n');
        cb();
    });

    // Links
    test.it("should support links", function(cb) {
        test.expect(json2md({
            link: {
                source: "source",
                title: "title"
            }
        })).toBe("[title](source)\n");
        cb();
    });

    // Horizontal rule
    test.it("should support horizontal rule", function(cb) {
        test.expect(json2md({
            hr: ''
        })).toBe("---\n");
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

    test.it("should support paragraphs with underline", function(cb) {
        test.expect(json2md({
            p: [
                "Two <u>more words</u>", "in this paragraph, <u>right?</u>"
            ]
        })).toBe("\nTwo _more words_\n\nin this paragraph, _right?_\n");
        cb();
    });

    test.it("should support paragraphs with strikethrough", function(cb) {
        test.expect(json2md({
            p: [
                "Two <strike>more words</strike>", "in this paragraph, <strike>right?</strike>"
            ]
        })).toBe("\nTwo ~~more words~~\n\nin this paragraph, ~~right?~~\n");
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
        })).toBe("|  a  |  b  |\n| --- | --- |\n| col1 | col2 |\n");
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
        })).toBe("|  a  |  b  |\n| --- | --- |\n| col1 | col2 |\n");
        cb();
    })

    test.it("should support tables aligns", function(cb) {
        test.expect(json2md({
            table: {
                headers: ["a", "b", "c", "d"],
                rows: [
                    ["col1", "col2", "col3", "col4"]
                ],
                aligns: ["", "center", "left", "right"],
            }
        })).toBe("|  a  |   b   | c    |    d |\n| --- | :---: | :--- | ---: |\n| col1 | col2 | col3 | col4 |\n");
        cb();
    })

    test.it("should support tables and match column name length with dashes", function(cb) {
        test.expect(json2md({
            table: {
                headers: ["name", "amount", "somesuperlongword", "a"],
                rows: [
                    ["col1", "col2", "col3", "col4"]
                ],
                aligns: ["", "center", "left", "right"],
            }
        })).toBe("| name | amount | somesuperlongword |    a |\n| ---- | :----: | :---------------- | ---: |\n| col1 | col2 | col3 | col4 |\n");
        cb();
    })

    test.it("should support tables and escape any \"|\"'s", function(cb) {
        test.expect(json2md({
            table: {
                headers: ["a", "b"],
                rows: [
                    ["col|1", "col\\|2"]
                ]
            }
        })).toBe("|  a  |  b  |\n| --- | --- |\n| col\\|1 | col\\|2 |\n");
        cb();
    })
});

tester.describe("json2md.async", test => {
    test.it("should return a Promise instance", function(cb) {
        const p = json2md.async({
            h1: "Heading 1"
        }).then(function (result) {
            test.expect(result).toBe("# Heading 1\n");
            cb();
        }).catch(function (err) {
            cb(err)
        });
        test.expect(p instanceof Promise).toBe(true);
    });

    test.it("should accept an array", function(cb) {
        const p = json2md.async([
            { h1: "Heading 1" },
            { h2: "Heading 2" },
        ]).then(function (result) {
            test.expect(result).toBe("# Heading 1\n\n## Heading 2\n");
            cb();
        }).catch(function (err) {
            cb(err)
        });
        test.expect(p instanceof Promise).toBe(true);
    });

    test.it("should have same behaviors to original json2md", function(cb) {
        Promise.all([
            json2md.async({
                h1: "Heading 1"
            }).then((result) => {
                test.expect(result).toBe("# Heading 1\n");
            }),

            json2md.async({
                h2: "Heading 2"
            }).then((result) => {
                test.expect(result).toBe("## Heading 2\n");
            }),

            json2md.async({
                h3: "Heading 3"
            }).then((result) => {
                test.expect(result).toBe("### Heading 3\n");
            }),

            json2md.async({
                blockquote: "Some content"
            }).then((result) => {
                test.expect(result).toBe("> Some content\n");
            }),
        ]).then(function () {
            cb();
        }).catch(function (err) {
            cb(err)
        });
    });

    test.it("should support custom types which have same behaviors to original json2md", function(cb) {
        json2md.converters.sayHello = function(input, json2md) {
            return "Hello " + input + "!";
        };

        json2md.async({
            sayHello: "World"
        }).then((result) => {
            test.expect(result).toBe("Hello World!\n");
            cb();
        }).catch(function (err) {
            cb(err)
        });
    });

    test.it("should support async converter", function(cb) {
        json2md.converters.asyncConvert = function(input, json2md) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve("Hello " + input + "!");
                }, 100);
            });
        };

        json2md.async({
            asyncConvert: "World"
        }).then((result) => {
            test.expect(result).toBe("Hello World!\n");
            cb();
        }).catch(function (err) {
            cb(err)
        });
    });

    test.it("should keep order when async converters finished at different times", function(cb) {
        json2md.converters.asyncConvert2 = function(input, json2md) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve("Hello " + input.text + "!");
                }, input.timeout);
            });
        };

        Promise.all([
            json2md.async([
                { h1: "Heading 1" },
                { asyncConvert2: {text: "World", timeout: 200} },
                { h2: "Heading 2" },
                { asyncConvert2: {text: "hello", timeout: 100} },
            ]).then((result) => {
                test.expect(result).toBe("# Heading 1\n\nHello World!\n\n## Heading 2\n\nHello hello!\n");
            }),
        ]).then(function () {
            cb();
        }).catch(function (err) {
            cb(err)
        });
    });
});
