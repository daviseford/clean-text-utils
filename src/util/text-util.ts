import * as path from 'path';
import { ITextUtils } from '../definitions/utils';
import replaceDiacritics from './diacritic';
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
 * Removes common punctuation characters from a string
 *
 * @param {string} text
 * @returns {string}
 */
const stripPunctuation = (text: string): string => stripExtraSpace(text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''));
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
 * Determines if a string is a hex code.
 * Matches both #FFF and #FFFFFF variants
 *
 * @param {string} txt
 * @returns {boolean}
 */
const isHexCode = (txt: string): boolean => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(txt);

/**
 * Given a filepath or URL, returns the filename
 *
 * @param {string} url
 * @returns {string}
 */
const getFileName = (url: string): string => url.substring(url.lastIndexOf(path.sep) + 1);

/**
 * Capitalizes the first character in a string
 *
 * @param {string} word
 * @returns {string}
 */
const capitalizeWord = (word: string): string => word[0].toUpperCase() + word.slice(1);

const TextUtils: ITextUtils = {
    capitalizeWord,
    getFileName,
    isHexCode,
    replaceExoticChars,
    replaceSmartChars,
    stripExtraSpace,
    stripNonASCII,
    stripPunctuation,
};

export default TextUtils;
