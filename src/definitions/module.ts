export interface IModuleGet {
    checksum: (content: any) => string;
}

export interface IModuleStrip {
    bom: (text: string) => string;
    extraSpace: (text: string) => string;
    emoji: (text: string) => string;
    nonASCII: (text: string) => string;
}

export interface IModuleReplace {
    exoticChars: (text: string) => string;
    smartChars: (text: string) => string;
    diacritics: (text: string) => string;
}

export interface IModule {
    get: IModuleGet;
    strip: IModuleStrip;
    replace: IModuleReplace;
}
