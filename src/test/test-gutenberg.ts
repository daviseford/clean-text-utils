/* tslint:disable:max-line-length */
import { expect } from 'chai';
import CleanText from '../module/clean-text-util';

describe('strip.gutenberg', () => {
    it('should remove Project Gutenberg header', () => {
        const dickens = `
    The Project Gutenberg EBook of A Tale of Two Cities, by Charles Dickens
    Character set encoding: UTF-8

    *** START OF THIS PROJECT GUTENBERG EBOOK A TALE OF TWO CITIES ***

    Produced by Judith Boss

    *** END OF THIS PROJECT GUTENBERG EBOOK A TALE OF TWO CITIES ***
    ***** This file should be named 98-0.txt or 98-0.zip *****
    This and all associated files of various formats will be found in:
            http://www.gutenberg.org/9/98/`;
        const gutenberg_text = CleanText.strip.gutenberg(dickens).trim();
        expect(gutenberg_text).to.equal('Produced by Judith Boss');

    });
    it('should remove Project Gutenberg header/footer', () => {
        const frank = `
    Project Gutenberg's Frankenstein, by Mary Wollstonecraft (Godwin) Shelley
    Title: Frankenstein or The Modern Prometheus
    Author: Mary Wollstonecraft (Godwin) Shelley
    Release Date: June 17, 2008 [EBook #84]
    Last updated: January 13, 2018
    Language: English
    Character set encoding: UTF-8

    *** START OF THIS PROJECT GUTENBERG EBOOK FRANKENSTEIN ***

    He sprang from the cabin-window as he said this, upon the ice raft which lay close to the vessel.

    *** END OF THIS PROJECT GUTENBERG EBOOK FRANKENSTEIN ***
    ***** This file should be named 84-0.txt or 84-0.zip *****
    This and all associated files of various formats will be found in:
            http://www.gutenberg.org/8/84/

    Produced by Judith Boss, Christy Phillips, Lynn Hanninen,
    and David Meltzer. HTML version by Al Haines.
    Further corrections by Menno de Leeuw.`;
        const gutenberg_text = CleanText.strip.gutenberg(frank).trim();
        expect(gutenberg_text).to.equal('He sprang from the cabin-window as he said this, upon the ice raft which lay close to the vessel.');
    });

    it('should be selective about removal', () => {
        const custom = `
     80=2y3hr9q[84tmwfg ,/s s49tuj0u**Y*#@r hh8*******Y#8r82hi2nfds/f *****
    Character set encoding: UTF-8
    *** IMPORTANT STUFF DESIGNED TO TRIP UP THE REGEX ***

    *** START OF THIS PROJECT GUTENBERG EBOOK A TALE OF TWO CITIES ***

   I should be the only text left, even though technically, this is the start of this project gutenberg ebook and this is *** THE END ***

    *** END OF THIS PROJECT GUTENBERG EBOOK A TALE OF TWO CITIES ***
    I BET THIS MESS WITH IT
    *** START OF THIS PROJECT GUTENBERG EBOOK A TALE OF TWO CITIES ***
    ***** This file should be named 98-0.txt or 98-0.zip *****
    This and all associated files of various formats will be found in:
            http://www.gutenberg.org/9/98/`;
        const gutenberg_text = CleanText.strip.gutenberg(custom).trim();
        expect(gutenberg_text).to.equal('I should be the only text left, even though technically, this is the start of this project gutenberg ebook and this is *** THE END ***');

    });

    it('should leave non-gutenberg files alone', () => {
        const innocent = `
    *** IMPORTANT STUFF DESIGNED TO TRIP UP THE REGEX ***
    *** START OF THIS DAMN ASTERIK STUFF ***
    *** END OF THIS EBOOK FRANKLY it SUCKED ***
    project gutenberg is the best
    I BET THIS MESS WITH IT
    *** START OF A TALE OF TWO CITIES ***
    This and all associated files of various formats will be found in:
            http://www.gutenberg.org/9/98/`;
        const gutenberg_text = CleanText.strip.gutenberg(innocent);
        expect(gutenberg_text).to.equal(innocent);

    });
});
