import emojiRegex from "emoji-regex";

/**
 * Strip emoji from text
 *
 * @param {string} text
 * @returns {string}
 */
const stripEmoji = (text: string): string => {
  return text.replace(emojiRegex(), "").trim();
};

export default stripEmoji;
