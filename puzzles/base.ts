import HintBase from "./hints/base";

type EncryptionMap = Map<string, string>;

class CryptographBase {
    stringToEncrypt: string;
    puzzleType: string;
    hints: HintBase[];
    encodingMap: EncryptionMap;
    otherInfo: Map<string, string>

    constructor(
        stringToEncrypt: string,
        puzzleType: string,
        hints: HintBase[],
        encryptionMap: EncryptionMap,
        otherInfo: Map<string, string>
    ) {
        this.stringToEncrypt = stringToEncrypt;
        this.puzzleType = puzzleType;
        this.hints = hints;
        this.encodingMap = encryptionMap;
        this.otherInfo = otherInfo;
    }
}


export { EncryptionMap };
export default CryptographBase;