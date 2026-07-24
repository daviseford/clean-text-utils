import Module from "./module/clean-text-util";

export { checksum } from "./util/checksum";
export { replaceDiacritics } from "./util/diacritic";
export { stripEmoji } from "./util/emoji-regex";
export { reverse } from "./util/reverse";
export { stripBom } from "./util/strip-bom";
export { stripGutenberg } from "./util/strip-gutenberg";
export {
  capitalize,
  filename,
  isHexCode,
  replaceExoticChars,
  replaceSmartChars,
  stripExtraSpace,
  stripNewlines,
  stripNonASCII,
  stripPunctuation,
  stripWhitespace,
} from "./util/text-util";

export const get = Module.get;
export const is = Module.is;
export const strip = Module.strip;
export const replace = Module.replace;

export default Module;
