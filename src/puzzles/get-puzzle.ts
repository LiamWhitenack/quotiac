import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptographBase, { EncryptionMap } from "./base";
import HintBase from "./hints/base";
import GiveALetterHint from "./hints/letter";
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import firebaseConfig from "@/firebaseConfig.json";

type SupportedHintTypeName = "GiveALetterHint";

// Map of hint type strings to constructors
const HINT_TYPE_MAP = new Map<SupportedHintTypeName, new (...args: any[]) => HintBase>([
    ["GiveALetterHint", GiveALetterHint],
]);

export const loadPersistedState = async (dateString: string) => {
    const decodingMapJson = await AsyncStorage.getItem(`decodingMap-${dateString}`);
    const hintsJson = await AsyncStorage.getItem(`hintLetters-${dateString}`);

    let decodingMap: Map<string, string> | null = null;
    let givenHintLetters: string[] | null = null;

    if (decodingMapJson) {
        const entries = JSON.parse(decodingMapJson);
        decodingMap = new Map(entries);
    }

    if (hintsJson) {
        givenHintLetters = JSON.parse(hintsJson);
    }

    return { decodingMap, givenHintLetters };
};



const parseHints = (rawHints: string): HintBase[] => {

    let parsed: { letter: string; type: string }[];
    if (typeof rawHints === "string") {
        const validJson = rawHints.replace(/'/g, '"');
        parsed = JSON.parse(validJson);
    } else {
        parsed = rawHints;
    }
    return parsed.map((hintData: any) => {
        const HintClass = HINT_TYPE_MAP.get(hintData.type as SupportedHintTypeName);
        if (!HintClass) throw new Error(`Unsupported hint type: ${hintData.type}`);
        return new HintClass(hintData.letter);
    });
};

const parseOtherInfo = (mapString: string): Map<string, string> => {
    let puzzle: Record<string, any>;
    if (typeof mapString === "string") {
        puzzle = JSON.parse(mapString.replace(/'/g, '"'));
    } else {
        puzzle = mapString;
    }
    return new Map<string, string>(Object.entries(puzzle));
};

const parseEncryptionMap = (mapString: string): EncryptionMap => {
    let parsed: Map<string, string>[];
    if (typeof mapString === "string") {
        parsed = JSON.parse(mapString.replace(/'/g, '"'));
    } else {
        parsed = mapString;
    }
    // @ts-ignore
    return new Map<string, string>(Object.entries(parsed));
};


// --- Google Analytics Helpers ---
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics: Analytics | null = null
if (typeof window !== "undefined") {
    let analytics = getAnalytics(app);
    logEvent(analytics, "page_view"); // Logs page load
}

export const fetchQuoteFromStorage = async (dateString: string): Promise<CryptographBase | null> => {
    const puzzleData: string | object | null = await AsyncStorage.getItem(`quote_${dateString}`);
    let puzzle: Record<string, any>;
    if (puzzleData === null) return null
    if (typeof puzzleData === "string") {
        puzzle = JSON.parse(puzzleData);
    } else {
        puzzle = puzzleData;
    }
    return new CryptographBase(
        puzzle.string_to_encrypt,
        puzzle.puzzle_type,
        parseHints(puzzle.hints),
        parseEncryptionMap(puzzle.encryption_map),
        parseOtherInfo(puzzle.other_info)
    );
}


// --- Main fetchQuote Function ---
const fetchQuote = async (dateString: string): Promise<CryptographBase | null> => {
    try {
        // 1. Check AsyncStorage
        const storedQuote = await fetchQuoteFromStorage(dateString);
        if (storedQuote) return storedQuote;

        // 2. Fetch from network
        let response = await fetch(
            `https://raw.githubusercontent.com/LiamWhitenack/quotiac-data/refs/heads/dev/resources/by-date/${dateString}.json`
        );

        let puzzleData;
        if (response.ok) {
            puzzleData = await response.json();
        } else {
            const fallbackResponse = await fetch(
                `https://raw.githubusercontent.com/LiamWhitenack/quotiac-data/refs/heads/dev/resources/auto-generated/${dateString}.json`
            );
            if (!fallbackResponse.ok) {
                return null;
            }
            puzzleData = await fallbackResponse.json();
        }
        // 3. Log GA event
        if (analytics !== null) {
            logEvent(analytics, "load_puzzle", { "date": dateString });
        }
        // logEvent(analytics, "fetch-from-github");

        // 4. Save to AsyncStorage
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
    const response = await fetch(`https://raw.githubusercontent.com/LiamWhitenack/quotiac-puzzles/refs/heads/dev/resources/tutorial.json`);
    puzzleData = await response.json();
    console.log(puzzleData);
    return new CryptographBase(puzzleData.string_to_encrypt, puzzleData.puzzle_type, parseHints(puzzleData.hints), parseEncryptionMap(puzzleData.encryption_map), parseOtherInfo(puzzleData.other_info));
};

export { fetchQuote as fetchTodayQuote, fetchTutorialQuote };