import HintBase from "../hints/base";

type EncryptionMap = Map<string, string>;

class CryptographBase {
    stringToEncrypt: string;
    puzzleType: string;
    hints: HintBase[];
    encodingMap: EncryptionMap;

    constructor(
        stringToEncrypt: string,
        puzzleType: string,
        hints: HintBase[],
        encryptionMap: EncryptionMap
    ) {
        this.stringToEncrypt = stringToEncrypt;
        this.puzzleType = puzzleType;
        this.hints = hints;
        this.encodingMap = encryptionMap;
    }
}


export { EncryptionMap };
export default CryptographBase;