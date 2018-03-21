export interface ITextUtils {
    checksum: (data: any, algorithm: string) => string;
    cleanText: (data: any) => any;
    getFileName: (url: string) => string;
    isHexCode: (txt: string) => boolean;
    replaceDiacritics: (text: string) => string;
    replaceSmartChars: (text: string) => string;
    replaceExoticChars: (text: string) => string;
    stripBom: (text: string) => string;
    stripExtraSpace: (text: string) => string;
    stripNonASCII: (text: string) => string;
    stripEmoji: (text: string) => string;
    superCleanText: (data: any) => string | null;
}
