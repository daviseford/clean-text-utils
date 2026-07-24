# clean-text-utils

A small, typed collection of text-cleaning utilities for Node.js 18 and newer.

## Install

```sh
npm install clean-text-utils
```

## Usage

Import individual functions from the package root:

```js
import {
  replaceDiacritics,
  replaceSmartChars,
  stripEmoji,
} from "clean-text-utils";

let text = "Cr\u00E8me br\u00FBl\u00E9e \u{1F36E}";
text = stripEmoji(text);
text = replaceDiacritics(text);
text = replaceSmartChars(text);

console.log(text); // "Creme brulee"
```

The original namespace API remains available:

```js
import cleanTextUtils from "clean-text-utils";

cleanTextUtils.get.capitalized("hello");
cleanTextUtils.replace.diacritics("cr\u00E8me br\u00FBl\u00E9e");
cleanTextUtils.strip.whitespace("hello world");
```

For the smallest bundle, and for browser applications, use a text-only subpath:

```js
import stripWhitespace from "clean-text-utils/strip/whitespace";

stripWhitespace("hello world"); // "helloworld"
```

Each subpath has both a default export and a named export. The root entry includes the synchronous Node.js checksum
utility and is therefore intended for Node.js. All subpaths except `clean-text-utils/checksum` are browser-safe.

## Exports

| Named export | Subpath |
| --- | --- |
| `capitalize` | `clean-text-utils/capitalize` |
| `checksum` | `clean-text-utils/checksum` |
| `filename` | `clean-text-utils/filename` |
| `reverse` | `clean-text-utils/reverse` |
| `isHexCode` | `clean-text-utils/is/hex-code` |
| `replaceDiacritics` | `clean-text-utils/replace/diacritics` |
| `replaceExoticChars` | `clean-text-utils/replace/exotic-chars` |
| `replaceSmartChars` | `clean-text-utils/replace/smart-chars` |
| `stripBom` | `clean-text-utils/strip/bom` |
| `stripEmoji` | `clean-text-utils/strip/emoji` |
| `stripExtraSpace` | `clean-text-utils/strip/extra-space` |
| `stripGutenberg` | `clean-text-utils/strip/gutenberg` |
| `stripNewlines` | `clean-text-utils/strip/newlines` |
| `stripNonASCII` | `clean-text-utils/strip/non-ascii` |
| `stripPunctuation` | `clean-text-utils/strip/punctuation` |
| `stripWhitespace` | `clean-text-utils/strip/whitespace` |

## API

### Get

- `capitalize(text)` / `get.capitalized(text)` capitalizes the first character.
- `checksum(data, algorithm?)` / `get.checksum(data, algorithm?)` returns a hexadecimal digest. `sha256` is the
  default; `sha`, `sha1`, `sha512`, and `md5` are also supported.
- `filename(pathOrUrl)` / `get.filename(pathOrUrl)` returns the filename from a URL or Windows/POSIX path. Query
  strings and URL fragments are excluded.
- `reverse(text)` / `get.reversed(text)` reverses text by Unicode grapheme cluster, preserving emoji sequences,
  flags, and combining marks.

`checksum` hashes strings directly for compatibility. Other supported JavaScript values use deterministic,
type-aware serialization, so object key order does not affect the result and values such as `false`, `0`, `null`,
and `undefined` remain distinct. Circular data, functions, symbols, symbol-keyed properties, and opaque objects whose
state cannot be inspected throw a `TypeError` instead of producing a misleading digest.

### Is

- `isHexCode(text)` / `is.hexCode(text)` checks three- and six-digit hexadecimal color codes.

### Replace

- `replaceDiacritics(text)` / `replace.diacritics(text)` transliterates diacritics, including decomposed combining
  marks.
- `replaceExoticChars(text)` / `replace.exoticChars(text)` replaces diacritics and smart punctuation and removes a
  UTF-8 byte order mark.
- `replaceSmartChars(text)` / `replace.smartChars(text)` replaces smart quotes, ellipses, and dashes with ASCII
  equivalents.

### Strip

- `stripBom(text)` / `strip.bom(text)` removes a UTF-8 byte order mark.
- `stripEmoji(text)` / `strip.emoji(text)` removes emoji.
- `stripExtraSpace(text)` / `strip.extraSpace(text)` collapses repeated whitespace and trims the result.
- `stripGutenberg(text)` / `strip.gutenberg(text)` removes Project Gutenberg header and footer boilerplate.
- `stripNewlines(text)` / `strip.newlines(text)` removes carriage returns and line feeds.
- `stripNonASCII(text)` / `strip.nonASCII(text)` removes non-ASCII characters.
- `stripPunctuation(text)` / `strip.punctuation(text)` removes common punctuation.
- `stripWhitespace(text)` / `strip.whitespace(text)` removes all whitespace.

TypeScript declarations are included for the root API and every subpath.

## License

[MIT](LICENSE) (c) Davis E. Ford
