import { describe, expect, it } from "vitest";
import {
  capitalize,
  checksum,
  filename,
  isHexCode,
  replaceDiacritics,
  replaceExoticChars,
  replaceSmartChars,
  reverse,
  stripBom,
  stripEmoji,
  stripExtraSpace,
  stripGutenberg,
  stripNewlines,
  stripNonASCII,
  stripPunctuation,
  stripWhitespace,
} from "../index";

describe("direct exports", () => {
  it("exposes every utility without requiring a namespace", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(checksum("hello")).toMatch(/^[a-f0-9]{64}$/);
    expect(filename("/path/file.txt")).toBe("file.txt");
    expect(reverse("🇺🇸abc")).toBe("cba🇺🇸");
    expect(isHexCode("#fff")).toBe(true);
    expect(replaceDiacritics("café")).toBe("cafe");
    expect(replaceExoticChars("\uFEFF“café”")).toBe('"cafe"');
    expect(replaceSmartChars("“hello”")).toBe('"hello"');
    expect(stripBom("\uFEFFhello")).toBe("hello");
    expect(stripEmoji("hello 🌍")).toBe("hello");
    expect(stripExtraSpace("  hello   world  ")).toBe("hello world");
    expect(stripGutenberg("plain text")).toBe("plain text");
    expect(stripNewlines("hello\nworld")).toBe("helloworld");
    expect(stripNonASCII("café")).toBe("caf");
    expect(stripPunctuation("hello, world!")).toBe("hello world");
    expect(stripWhitespace("hello world")).toBe("helloworld");
  });
});
