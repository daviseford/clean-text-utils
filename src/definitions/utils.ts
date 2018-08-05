export interface ITextUtils {
    capitalizeWord: (text: string) => string;
    getFileName: (url: string) => string;
    isHexCode: (txt: string) => boolean;
    replaceExoticChars: (text: string) => string;
    replaceSmartChars: (text: string) => string;
    stripExtraSpace: (text: string) => string;
    stripNewLines: (text: string) => string;
    stripNonASCII: (text: string) => string;
    stripPunctuation: (text: string) => string;
    stripWhitespace: (text: string) => string;
}
