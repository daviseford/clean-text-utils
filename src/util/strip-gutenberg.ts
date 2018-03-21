/**
 * Strips typical Project Gutenberg watermarks
 *
 * @param {string} txt
 * @returns {string}
 */
const stripGutenberg = (txt: string): string => {
    const start_delim = '*** START OF THIS PROJECT GUTENBERG EBOOK';
    const end_delim = '*** END OF THIS PROJECT GUTENBERG EBOOK';
    // Remove everything before and including start_delim
    if (txt.includes(end_delim)) {
        txt = txt.split(end_delim)[0];
    }
    if (txt.includes(start_delim)) {
        const m = txt.match(/^.+?(?=START OF THIS PROJECT GUTENBERG EBOOK [\w\s]+\*\*\*)(.+)$/gm);
        if (!m) { return txt; }
        const i = m[0];
        const slice_before_index = txt.indexOf(i) + i.length;
        txt = txt.slice(slice_before_index);
    }
    return txt;
};

export default stripGutenberg;
