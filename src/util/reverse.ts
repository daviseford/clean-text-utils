/**
 * Copyright Mathias Bynens <https://mathiasbynens.be/>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Reverses a string. Unicode-aware.
 *
 * @param {string} text
 * @returns {string}
 */
const reverse = (text: string): string => {
    // tslint:disable-next-line:max-line-length
    const regexSymbolWithCombiningMarks = /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;
    const regexSurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;
    // Step 1: deal with combining marks and astral symbols (surrogate pairs)
    text = text
        // Swap symbols with their combining marks so the combining marks go first
        .replace(regexSymbolWithCombiningMarks, ($0, $1, $2) => {
            // Reverse the combining marks so they will end up in the same order
            // later on (after another round of reversing)
            return reverse($2) + $1;
        })
        // Swap high and low surrogates so the low surrogates go first
        .replace(regexSurrogatePair, '$2$1');
    // Step 2: reverse the code units in the string
    const result = [];
    let index = text.length;
    while (index--) {
        result.push(text.charAt(index));
    }
    return result.join('');
};

export default reverse;
