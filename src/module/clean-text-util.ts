export { };
import { IModule } from '../definitions/module';
import TextUtils from '../util/text-util';

const Module: IModule = {

    get: {
        checksum: TextUtils.checksum,
        filename: TextUtils.getFileName,
    },

    is: {
        hexCode: TextUtils.isHexCode,
    },

    replace: {
        diacritics: TextUtils.replaceDiacritics,
        exoticChars: TextUtils.replaceExoticChars,
        smartChars: TextUtils.replaceSmartChars,
    },

    strip: {
        bom: TextUtils.stripBom,
        emoji: TextUtils.stripEmoji,
        extraSpace: TextUtils.stripExtraSpace,
        nonASCII: TextUtils.stripNonASCII,
    },

};

export default Module;
