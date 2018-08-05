/* tslint:disable:max-line-length */
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

        it('should get reversed string', () => {
            const str = '💩emoji💪';
            const expected = '💪ijome💩';
            expect(CleanText.get.reversed(str)).to.equal(expected);
        });

        it('should get capitalized version of a string', () => {
            const str = 'the B.I.G. boy.';
            const expected = 'The B.I.G. boy.';
            expect(CleanText.get.capitalized(str)).to.equal(expected);
        });

        it('should strip common punctuation characters', () => {
            const str = 'This., -/ is #! an $ % ^ & * example ;: {} of a = -_ string with `~)() punctuation.';
            const expected = 'This is an example of a string with punctuation';
            expect(CleanText.strip.punctuation(str)).to.equal(expected);
        });

        it('should strip whitespace characters', () => {
            const str = '  \t Some    spaces here to remove ';
            const expected = 'Somespacesheretoremove';
            expect(CleanText.strip.whitespace(str)).to.equal(expected);
        });

        it('should strip newline characters', () => {
            const str = 'Some \n newlines and \r carriage returns';
            const expected = 'Some  newlines and  carriage returns';
            expect(CleanText.strip.newlines(str)).to.equal(expected);
        });

    });

    it('should generate unique checksums for different data structures', () => {
        const entries = [
            { astring: 'splendied', an_array: [{}, {}, { d: 'b' }] },   // same as below
            { astring: 'splendied', an_array: [{}, {}, { d: 'b' }] },   // same as above
            ['a simple little string', null, 0, { b: 12 }],
        ];
        const checksums = entries.map(entry => CleanText.get.checksum(entry, 'sha256'));
        expect(checksums[0]).to.equal(checksums[1]);
        expect(checksums[2]).to.not.equal(checksums[0]);
        expect(checksums[2]).to.not.equal(checksums[1]);
    });

    it('should accept different checksum algorithms and provide a default', () => {
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
