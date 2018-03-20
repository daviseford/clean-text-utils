# clean-text-utils
### By Davis E Ford

A collection of various text utilities that I've reached for and found lacking in Javascript.

# Usage

`npm install clean-text-utils --save`

```javascript
const cleanTextUtils = require('clean-text-utils');

let txt = 'Iлｔèｒｎ, get rid of these so-called “💩emoji💩”';
// Let's clean this up
txt = cleanTextUtils.strip.emoji(txt);
txt = cleanTextUtils.replace.diacritics(txt);
txt = cleanTextUtils.replace.smartChars(txt);
console.log(txt)
>>> 'Intern, get rid of these so-called "emoji"'
```

# Methods
## .get

`cleanTextUtils.get.checksum` - Given any data, returns a unique checksum. Pass in `md5` or `sha1` for different algorithims. `sha256` is enabled by default.
## .strip

`cleanTextUtils.strip.bom` - Remove UTF8 Byte Order Marks from a string.

`cleanTextUtils.strip.extraSpace` - Remove any extra padding from a string.

`cleanTextUtils.strip.emoji` - Remove emoji's from a string.

`cleanTextUtils.strip.nonASCII` - Remove non-ASCII characters from a string.

## .replace

`cleanTextUtils.replace.diacritics` - Replace diacritics with their sensible alternatives

`cleanTextUtils.replace.exoticChars` - Replace diacritics, remove UTF8 BOM, and replace smart characters from a string.

`cleanTextUtils.replace.smartChars` - Replace smart characters.