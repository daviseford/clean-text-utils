export interface ITextUtils {
    checksum: (data: any) => string;
    cleanText: (data: any) => any;
    replaceDiacritics: (text: string) => string;
    replaceSmartChars: (text: string) => string;
    replaceExoticChars: (text: string) => string;
    stripBom: (text: string) => string;
    stripNonASCII: (text: string) => string;
    stripEmoji: (text: string) => string;
    superCleanText: (data: any) => string | null;
}
