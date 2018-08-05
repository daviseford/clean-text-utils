export type Algorithm = 'sha' | 'sha1' | 'sha256' | 'sha512' | 'md5';
export interface IModuleGet {
    capitalized: (text: string) => string;
    checksum: (data: any, algorithm?: string) => string;
    filename: (text: string) => string;
    reversed: (text: string) => string;
}

export interface IModuleIs {
    hexCode: (txt: string) => boolean;
}

export interface IModuleStrip {
    bom: (text: string) => string;
    emoji: (text: string) => string;
    extraSpace: (text: string) => string;
    gutenberg: (text: string) => string;
    newlines: (text: string) => string;
    nonASCII: (text: string) => string;
    punctuation: (text: string) => string;
    whitespace: (text: string) => string;
}

export interface IModuleReplace {
    exoticChars: (text: string) => string;
    smartChars: (text: string) => string;
    diacritics: (text: string) => string;
}

export interface IModule {
    get: IModuleGet;
    is: IModuleIs;
    strip: IModuleStrip;
    replace: IModuleReplace;
}
