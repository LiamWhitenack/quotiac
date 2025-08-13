import CryptographBase, { EncryptionMap } from "./base";
import HintBase from "./hints/base";
import GiveALetterHint from "./hints/letter";

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

const parseOtherInfo = (mapString: string): Map<string, string> => {
    const jsonString = mapString.replace(/'/g, '"');
    const obj = JSON.parse(jsonString);
    return new Map<string, string>(Object.entries(obj));
};

const parseEncryptionMap = (mapString: string): EncryptionMap => {
    const jsonString = mapString.replace(/'/g, '"');
    const obj = JSON.parse(jsonString);
    return new Map<string, string>(Object.entries(obj));
};

import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchQuote = async (dateString: string): Promise<CryptographBase> => {
    try {
        // 1. Check AsyncStorage first
        const storedPuzzle = await AsyncStorage.getItem(`quote_${dateString}`);
        if (storedPuzzle) {
            const puzzleData = JSON.parse(storedPuzzle);
            return new CryptographBase(
                puzzleData.string_to_encrypt,
                puzzleData.puzzle_type,
                parseHints(puzzleData.hints),
                parseEncryptionMap(puzzleData.encryption_map),
                parseOtherInfo(puzzleData.other_info)
            );
        }

        // 2. If not found in storage, fetch from network
        let response = await fetch(
            `https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/refs/heads/dev/resources/by-date/${dateString}.json`
        );

        let puzzleData;
        if (response.ok) {
            puzzleData = await response.json();
        } else {
            const fallbackResponse = await fetch(
                `https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/refs/heads/dev/resources/auto-generated/${dateString}.json`
            );
            puzzleData = await fallbackResponse.json();
        }

        // 3. Save fetched data to AsyncStorage for future use
        await AsyncStorage.setItem(`quote_${dateString}`, JSON.stringify(puzzleData));

        return new CryptographBase(
            puzzleData.string_to_encrypt,
            puzzleData.puzzle_type,
            parseHints(puzzleData.hints),
            parseEncryptionMap(puzzleData.encryption_map),
            parseOtherInfo(puzzleData.other_info)
        );

    } catch (error) {
        console.error("Error fetching quote:", error);
        throw error;
    }
};


const fetchTutorialQuote = async (): Promise<CryptographBase> => {
    let puzzleData;

    // TODO update this to use main when ready to use routing
    const response = await fetch(`https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/refs/heads/dev/resources/tutorial.json`);
    puzzleData = await response.json();
    console.log(puzzleData);
    return new CryptographBase(puzzleData.string_to_encrypt, puzzleData.puzzle_type, parseHints(puzzleData.hints), parseEncryptionMap(puzzleData.encryption_map), parseOtherInfo(puzzleData.other_info));
};

export { fetchQuote as fetchTodayQuote, fetchTutorialQuote };