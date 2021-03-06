# clean-text-utils

## By Davis E. Ford - [daviseford.com](https://daviseford.com)

A Swiss Army Knife of text operations. Great for removing smart quotes, non-ASCII characters, emojis, and more.

## Usage

`npm i clean-text-utils --save`

```javascript
import * as cleanTextUtils from 'clean-text-utils';

let txt = 'Iлｔèｒｎ, get rid of these so-called “💩emoji💩”';
// Let's clean this up
txt = cleanTextUtils.strip.emoji(txt);
txt = cleanTextUtils.replace.diacritics(txt);
txt = cleanTextUtils.replace.smartChars(txt);
console.log(txt)
>>> 'Intern, get rid of these so-called "emoji"'
```

## Methods

### .get

`cleanTextUtils.get.capitalized` - Capitalizes the first character of a given string.

`cleanTextUtils.get.checksum` - Given any data, returns a unique checksum. Pass in `md5` or `sha1` for different algorithms. `sha256` is enabled by default.

`cleanTextUtils.get.filename` - Given a url or filepath, returns the filename.

`cleanTextUtils.get.reversed` - Reverses a string. Unicode aware.

### .is

`cleanTextUtils.is.hexCode` - Returns `true` if the given string is a hex code, such as `#FFF` or `#FA5732`.

### .strip

`cleanTextUtils.strip.bom` - Remove UTF8 Byte Order Marks from a string.

`cleanTextUtils.strip.emoji` - Remove emojii from a string.

`cleanTextUtils.strip.extraSpace` - Remove any extra padding from a string.

`cleanTextUtils.strip.gutenberg` - Remove [Project Gutenberg](http://www.gutenberg.org/browse/scores/top) header/footer watermarks for further processing.

`cleanTextUtils.strip.newlines` - Removes newline characters from a string.

`cleanTextUtils.strip.nonASCII` - Remove non-ASCII characters from a string.

`cleanTextUtils.strip.punctuation` - Removes common punctuation characters from a string.

`cleanTextUtils.strip.whitespace` - Removes ALL whitespace characters from a string.

### .replace

`cleanTextUtils.replace.diacritics` - Replace diacritics with their sensible alternatives

`cleanTextUtils.replace.exoticChars` - Replace diacritics, remove UTF8 BOM, and replace smart characters from a string.

`cleanTextUtils.replace.smartChars` - Replace smart characters.

## Types

TypeScript definitions are automatically installed.

`import * as cleanTextUtils from 'clean-text-utils'` to use built in types. :)
