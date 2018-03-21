export { };
import { expect } from 'chai';
import { IModule } from '../definitions/module';
import CleanText from '../module/clean-text-util';

describe('Utils', () => {

    describe('Text Util', () => {

        it('should strip emojii', () => {
            const txt = '🙏🙏🙏 👍thumbs-up👍 for staying 💪strong💪 without 💩emoji💩 🙏🙏🙏';
            expect(CleanText.strip.emoji(txt)).to.equal('thumbs-up for staying strong without emoji');
        });

        it('should convert diacritic accents', () => {
            const txt = 'Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ';
            expect(CleanText.replace.exoticChars(txt)).to.equal('Internationalizati0n');
        });

        it('should replace smart quotes', () => {
            const txt = '“Hello.” hi mark ‘Oh hai mark’ "" „sdfs„';
            expect(CleanText.replace.smartChars(txt)).to.equal('"Hello." hi mark \'Oh hai mark\' "" "sdfs"');
        });

        it('should strip extra spaces', () => {
            const txt = '  too     many     spaces      !!  ';
            expect(CleanText.strip.extraSpace(txt)).to.equal('too many spaces !!');
        });

        it('should detect hex codes', () => {
            const hex1 = '#FFF';
            const hex2 = '#FFFFFF';
            const no_hex = 'something';
            expect(CleanText.is.hexCode(hex1)).to.equal(true);
            expect(CleanText.is.hexCode(hex2)).to.equal(true);
            expect(CleanText.is.hexCode(no_hex)).to.equal(false);
        });

        it('should get filenames from urls and filepaths', () => {
            const url = 'https://daviseford.com/blog/sample.html';
            const filepath = '/Users/davisford/Documents/clean-text-utils/src/util/diacritic.ts';
            expect(CleanText.get.filename(url)).to.equal('sample.html');
            expect(CleanText.get.filename(filepath)).to.equal('diacritic.ts');
        });

    });

    describe('Checksum Util', () => {
        it('should generate unique checksums for different workbooks', () => {
            const entries = [
                { astring: 'splendied', an_array: [{}, {}, { d: 'b' }] },
                { astring: 'splendied', an_array: [{}, {}, { d: 'b' }] },
                'a simple little string',
            ];
            const checksums = entries.map(entry => CleanText.get.checksum(entry, 'sha256'));
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
            const checksums = entries.map(entry => CleanText.get.checksum(entry.text, entry.algo));
            expect(checksums[0]).to.not.equal(checksums[1]);
            expect(checksums[0]).to.not.equal(checksums[2]);
            expect(checksums[0]).to.equal(checksums[3]);
        });
    });

});
