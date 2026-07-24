import { describe, expect, it } from "vitest";
import CleanText from "../module/clean-text-util";

// ─── get.capitalized ────────────────────────────────────────────────────────

describe("get.capitalized", () => {
  it("capitalizes the first letter of a lowercase word", () => {
    expect(CleanText.get.capitalized("hello")).toBe("Hello");
  });

  it("keeps already-capitalized strings unchanged", () => {
    expect(CleanText.get.capitalized("Hello")).toBe("Hello");
  });

  it("capitalizes only the first character, leaving the rest unchanged", () => {
    expect(CleanText.get.capitalized("the B.I.G. boy.")).toBe("The B.I.G. boy.");
  });

  it("returns empty string for empty input", () => {
    expect(CleanText.get.capitalized("")).toBe("");
  });

  it("handles single character strings", () => {
    expect(CleanText.get.capitalized("a")).toBe("A");
    expect(CleanText.get.capitalized("Z")).toBe("Z");
  });

  it("handles strings starting with numbers", () => {
    expect(CleanText.get.capitalized("123abc")).toBe("123abc");
  });

  it("handles strings starting with spaces", () => {
    expect(CleanText.get.capitalized(" hello")).toBe(" hello");
  });
});

// ─── get.checksum ───────────────────────────────────────────────────────────

describe("get.checksum", () => {
  it("generates a sha256 checksum by default", () => {
    const result = CleanText.get.checksum("hello");
    expect(result).toMatch(/^[a-f0-9]{64}$/);
  });

  it("generates consistent checksums for the same input", () => {
    const a = CleanText.get.checksum("test-data");
    const b = CleanText.get.checksum("test-data");
    expect(a).toBe(b);
  });

  it("generates different checksums for different inputs", () => {
    const a = CleanText.get.checksum("hello");
    const b = CleanText.get.checksum("world");
    expect(a).not.toBe(b);
  });

  it("supports sha1 algorithm", () => {
    const result = CleanText.get.checksum("hello", "sha1");
    expect(result).toMatch(/^[a-f0-9]{40}$/);
  });

  it("supports md5 algorithm", () => {
    const result = CleanText.get.checksum("hello", "md5");
    expect(result).toMatch(/^[a-f0-9]{32}$/);
  });

  it("supports sha512 algorithm", () => {
    const result = CleanText.get.checksum("hello", "sha512");
    expect(result).toMatch(/^[a-f0-9]{128}$/);
  });

  it("falls back to sha256 for invalid algorithms", () => {
    const fallback = CleanText.get.checksum("hello", "INVALID");
    const sha256 = CleanText.get.checksum("hello", "sha256");
    expect(fallback).toBe(sha256);
  });

  it("hashes objects", () => {
    const obj = { key: "value", nested: { a: 1 } };
    const result = CleanText.get.checksum(obj);
    expect(result).toMatch(/^[a-f0-9]{64}$/);
  });

  it("produces the same checksum regardless of object key order", () => {
    const a = CleanText.get.checksum({ astring: "splendied", an_array: [{}, {}, { d: "b" }] });
    const b = CleanText.get.checksum({ an_array: [{}, {}, { d: "b" }], astring: "splendied" });
    expect(a).toBe(b);
  });

  it("handles arrays", () => {
    const result = CleanText.get.checksum([1, 2, 3]);
    expect(result).toMatch(/^[a-f0-9]{64}$/);
  });

  it("keeps falsy values distinct", () => {
    const checksums = [null, undefined, 0, false, ""].map((value) => CleanText.get.checksum(value));

    expect(new Set(checksums)).toHaveLength(checksums.length);
    expect(checksums.every((value) => /^[a-f0-9]{64}$/.test(value))).toBe(true);
  });

  it("preserves whitespace inside object string values", () => {
    expect(CleanText.get.checksum({ value: "a b" })).not.toBe(CleanText.get.checksum({ value: "ab" }));
  });

  it("rejects circular structures with a clear error", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;

    expect(() => CleanText.get.checksum(circular)).toThrow("Cannot checksum circular data");
  });
});

// ─── get.filename ───────────────────────────────────────────────────────────

describe("get.filename", () => {
  it("extracts filename from a URL", () => {
    expect(CleanText.get.filename("https://example.com/blog/sample.html")).toBe("sample.html");
  });

  it("extracts filename from a Unix filepath", () => {
    expect(CleanText.get.filename("/Users/user/Documents/file.ts")).toBe("file.ts");
  });

  it("handles filenames with no path", () => {
    expect(CleanText.get.filename("file.txt")).toBe("file.txt");
  });

  it("handles paths with multiple dots", () => {
    expect(CleanText.get.filename("/path/to/archive.tar.gz")).toBe("archive.tar.gz");
  });

  it("handles trailing separator", () => {
    // When there's a trailing slash, returns empty after the last separator
    const result = CleanText.get.filename("/path/to/dir/");
    expect(result).toBe("");
  });

  it("removes URL query strings and fragments", () => {
    expect(CleanText.get.filename("https://example.com/file.txt?download=1#top")).toBe("file.txt");
  });
});

// ─── get.reversed ───────────────────────────────────────────────────────────

describe("get.reversed", () => {
  it("reverses a simple ASCII string", () => {
    expect(CleanText.get.reversed("hello")).toBe("olleh");
  });

  it("reverses a string with emoji", () => {
    expect(CleanText.get.reversed("💩emoji💪")).toBe("💪ijome💩");
  });

  it("returns empty string for empty input", () => {
    expect(CleanText.get.reversed("")).toBe("");
  });

  it("handles single character", () => {
    expect(CleanText.get.reversed("a")).toBe("a");
  });

  it("handles palindrome", () => {
    expect(CleanText.get.reversed("racecar")).toBe("racecar");
  });

  it("preserves spaces", () => {
    expect(CleanText.get.reversed("ab cd")).toBe("dc ba");
  });

  it("handles surrogate pairs correctly", () => {
    // 𝌆 is U+1D306, a surrogate pair in UTF-16
    expect(CleanText.get.reversed("𝌆abc")).toBe("cba𝌆");
  });

  it("preserves flag grapheme clusters", () => {
    expect(CleanText.get.reversed("🇺🇸abc")).toBe("cba🇺🇸");
  });

  it("preserves joined family emoji", () => {
    expect(CleanText.get.reversed("👨‍👩‍👧‍👦abc")).toBe("cba👨‍👩‍👧‍👦");
  });

  it("keeps combining marks attached to their base character", () => {
    expect(CleanText.get.reversed("e\u0301abc")).toBe("cbae\u0301");
  });
});

// ─── is.hexCode ─────────────────────────────────────────────────────────────

describe("is.hexCode", () => {
  it("recognizes 3-character hex codes", () => {
    expect(CleanText.is.hexCode("#FFF")).toBe(true);
    expect(CleanText.is.hexCode("#000")).toBe(true);
    expect(CleanText.is.hexCode("#abc")).toBe(true);
  });

  it("recognizes 6-character hex codes", () => {
    expect(CleanText.is.hexCode("#FFFFFF")).toBe(true);
    expect(CleanText.is.hexCode("#000000")).toBe(true);
    expect(CleanText.is.hexCode("#1a2b3c")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(CleanText.is.hexCode("#fff")).toBe(true);
    expect(CleanText.is.hexCode("#AbCdEf")).toBe(true);
  });

  it("rejects strings without #", () => {
    expect(CleanText.is.hexCode("FFF")).toBe(false);
    expect(CleanText.is.hexCode("FFFFFF")).toBe(false);
  });

  it("rejects invalid hex characters", () => {
    expect(CleanText.is.hexCode("#GGG")).toBe(false);
    expect(CleanText.is.hexCode("#ZZZZZZ")).toBe(false);
  });

  it("rejects wrong-length hex codes", () => {
    expect(CleanText.is.hexCode("#FF")).toBe(false);
    expect(CleanText.is.hexCode("#FFFF")).toBe(false);
    expect(CleanText.is.hexCode("#FFFFFFF")).toBe(false);
  });

  it("rejects non-hex strings", () => {
    expect(CleanText.is.hexCode("something")).toBe(false);
    expect(CleanText.is.hexCode("")).toBe(false);
    expect(CleanText.is.hexCode("#")).toBe(false);
  });
});

// ─── strip.bom ──────────────────────────────────────────────────────────────

describe("strip.bom", () => {
  it("removes UTF-8 BOM from start of string", () => {
    expect(CleanText.strip.bom("\uFEFFhello")).toBe("hello");
  });

  it("leaves strings without BOM unchanged", () => {
    expect(CleanText.strip.bom("hello")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(CleanText.strip.bom("")).toBe("");
  });

  it("only removes BOM from the beginning", () => {
    expect(CleanText.strip.bom("hello\uFEFF")).toBe("hello\uFEFF");
  });

  it("throws TypeError for non-string input", () => {
    expect(() => (CleanText.strip.bom as any)(123)).toThrow(TypeError);
    expect(() => (CleanText.strip.bom as any)(null)).toThrow(TypeError);
  });
});

// ─── strip.emoji ────────────────────────────────────────────────────────────

describe("strip.emoji", () => {
  it("removes emoji from a string", () => {
    const txt = "🙏🙏🙏 👍thumbs-up👍 for staying 💪strong💪 without 💩emoji💩 🙏🙏🙏";
    expect(CleanText.strip.emoji(txt)).toBe("thumbs-up for staying strong without emoji");
  });

  it("leaves plain text unchanged", () => {
    expect(CleanText.strip.emoji("hello world")).toBe("hello world");
  });

  it("handles string that is only emoji", () => {
    const result = CleanText.strip.emoji("🎉🎊🎈");
    expect(result.trim()).toBe("");
  });

  it("handles empty string", () => {
    expect(CleanText.strip.emoji("")).toBe("");
  });

  it("removes flag emoji", () => {
    const result = CleanText.strip.emoji("Hello 🇺🇸 World");
    expect(result.trim()).toBe("Hello  World");
  });

  it("removes number emojis with variation selectors", () => {
    const result = CleanText.strip.emoji("Call #️⃣ now");
    expect(result.trim()).toBe("Call  now");
  });
});

// ─── strip.extraSpace ───────────────────────────────────────────────────────

describe("strip.extraSpace", () => {
  it("collapses multiple spaces into one", () => {
    expect(CleanText.strip.extraSpace("too     many     spaces")).toBe("too many spaces");
  });

  it("trims leading and trailing whitespace", () => {
    expect(CleanText.strip.extraSpace("  hello  ")).toBe("hello");
  });

  it("handles tabs and mixed whitespace", () => {
    expect(CleanText.strip.extraSpace("hello\t\tworld")).toBe("hello world");
  });

  it("leaves single-spaced text unchanged", () => {
    expect(CleanText.strip.extraSpace("hello world")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(CleanText.strip.extraSpace("")).toBe("");
  });

  it("handles string of only spaces", () => {
    expect(CleanText.strip.extraSpace("     ")).toBe("");
  });

  it("collapses mixed whitespace types", () => {
    expect(CleanText.strip.extraSpace("  too     many     spaces      !!  ")).toBe("too many spaces !!");
  });
});

// ─── strip.gutenberg ────────────────────────────────────────────────────────

describe("strip.gutenberg", () => {
  it("removes Project Gutenberg header and footer", () => {
    const dickens = `
    The Project Gutenberg EBook of A Tale of Two Cities, by Charles Dickens
    Character set encoding: UTF-8

    *** START OF THIS PROJECT GUTENBERG EBOOK A TALE OF TWO CITIES ***

    Produced by Judith Boss

    *** END OF THIS PROJECT GUTENBERG EBOOK A TALE OF TWO CITIES ***
    ***** This file should be named 98-0.txt or 98-0.zip *****`;
    expect(CleanText.strip.gutenberg(dickens).trim()).toBe("Produced by Judith Boss");
  });

  it("removes header and footer from Frankenstein", () => {
    const frank = `
    Project Gutenberg's Frankenstein, by Mary Wollstonecraft (Godwin) Shelley
    Title: Frankenstein or The Modern Prometheus
    Release Date: June 17, 2008 [EBook #84]
    Language: English
    Character set encoding: UTF-8

    *** START OF THIS PROJECT GUTENBERG EBOOK FRANKENSTEIN ***

    He sprang from the cabin-window as he said this, upon the ice raft which lay close to the vessel.

    *** END OF THIS PROJECT GUTENBERG EBOOK FRANKENSTEIN ***
    ***** This file should be named 84-0.txt or 84-0.zip *****
    Produced by Judith Boss, Christy Phillips.`;
    expect(CleanText.strip.gutenberg(frank).trim()).toBe(
      "He sprang from the cabin-window as he said this, upon the ice raft which lay close to the vessel.",
    );
  });

  it("handles text with only the end delimiter", () => {
    const txt = `Some content here

    *** END OF THIS PROJECT GUTENBERG EBOOK TEST ***
    footer stuff`;
    expect(CleanText.strip.gutenberg(txt).trim()).toBe("Some content here");
  });

  it("leaves non-Gutenberg text untouched", () => {
    const innocent = `
    *** IMPORTANT STUFF DESIGNED TO TRIP UP THE REGEX ***
    *** START OF THIS DAMN ASTERIK STUFF ***
    project gutenberg is the best`;
    expect(CleanText.strip.gutenberg(innocent)).toBe(innocent);
  });

  it("handles empty string", () => {
    expect(CleanText.strip.gutenberg("")).toBe("");
  });
});

// ─── strip.newlines ─────────────────────────────────────────────────────────

describe("strip.newlines", () => {
  it("removes \\n characters", () => {
    expect(CleanText.strip.newlines("hello\nworld")).toBe("helloworld");
  });

  it("removes \\r characters", () => {
    expect(CleanText.strip.newlines("hello\rworld")).toBe("helloworld");
  });

  it("removes \\r\\n (CRLF)", () => {
    expect(CleanText.strip.newlines("hello\r\nworld")).toBe("helloworld");
  });

  it("removes multiple newlines", () => {
    expect(CleanText.strip.newlines("a\n\n\nb")).toBe("ab");
  });

  it("leaves strings without newlines unchanged", () => {
    expect(CleanText.strip.newlines("hello world")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(CleanText.strip.newlines("")).toBe("");
  });

  it("preserves spaces around removed newlines", () => {
    expect(CleanText.strip.newlines("Some \n newlines and \r carriage returns")).toBe(
      "Some  newlines and  carriage returns",
    );
  });
});

// ─── strip.nonASCII ─────────────────────────────────────────────────────────

describe("strip.nonASCII", () => {
  it("removes non-ASCII characters", () => {
    expect(CleanText.strip.nonASCII("café")).toBe("caf");
  });

  it("removes emojis", () => {
    expect(CleanText.strip.nonASCII("hello 🌍 world")).toBe("hello  world");
  });

  it("leaves pure ASCII unchanged", () => {
    expect(CleanText.strip.nonASCII("hello world 123!")).toBe("hello world 123!");
  });

  it("handles empty string", () => {
    expect(CleanText.strip.nonASCII("")).toBe("");
  });

  it("handles strings with unicode accented characters", () => {
    expect(CleanText.strip.nonASCII("naïve résumé")).toBe("nave rsum");
  });

  it("preserves control characters and basic ASCII", () => {
    expect(CleanText.strip.nonASCII("hello\tworld\n")).toBe("hello\tworld\n");
  });
});

// ─── strip.punctuation ──────────────────────────────────────────────────────

describe("strip.punctuation", () => {
  it("removes common punctuation", () => {
    const str = "This., -/ is #! an $ % ^ & * example ;: {} of a = -_ string with `~)() punctuation.";
    expect(CleanText.strip.punctuation(str)).toBe("This is an example of a string with punctuation");
  });

  it("leaves letters and numbers intact", () => {
    expect(CleanText.strip.punctuation("hello123")).toBe("hello123");
  });

  it("handles empty string", () => {
    expect(CleanText.strip.punctuation("")).toBe("");
  });

  it("handles string of only punctuation", () => {
    // Note: ? is not in the punctuation regex, so it remains
    expect(CleanText.strip.punctuation(".,;:!")).toBe("");
  });

  it("collapses extra spaces left by removed punctuation", () => {
    expect(CleanText.strip.punctuation("hello... world!")).toBe("hello world");
  });
});

// ─── strip.whitespace ───────────────────────────────────────────────────────

describe("strip.whitespace", () => {
  it("removes all whitespace from a string", () => {
    expect(CleanText.strip.whitespace("hello world")).toBe("helloworld");
  });

  it("removes tabs", () => {
    expect(CleanText.strip.whitespace("hello\tworld")).toBe("helloworld");
  });

  it("removes newlines", () => {
    expect(CleanText.strip.whitespace("hello\nworld")).toBe("helloworld");
  });

  it("removes all types of whitespace", () => {
    expect(CleanText.strip.whitespace("  \t Some    spaces here to remove ")).toBe("Somespacesheretoremove");
  });

  it("handles empty string", () => {
    expect(CleanText.strip.whitespace("")).toBe("");
  });

  it("handles string with no whitespace", () => {
    expect(CleanText.strip.whitespace("nospaces")).toBe("nospaces");
  });
});

// ─── replace.diacritics ─────────────────────────────────────────────────────

describe("replace.diacritics", () => {
  it("replaces common accented characters", () => {
    expect(CleanText.replace.diacritics("café")).toBe("cafe");
    expect(CleanText.replace.diacritics("naïve")).toBe("naive");
    expect(CleanText.replace.diacritics("résumé")).toBe("resume");
  });

  it("handles Spanish characters", () => {
    expect(CleanText.replace.diacritics("señor")).toBe("senor");
    expect(CleanText.replace.diacritics("año")).toBe("ano");
  });

  it("handles German characters", () => {
    expect(CleanText.replace.diacritics("über")).toBe("uber");
    expect(CleanText.replace.diacritics("Straße")).toBe("Strasse");
  });

  it("handles Nordic characters", () => {
    expect(CleanText.replace.diacritics("Ångström")).toBe("Angstrom");
  });

  it("handles the internationalization test string", () => {
    expect(CleanText.replace.diacritics("Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ")).toBe("Internationalizati0n");
  });

  it("leaves plain ASCII unchanged", () => {
    expect(CleanText.replace.diacritics("hello world")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(CleanText.replace.diacritics("")).toBe("");
  });

  it("handles French characters", () => {
    expect(CleanText.replace.diacritics("crème brûlée")).toBe("creme brulee");
  });

  it("replaces non-breaking space with regular space", () => {
    expect(CleanText.replace.diacritics("hello\u00A0world")).toBe("hello world");
  });

  it("handles ligatures", () => {
    expect(CleanText.replace.diacritics("\u00C6")).toBe("AE"); // Æ
    expect(CleanText.replace.diacritics("\u00E6")).toBe("ae"); // æ
    expect(CleanText.replace.diacritics("\u0152")).toBe("OE"); // Œ
    expect(CleanText.replace.diacritics("\u0153")).toBe("oe"); // œ
    expect(CleanText.replace.diacritics("\u00DF")).toBe("ss"); // ß
  });
});

// ─── replace.smartChars ─────────────────────────────────────────────────────

describe("replace.smartChars", () => {
  it("replaces smart single quotes with straight single quotes", () => {
    expect(CleanText.replace.smartChars("\u2018hello\u2019")).toBe("'hello'");
  });

  it("replaces smart double quotes with straight double quotes", () => {
    expect(CleanText.replace.smartChars("\u201Chello\u201D")).toBe('"hello"');
  });

  it("replaces ellipsis character with three dots", () => {
    expect(CleanText.replace.smartChars("wait\u2026")).toBe("wait...");
  });

  it("replaces em dash with hyphen", () => {
    expect(CleanText.replace.smartChars("word\u2013word")).toBe("word-word");
    expect(CleanText.replace.smartChars("word\u2014word")).toBe("word-word");
  });

  it("handles mixed smart characters", () => {
    const txt = "\u201CHello.\u201D hi mark \u2018Oh hai mark\u2019 \u201C\u201D \u201Esdfs\u201E";
    expect(CleanText.replace.smartChars(txt)).toBe('"Hello." hi mark \'Oh hai mark\' "" "sdfs"');
  });

  it("leaves regular ASCII punctuation unchanged", () => {
    expect(CleanText.replace.smartChars("\"hello\" 'world'")).toBe("\"hello\" 'world'");
  });

  it("handles empty string", () => {
    expect(CleanText.replace.smartChars("")).toBe("");
  });

  it("replaces low-9 quotation marks", () => {
    expect(CleanText.replace.smartChars("\u201A")).toBe("'");
    expect(CleanText.replace.smartChars("\u201E")).toBe('"');
  });
});

// ─── replace.exoticChars ────────────────────────────────────────────────────

describe("replace.exoticChars", () => {
  it("combines diacritics, BOM removal, and smart char replacement", () => {
    const txt = "Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ";
    expect(CleanText.replace.exoticChars(txt)).toBe("Internationalizati0n");
  });

  it("strips BOM", () => {
    expect(CleanText.replace.exoticChars("\uFEFFhello")).toBe("hello");
  });

  it("replaces smart quotes", () => {
    expect(CleanText.replace.exoticChars("\u201Chello\u201D")).toBe('"hello"');
  });

  it("handles all exotic chars in one pass", () => {
    const txt = "\uFEFF\u201Ccafé\u201D";
    expect(CleanText.replace.exoticChars(txt)).toBe('"cafe"');
  });

  it("handles empty string", () => {
    expect(CleanText.replace.exoticChars("")).toBe("");
  });

  it("leaves plain ASCII unchanged", () => {
    expect(CleanText.replace.exoticChars("hello world")).toBe("hello world");
  });
});

// ─── Module structure ───────────────────────────────────────────────────────

describe("Module structure", () => {
  it("exposes get namespace with expected methods", () => {
    expect(typeof CleanText.get.capitalized).toBe("function");
    expect(typeof CleanText.get.checksum).toBe("function");
    expect(typeof CleanText.get.filename).toBe("function");
    expect(typeof CleanText.get.reversed).toBe("function");
  });

  it("exposes is namespace with expected methods", () => {
    expect(typeof CleanText.is.hexCode).toBe("function");
  });

  it("exposes strip namespace with expected methods", () => {
    expect(typeof CleanText.strip.bom).toBe("function");
    expect(typeof CleanText.strip.emoji).toBe("function");
    expect(typeof CleanText.strip.extraSpace).toBe("function");
    expect(typeof CleanText.strip.gutenberg).toBe("function");
    expect(typeof CleanText.strip.newlines).toBe("function");
    expect(typeof CleanText.strip.nonASCII).toBe("function");
    expect(typeof CleanText.strip.punctuation).toBe("function");
    expect(typeof CleanText.strip.whitespace).toBe("function");
  });

  it("exposes replace namespace with expected methods", () => {
    expect(typeof CleanText.replace.diacritics).toBe("function");
    expect(typeof CleanText.replace.exoticChars).toBe("function");
    expect(typeof CleanText.replace.smartChars).toBe("function");
  });
});
