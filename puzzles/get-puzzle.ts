import { CharacterQuote, DirectQuote, FamousDocumentQuote, GeneralPhrase, SongLyrics } from "./puzzle-types/quote";
import CryptographBase, { EncryptionMap } from "./puzzle-types/base";
import HintBase from "./hints/base";
import GiveALetterHint from "./hints/letter";



type SupportedPuzzleTypeName =
    | "CharacterQuote"
    | "DirectQuote"
    | "FamousDocumentQuote"
    | "GeneralPhrase"
    | "SongLyrics";

// You can extend this map as you add more puzzle types
const PUZZLE_TYPE_MAP = new Map<SupportedPuzzleTypeName, new (...args: any[]) => CryptographBase>([
    ["CharacterQuote", CharacterQuote],
    ["DirectQuote", DirectQuote],
    ["FamousDocumentQuote", FamousDocumentQuote],
    ["GeneralPhrase", GeneralPhrase],
    ["SongLyrics", SongLyrics],
]);

type SupportedHintTypeName = "GiveALetterHint";

// Map of hint type strings to constructors
const HINT_TYPE_MAP = new Map<SupportedHintTypeName, new (...args: any[]) => HintBase>([
    ["GiveALetterHint", GiveALetterHint],
]);



const parseHints = (rawHints: string): HintBase[] => {
    const validJson = rawHints.replace(/'/g, '"');

    const parsed: { letter: string; type: string }[] = JSON.parse(validJson);
    return parsed.map((hintData: any) => {
        const HintClass = HINT_TYPE_MAP.get(hintData.type as SupportedHintTypeName);
        if (!HintClass) throw new Error(`Unsupported hint type: ${hintData.type}`);
        return new HintClass(hintData.letter);
    });
};

const parseEncryptionMap = (mapString: string): EncryptionMap => {
    const jsonString = mapString.replace(/'/g, '"');
    console.log(jsonString)
    const obj = JSON.parse(jsonString);
    console.log(new Map<string, string>(Object.entries(obj)));
    return new Map<string, string>(Object.entries(obj));
};

const fetchTodayQuote = async (): Promise<CryptographBase> => {

    const response = await fetch("https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/refs/heads/dev/resources/test.json");
    const puzzleData = await response.json();

    const hints = parseHints(puzzleData.hints);
    const encryptionMap = parseEncryptionMap(puzzleData.encryption_map);

    const PuzzleClass = PUZZLE_TYPE_MAP.get(puzzleData.type as SupportedPuzzleTypeName);
    if (!PuzzleClass) {
        throw new Error(`Unsupported or unimplemented puzzle type: ${puzzleData.type}`);
    }
    // @ts-ignore
    return PuzzleClass.fromJSON(puzzleData, hints, encryptionMap);
};

export { fetchTodayQuote };