export interface ITextUtils {
    capitalizeWord: (text: string) => string;
    getFileName: (url: string) => string;
    isHexCode: (txt: string) => boolean;
    replaceSmartChars: (text: string) => string;
    replaceExoticChars: (text: string) => string;
    stripExtraSpace: (text: string) => string;
    stripNonASCII: (text: string) => string;
}
