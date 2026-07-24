import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { build } from "esbuild";

const require = createRequire(import.meta.url);
const esm = await import("clean-text-utils");
const cjs = require("clean-text-utils");

assert.equal(esm.stripWhitespace("hello world"), "helloworld");
assert.equal(cjs.stripWhitespace("hello world"), "helloworld");
assert.equal(esm.default.strip.whitespace("hello world"), "helloworld");
assert.equal(cjs.default.strip.whitespace("hello world"), "helloworld");

const subpaths = {
  capitalize: ["capitalize", "hello", "Hello"],
  checksum: ["checksum", "hello", esm.checksum("hello")],
  filename: ["filename", "https://example.com/file.txt?download=1", "file.txt"],
  reverse: ["reverse", "\u{1F1FA}\u{1F1F8}abc", "cba\u{1F1FA}\u{1F1F8}"],
  "is/hex-code": ["isHexCode", "#fff", true],
  "replace/diacritics": ["replaceDiacritics", "caf\u00E9", "cafe"],
  "replace/exotic-chars": ["replaceExoticChars", "caf\u00E9", "cafe"],
  "replace/smart-chars": ["replaceSmartChars", "\u201Chello\u201D", '"hello"'],
  "strip/bom": ["stripBom", "\uFEFFhello", "hello"],
  "strip/emoji": ["stripEmoji", "hello \u{1F30D}", "hello"],
  "strip/extra-space": ["stripExtraSpace", "  hello   world  ", "hello world"],
  "strip/gutenberg": ["stripGutenberg", "plain text", "plain text"],
  "strip/newlines": ["stripNewlines", "hello\nworld", "helloworld"],
  "strip/non-ascii": ["stripNonASCII", "caf\u00E9", "caf"],
  "strip/punctuation": ["stripPunctuation", "hello, world!", "hello world"],
  "strip/whitespace": ["stripWhitespace", "hello world", "helloworld"],
};

for (const [subpath, [name, input, expected]] of Object.entries(subpaths)) {
  const specifier = `clean-text-utils/${subpath}`;
  const esmEntry = await import(specifier);
  const cjsEntry = require(specifier);

  assert.equal(esmEntry.default, esmEntry[name], `${specifier} ESM default export`);
  assert.equal(cjsEntry.default, cjsEntry[name], `${specifier} CJS default export`);
  assert.equal(esmEntry[name](input), expected, `${specifier} ESM behavior`);
  assert.equal(cjsEntry[name](input), expected, `${specifier} CJS behavior`);
}

const browserBundle = await build({
  bundle: true,
  format: "esm",
  minify: true,
  platform: "browser",
  stdin: {
    contents: `
      import stripWhitespace from "clean-text-utils/strip/whitespace";
      globalThis.result = stripWhitespace("hello world");
    `,
    resolveDir: process.cwd(),
    sourcefile: "browser-consumer.js",
  },
  write: false,
});

const browserCode = browserBundle.outputFiles[0].text;
assert.ok(!browserCode.includes("node:crypto"), "browser-safe subpaths must exclude Node built-ins");

console.log(`Package smoke tests passed for ${Object.keys(subpaths).length} subpath exports.`);
