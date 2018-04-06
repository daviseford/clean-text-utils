import { IModule } from '../definitions/module';
import checksum from '../util/checksum';
import replaceDiacritics from '../util/diacritic';
import stripEmoji from '../util/emoji-regex';
import esrever from '../util/reverse';
import stripBom from '../util/strip-bom';
import stripGutenberg from '../util/strip-gutenberg';
import TextUtils from '../util/text-util';

const Module: IModule = {

    get: {
        checksum,
        filename: TextUtils.getFileName,
        reversed: esrever,
    },

    is: {
        hexCode: TextUtils.isHexCode,
    },

    replace: {
        diacritics: replaceDiacritics,
        exoticChars: TextUtils.replaceExoticChars,
        smartChars: TextUtils.replaceSmartChars,
    },

    strip: {
        bom: stripBom,
        emoji: stripEmoji,
        extraSpace: TextUtils.stripExtraSpace,
        gutenberg: stripGutenberg,
        nonASCII: TextUtils.stripNonASCII,
    },

};

export default Module;
