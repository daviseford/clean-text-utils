export { };
import { IModule } from '../definitions/module';
import { ITextUtils } from '../definitions/utils';

const TextUtils: ITextUtils = require('../util/text_util');

const Module: IModule = {

    get: {
        checksum: TextUtils.checksum,
    },

    strip: {
        bom: TextUtils.stripBom,
        emoji: TextUtils.stripEmoji,
        nonASCII: TextUtils.stripNonASCII,
    },

    replace: {
        diacritics: TextUtils.replaceDiacritics,
        exoticChars: TextUtils.replaceExoticChars,
        smartChars: TextUtils.replaceSmartChars,
    },

};
module.exports = Module;
