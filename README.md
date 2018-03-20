# clean-text-utils
### By Davis E Ford

A collection of various text utilities that I've reached for and found lacking in Javascript.

# Usage

`npm install clean-text-utils --save`

```javascript
const CleanText = require('clean-text-utils');

// Let's clean this up
const txt = 'Iлｔèｒｎ, get rid of these so-called “💩emoji💩”';

let fixed = CleanText.strip.emoji(txt)          // remove emoji
fixed = CleanText.replace.diacritics(fixed);    // remove internationalization characters
fixed = CleanText.replace.smartChars(fixed)     // remove smart characters
console.log(fixed)
>>> 'Intern, get rid of these so-called "emoji"'
```

# Methods
## .get
`CleanText.get.checksum` - Given any data, returns a unique checksum. Pass in `md5` or `sha1` for different algorithims. `sha256` is enabled by default.
## .strip
`CleanText.strip.emoji` - Remove emoji's from a string.
`CleanText.strip.bom` - Remove UTF8 Byte Order Marks from a string.
`CleanText.strip.nonASCII` - Remove non-ASCII characters from a string.

## .replace
`CleanText.replace.exoticChars` - Replace diacritics, remove UTF8 BOM, and replace smart characters from a string.
`CleanText.replace.smartChars` - Replace smart characters.
`CleanText.replace.diacritics` - Replace diacritics with their sensible alternatives