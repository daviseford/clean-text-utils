const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

/**
 * Reverses a string while preserving Unicode grapheme clusters.
 */
const reverse = (text: string): string => {
  return Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment)
    .reverse()
    .join("");
};

export default reverse;
