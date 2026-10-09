/**
 * Strips typical Project Gutenberg watermarks
 *
 * @param {string} txt
 * @returns {string}
 */
const stripGutenberg = (txt: string): string => {
  // Older files say "THIS PROJECT GUTENBERG", current ones "THE PROJECT GUTENBERG"; titles may contain any punctuation.
  const end = txt.search(/\*\*\* END OF TH(?:IS|E) PROJECT GUTENBERG EBOOK/);
  if (end !== -1) {
    txt = txt.slice(0, end);
  }
  // Remove everything up to the end of the line holding the start delimiter
  const start = txt.match(/^.*\*\*\* START OF TH(?:IS|E) PROJECT GUTENBERG EBOOK(?=[^*]*\*\*\*).*$/m);
  if (start?.index !== undefined) {
    txt = txt.slice(start.index + start[0].length);
  }
  return txt;
};

export { stripGutenberg };
export default stripGutenberg;
