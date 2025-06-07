class CryptographBase {
    stringToEncrypt: string;
    puzzleType: string;

    constructor(stringToEncrypt: string, puzzleType: string = "Undefined") {
        this.stringToEncrypt = stringToEncrypt;
        this.puzzleType = puzzleType;
    }
}

export default CryptographBase;