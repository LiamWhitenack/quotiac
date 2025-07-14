import HintBase from "./base";

class GiveALetterHint extends HintBase {
    letter: string

    constructor(letter: string) {
        super()
        this.readable = "Free Letter"
        this.letter = letter;
    }

    static fromJSON(data: any): GiveALetterHint {
        return new GiveALetterHint(data.letter);
    }
}

export default GiveALetterHint;