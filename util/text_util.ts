export { };
import { ITextUtils } from '../definitions/utils';
const checksum = require('./checksum');
const emojiRegex = require('emoji-regex');
const replaceDiacritics = require('diacritics').remove;
const stripBom = require('strip-bom');

/**
 * Removes non-ASCII characters from a string
 *
 * @param {string} text
 * @returns {string}
 */
const stripNonASCII: ITextUtils['stripNonASCII'] = (text) => text.replace(/[^\x00-\x7F]/g, '').trim();

/**
 * Remove emojis from a string
 *
 * @param {string} text
 * @returns {string}
 */
const stripEmoji: ITextUtils['stripEmoji'] = (text) => text.replace(emojiRegex(), '').trim();

/**
 * Removes emojis, diacritics, and UTF-8 Byte Order Marks
 *
 * @param {string} text
 * @returns {string}
 */
const replaceExoticChars: ITextUtils['replaceExoticChars'] = (text) => {
    let s = replaceDiacritics(text);    // remove language accents and odd character replacements
    s = stripBom(s);                    // strip things like \uFEFF
    s = replaceSmartChars(s);           // replace smart quotes
    return s.trim();
};

/**
 * Replaces characters typically imported from Microsoft Word
 *
 * @param {string} text
 * @returns {string}
 */
const replaceSmartChars: ITextUtils['replaceSmartChars'] = (text) => {
    const s = text
        .replace(/[‘’\u2018\u2019\u201A]/g, '\'')   // smart single quotes and apostrophe
        .replace(/[“”\u201C\u201D\u201E]/g, '"')    // smart double quotes
        .replace(/\u2026/g, '...')                  // ellipsis
        .replace(/[\u2013\u2014]/g, '-');           // dashes
    return s.trim();
};

/**
 * Strips text of nasty little boogers, if necessary
 * Ignores everything else
 *
 * @param {*} data
 * @returns {*}
 */
const cleanText: ITextUtils['cleanText'] = (data) => typeof data !== 'string' ? data : replaceSmartChars(data);

/**
 * Takes pretty extreme precautions with text
 *
 * @param {*} data
 * @returns {(string | void)}
 */
const superCleanText: ITextUtils['superCleanText'] = (data) => {
    if (!data || typeof data !== 'string') { return null; }
    let txt = replaceExoticChars(data);
    txt = stripNonASCII(txt);
    return txt;
};

const TextUtils: ITextUtils = {
    checksum,
    cleanText,
    replaceDiacritics,
    replaceExoticChars,
    replaceSmartChars,
    stripBom,
    stripEmoji,
    stripNonASCII,
    superCleanText,
};

module.exports = TextUtils;
