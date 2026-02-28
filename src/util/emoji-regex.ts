import emojiRegex from "emoji-regex";

const EMOJI_REGEX = emojiRegex();

/**
 * Strip emoji from text
 *
 * @param {string} text
 * @returns {string}
 */
const stripEmoji = (text: string): string => {
  return text.replace(EMOJI_REGEX, "").trim();
};

export default stripEmoji;
