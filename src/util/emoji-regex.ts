import emojiRegex from "emoji-regex";

let emojiPattern: RegExp | undefined;

/**
 * Strip emoji from text
 *
 * @param {string} text
 * @returns {string}
 */
const stripEmoji = (text: string): string => {
  emojiPattern ??= emojiRegex();
  return text.replace(emojiPattern, "").trim();
};

export { stripEmoji };
export default stripEmoji;
