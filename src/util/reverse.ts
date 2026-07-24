let graphemeSegmenter: Intl.Segmenter | undefined;

/**
 * Reverses a string while preserving Unicode grapheme clusters.
 */
const reverse = (text: string): string => {
  graphemeSegmenter ??= new Intl.Segmenter(undefined, { granularity: "grapheme" });
  return Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment)
    .reverse()
    .join("");
};

export { reverse };
export default reverse;
