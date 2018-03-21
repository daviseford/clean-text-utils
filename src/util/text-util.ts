export { };
import { ITextUtils } from '../definitions/utils';
import checksum from './checksum';
import replaceDiacritics from './diacritic';
import stripEmoji from './emoji-regex';
import stripBom from './strip-bom';

/**
 * Removes any instances of multiple whitespace characters in a row.
 *
 * @param {string} text
 * @returns {string}
 */
const stripExtraSpace = (text: string): string => text.replace(/\s{2,}/gm, ' ').trim();

/**
 * Removes non-ASCII characters from a string
 *
 * @param {string} text
 * @returns {string}
 */
const stripNonASCII = (text: string): string => text.replace(/[^\x00-\x7F]/g, '').trim();

/**
 * Removes emojis, diacritics, and UTF-8 Byte Order Marks
 *
 * @param {string} text
 * @returns {string}
 */
const replaceExoticChars = (text: string): string => {
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
const replaceSmartChars = (text: string): string => {
    const s = text
        .replace(/[‘’\u2018\u2019\u201A]/g, '\'')   // smart single quotes and apostrophe
        .replace(/[“”\u201C\u201D\u201E]/g, '"')    // smart double quotes
        .replace(/\u2026/g, '...')                  // ellipsis
        .replace(/[\u2013\u2014]/g, '-');           // em dashes
    return s.trim();
};

/**
 * Strips text of nasty little boogers, if necessary
 * Ignores everything else
 *
 * @param {*} data
 * @returns {*}
 */
const cleanText = (data: any): any => typeof data !== 'string' ? data : replaceSmartChars(data);

/**
 * Takes pretty extreme precautions with text
 *
 * @param {*} data
 * @returns {(string | null)}
 */
const superCleanText = (data: any): string | null => {
    if (!data || typeof data !== 'string') { return null; }
    let txt = replaceExoticChars(data);
    txt = stripNonASCII(txt);
    return txt;
};
/**
 * Determines if a string is a hex code.
 * Matches both #FFF and #FFFFFF variants
 *
 * @param {string} txt
 * @returns {boolean}
 */
const isHexCode = (txt: string): boolean => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(txt);

const TextUtils: ITextUtils = {
    checksum,
    cleanText,
    isHexCode,
    replaceDiacritics,
    replaceExoticChars,
    replaceSmartChars,
    stripBom,
    stripEmoji,
    stripExtraSpace,
    stripNonASCII,
    superCleanText,
};

export default TextUtils;
