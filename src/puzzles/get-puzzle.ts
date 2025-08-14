import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptographBase, { EncryptionMap } from "./base";
import HintBase from "./hints/base";
import GiveALetterHint from "./hints/letter";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

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


// --- Google Analytics Helpers ---
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz3lp-IC8pIs4JNpONEPqBIaTb7xkk4D4",
    authDomain: "quotiac-4d586.firebaseapp.com",
    projectId: "quotiac-4d586",
    storageBucket: "quotiac-4d586.firebasestorage.app",
    messagingSenderId: "419348914870",
    appId: "1:419348914870:web:1732808e772de1450d3c17",
    measurementId: "G-LDNMWDBBL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// --- Main fetchQuote Function ---
const fetchQuote = async (dateString: string): Promise<CryptographBase> => {
    try {
        // 1. Check AsyncStorage
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

        // 2. Fetch from network
        let response = await fetch(
            `https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/refs/heads/dev/resources/by-date/${dateString}.json`
        );

        let puzzleData;
        let source = "primary";
        if (response.ok) {
            puzzleData = await response.json();
        } else {
            const fallbackResponse = await fetch(
                `https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/refs/heads/dev/resources/auto-generated/${dateString}.json`
            );
            puzzleData = await fallbackResponse.json();
            source = "fallback";
        }

        // 3. Log GA event
        logEvent(analytics, "fetch-from-github");

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
    const response = await fetch(`https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/refs/heads/dev/resources/tutorial.json`);
    puzzleData = await response.json();
    console.log(puzzleData);
    return new CryptographBase(puzzleData.string_to_encrypt, puzzleData.puzzle_type, parseHints(puzzleData.hints), parseEncryptionMap(puzzleData.encryption_map), parseOtherInfo(puzzleData.other_info));
};

export { fetchQuote as fetchTodayQuote, fetchTutorialQuote };