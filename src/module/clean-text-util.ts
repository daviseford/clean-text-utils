export { };
import { IModule } from '../definitions/module';
import { ITextUtils } from '../definitions/utils';

const TextUtils: ITextUtils = require('../util/text_util');

const Module: IModule = {

    get: {
        checksum: TextUtils.checksum,
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

export = Module;
