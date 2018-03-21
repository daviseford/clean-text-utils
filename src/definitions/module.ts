export interface IModuleGet {
    checksum: (data: any, algorithm: string) => string;
    filename: (text: string) => string;
}

export interface IModuleIs {
    hexCode: (txt: string) => boolean;
}

export interface IModuleStrip {
    bom: (text: string) => string;
    extraSpace: (text: string) => string;
    emoji: (text: string) => string;
    gutenberg: (text: string) => string;
    nonASCII: (text: string) => string;
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
