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



const parseHints = (rawHints: string | { letter: string; type: string }[]): HintBase[] => {
    // Step 1: If it's a string, parse it; otherwise, use as-is
    let parsedHints: { letter: string; type: string }[];
    if (typeof rawHints === "string") {
        // replace single quotes with double quotes just in case
        const validJson = rawHints.replace(/'/g, '"');
        parsedHints = JSON.parse(validJson);
    } else {
        parsedHints = rawHints;
    }

    // Step 2: Map to HintBase instances
    return parsedHints.map((hintData) => {
        const HintClass = HINT_TYPE_MAP.get(hintData.type as SupportedHintTypeName);
        if (!HintClass) throw new Error(`Unsupported hint type: ${hintData.type}`);
        return new HintClass(hintData.letter);
    });
};


const parseOtherInfo = (mapInput: string | Record<string, string>): Map<string, string> => {
    let obj: Record<string, string>;

    if (typeof mapInput === "string") {
        // replace single quotes with double quotes if needed
        const jsonString = mapInput.replace(/'/g, '"');
        obj = JSON.parse(jsonString);
    } else {
        obj = mapInput;
    }

    return new Map<string, string>(Object.entries(obj));
};


const parseEncryptionMap = (mapInput: string | Record<string, string>): Map<string, string> => {
    let obj: Record<string, string>;

    if (typeof mapInput === "string") {
        // replace single quotes with double quotes if needed
        const jsonString = mapInput.replace(/'/g, '"');
        obj = JSON.parse(jsonString);
    } else {
        obj = mapInput;
    }

    return new Map<string, string>(Object.entries(obj));
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



// --- Main fetchQuote Function ---
const fetchQuote = async (dateString: string): Promise<CryptographBase | null> => {
    try {
        // 1. Check AsyncStorage
        const storedPuzzle = await AsyncStorage.getItem(`quote_${dateString}`);
        if (storedPuzzle) {
            const puzzleData = JSON.parse(storedPuzzle);
            try {
                return new CryptographBase(
                    puzzleData.string_to_encrypt,
                    puzzleData.puzzle_type,
                    parseHints(puzzleData.hints),
                    parseEncryptionMap(puzzleData.encryption_map),
                    parseOtherInfo(puzzleData.other_info)
                );
            } catch (error) {
                console.error("Error parsing stored puzzle:", error);
            }
        }

        // 2. Fetch from network
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