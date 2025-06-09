import HintBase from "../hints/base";
import GiveALetterHint from "../hints/letter";

function shuffleAlphabeticCharacters(input: string): string[] {
    const filtered = input
        .split('')
        .filter((char) => /^[a-zA-Z]$/.test(char)).map((char) => char.toUpperCase());

    // Shuffle using Fisher-Yates algorithm
    for (let i = filtered.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered;
}

class CryptographBase {
    stringToEncrypt: string;
    puzzleType: string;
    hints: HintBase[];

    constructor(stringToEncrypt: string, puzzleType: string = "Undefined", hints: HintBase[] = []) {
        this.stringToEncrypt = stringToEncrypt;
        this.puzzleType = puzzleType;
        this.hints = hints.concat(shuffleAlphabeticCharacters(stringToEncrypt).map(letter => new GiveALetterHint(letter)))
    }
}

export default CryptographBase;