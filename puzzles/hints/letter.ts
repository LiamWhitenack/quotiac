import HintBase from "./base";

class GiveALetterHint extends HintBase {
    letter: string

    constructor(letter: string) {
        super()
        this.readable = "Free Letter"
        this.letter = letter;
    }
}

export default GiveALetterHint;