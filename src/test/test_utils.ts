export { };

import { ITextUtils } from '../definitions/utils';

const { expect } = require('chai');
const path = require('path');

const TextUtils: ITextUtils = require('../util/text_util');

const checksum = require('../util/checksum');

describe('Utils', () => {

    describe('Text Util', () => {

        it('should strip emojii', () => {
            const txt = '🙏🙏🙏 👍thumbs-up👍 for staying 💪strong💪 without 💩emoji💩 🙏🙏🙏';
            expect(TextUtils.stripEmoji(txt)).to.equal('thumbs-up for staying strong without emoji');
        });

        it('should convert diacritic accents', () => {
            const txt = 'Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ';
            expect(TextUtils.replaceExoticChars(txt)).to.equal('Internationalizati0n');
        });

        it('should replace smart quotes', () => {
            const txt = '“Hello.” hi mark ‘Oh hai mark’ sdfksjlfjls "" sdfs';
            expect(TextUtils.replaceSmartChars(txt)).to.equal('"Hello." hi mark \'Oh hai mark\' sdfksjlfjls "" sdfs');
        });

        it('should strip extra spaces', () => {
            const txt = '  too     many     spaces      !!  ';
            expect(TextUtils.stripExtraSpace(txt)).to.equal('too many spaces !!');
        });

    });

    describe('Checksum Util', () => {
        it('should generate unique checksums for different workbooks', () => {
            const entries = [
                { astring: 'splendied', an_array: [{}, {}, { d: 'b' }] },
                { astring: 'splendied', an_array: [{}, {}, { d: 'b' }] },
                'a simple little string',
            ];
            const checksums = entries.map(entry => checksum(entry, 'sha256'));
            expect(checksums[0]).to.equal(checksums[1]);
            expect(checksums[2]).to.not.equal(checksums[0]);
            expect(checksums[2]).to.not.equal(checksums[1]);
        });

        it('should accept different algorithms and provide a default', () => {
            const entries = [
                { text: 'yo what up, checksum me', algo: 'sha256' },
                { text: 'yo what up, checksum me', algo: 'sha1' },
                { text: 'yo what up, checksum me', algo: 'md5' },
                { text: 'yo what up, checksum me', algo: 'WHAT THE F IS AN AL GO RYTYHM' },
            ];
            const checksums = entries.map(entry => checksum(entry.text, entry.algo));
            expect(checksums[0]).to.not.equal(checksums[1]);
            expect(checksums[0]).to.not.equal(checksums[2]);
            expect(checksums[0]).to.equal(checksums[3]);
        });
    });

});
