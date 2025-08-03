import KEYBOARD_LETTERS from "@/src/keyboard/keyboard-letters";
import { mapsAreEqual } from "@/src/utils";
import { wrapWords } from "@/src/sizing/wrap-words";
import sizing from "@/src/sizing/sizing";
import GiveALetterHint from "@/src/puzzles/hints/letter";
import type { Theme } from "@/src/theme/themes";
import CryptographBase from "@/src/puzzles/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

function inverseMap(map: Map<string, string>): Map<string, string> {
    const inverse = new Map<string, string>();
    map.forEach((v, k) => inverse.set(v, k));
    return inverse;
}
function isACapitalLetter(x: string) {
    return x.length === 1 && x >= "A" && x <= "Z";
}
function findCharacterBackward(chars: string[], i: number, target: string): number {
    for (; i >= 0; i--) if (chars[i] === target) return i;
    return -1;
}

class GameState {
    puzzleDate: string;
    puzzle: CryptographBase;
    quote: string;
    quoteHeight: number;
    encodingMap: Map<string, string>;
    fireConfetti: boolean;
    solution: Map<string, string>;
    solved: boolean;
    decodingMap: Map<string, string>;
    inverseDecodingMap: Map<string, string>;
    givenHintLetters: string[];
    activeIcon: string;
    keyboardValues: string[][];
    quoteIndex: number;
    encodedQuote: string[];
    showAppTitle: boolean;

    constructor(puzzleDate: string, puzzle: CryptographBase) {
        this.puzzleDate = puzzleDate;
        this.puzzle = puzzle;
        this.quote = wrapWords(puzzle.stringToEncrypt.split(" "), (sizing.maxWidth * 0.9) / sizing.iconSize);
        this.quoteHeight = this.quote.split("@").length * sizing.iconSize - sizing.iconSize;
        this.encodingMap = puzzle.encodingMap;
        this.solution = inverseMap(this.encodingMap);
        this.fireConfetti = false;
        this.solved = false;
        this.decodingMap = new Map();
        this.inverseDecodingMap = new Map();
        this.givenHintLetters = [];
        this.keyboardValues = KEYBOARD_LETTERS;
        this.encodedQuote = this.encodeQuote(this.quote.toLowerCase());
        this.activeIcon = this.encodedQuote[0];
        this.quoteIndex = -1;
        this.showAppTitle = true;
    }

    decreaseQuoteIconSize() {
        sizing.iconSize -= 1;
        this.quote = wrapWords(this.puzzle.stringToEncrypt.split(" "), (sizing.maxWidth * 0.9) / sizing.iconSize);
        this.setQuoteHeight(sizing.iconSize)
        this.encodedQuote = this.encodeQuote(this.quote);
    }


    static async create(puzzleDate: string, puzzle: CryptographBase): Promise<GameState> {
        const gameState = new GameState(puzzleDate, puzzle);
        await gameState.loadPersistedState();
        gameState.setActiveIcon(gameState.getNextIconName())
        return gameState;
    }

    get decodingMapKey() {
        return `decodingMap-${this.puzzleDate}`;
    }

    get hintLettersKey() {
        return `hintLetters-${this.puzzleDate}`;
    }

    async loadPersistedState() {
        const decodingMapJson = await AsyncStorage.getItem(this.decodingMapKey);
        const hintsJson = await AsyncStorage.getItem(this.hintLettersKey);

        if (decodingMapJson) {
            const entries = JSON.parse(decodingMapJson);
            const decodingMap = new Map(entries);
            // @ts-ignore
            await this.setDecodingMap(decodingMap);
            this.updateKeyboardValues();
            this.checkSolved();
        }

        if (hintsJson) {
            this.givenHintLetters = JSON.parse(hintsJson);
        }
    }

    async persistState() {
        await AsyncStorage.setItem(this.decodingMapKey, JSON.stringify(Array.from(this.decodingMap.entries())));
        await AsyncStorage.setItem(this.hintLettersKey, JSON.stringify(this.givenHintLetters));
    }

    async clearPersistedState() {
        await AsyncStorage.removeItem(this.decodingMapKey);
        await AsyncStorage.removeItem(this.hintLettersKey);
    }

    async giveAHint() {
        if (this.givenHintLetters.length > 4) return;
        for (const [, hint] of this.puzzle.hints.entries()) {
            if (hint instanceof GiveALetterHint && !this.userHasDiscoveredLetter(hint)) {
                this.givenHintLetters.push(hint.letter);
                const updatedMap = new Map(this.decodingMap);
                updatedMap.delete(this.inverseDecodingMap.get(hint.letter)!);
                updatedMap.set(this.encodingMap.get(hint.letter)!, hint.letter);
                await this.setDecodingMap(updatedMap);
                this.updateKeyboardValues();
                this.checkSolved();
                await this.persistState();
                break;
            }
        }
    }

    async setDecodingMap(map: Map<string, string>) {
        this.decodingMap = map;
        this.inverseDecodingMap = inverseMap(map);
        await this.persistState();
    }

    async reset() {
        for (const key of this.decodingMap.keys()) {
            if (!this.elementIsPartOfHint(key)) {
                this.decodingMap.delete(key);
            }
        }
        await this.setDecodingMap(new Map(this.decodingMap));
        await this.clearPersistedState();
        this.fireConfetti = false;
        this.updateKeyboardValues();
        this.setQuoteIndex(0);
        this.setActiveIcon(this.encodedQuote[0]);
        this.checkSolved();
    }

    async prepareForSolve() {
        this.setDecodingMap(new Map(this.solution));
    }

    userHasDiscoveredLetter(hint: GiveALetterHint) {
        return this.inverseDecodingMap.get(hint.letter) === this.encodingMap.get(hint.letter);
    }

    clone(): GameState {
        const cloned = new GameState(this.puzzleDate, this.puzzle);
        for (const key of Object.keys(this) as (keyof GameState)[]) {
            // @ts-ignore
            cloned[key] = this[key];
        }
        return cloned;
    }

    setEncodingMap(map: Map<string, string>) {
        this.encodingMap = map;
    }

    checkSolved() {
        this.solved = mapsAreEqual(this.solution, this.decodingMap);
        if (this.solved) {
            this.fireConfetti = true;
        }
    }

    setQuoteHeight(iconSize: number) {
        this.quoteHeight = this.quote.split("@").length * iconSize;
    }

    setActiveIcon(icon: string) {
        this.activeIcon = icon;
    }

    setKeyboardValues(rows: string[][]) {
        this.keyboardValues = rows;
    }

    setQuoteIndex(index: number) {
        this.quoteIndex = index;
    }

    reactToQuoteIconPress(index: number, iconName: string) {
        if (this.activeIcon === iconName) {
            this.activeIcon = "";
        } else {
            this.quoteIndex = index;
            this.activeIcon = iconName;
        }
    }

    encodeQuote(quote: string): string[] {
        return quote.split("").map((char, index) => {
            if (index === 0) return;
            if (char >= "a" && char <= "z") {
                return this.encodingMap.get(char)!;
            }
            return char;
        }).filter((icon) => icon !== undefined);
    }

    updateKeyboardValues() {
        this.setKeyboardValues(
            KEYBOARD_LETTERS.map((row) =>
                row.map((char) => {
                    const associated = this.inverseDecodingMap.get(char.toLowerCase());
                    return associated === undefined ? char : associated;
                })
            )
        );
    }

    getNextIconName(descending = false): string {
        const stop = descending ? 0 : this.encodedQuote.length;
        const step = descending ? -1 : 1;
        for (let i = this.quoteIndex + step; descending ? i >= stop : i < stop; i += step) {
            let icon = this.encodedQuote[i];
            if (icon.length === 1) continue;
            if (!this.decodingMap.has(icon)) {
                this.setQuoteIndex(i);
                return icon;
            }
        }
        this.setQuoteIndex(0);
        return "";
    }

    elementColor(element: string, theme: Theme): string {
        if (this.elementIsPartOfHint(element)) return theme.hint;
        if (element === this.activeIcon) return theme.selected;
        if (element.length == 1 || this.iconIsAssociatedWithLetter(element)) return theme.text;
        return theme.subtext;
    }

    reactToQuoteLetterPress(index: number, letter: string) {
        if (this.solved || this.elementIsPartOfHint(letter)) return;
        this.removeLetterMapping({ letter });
        this.setQuoteIndex(index)
    }

    elementIsPartOfHint(element: string) {
        return this.givenHintLetters.includes(element) || this.givenHintLetters.includes(this.solution.get(element)!);
    }

    iconIsAssociatedWithLetter(icon: string) {
        return this.decodingMap.get(icon) !== undefined;
    }

    letterIsAssociatedWithIcon(letter: string) {
        return this.inverseDecodingMap.get(letter) !== undefined;
    }

    reactToKeyboardPress(element: string) {
        if (
            this.solved ||
            this.elementIsPartOfHint(element) ||
            (this.activeIcon === "" && !this.letterIsAssociatedWithIcon(element))
        ) return;

        if (isACapitalLetter(element.toUpperCase())) {
            const letter = element.toLowerCase();
            if (this.letterIsAssociatedWithIcon(letter)) {
                this.removeLetterMapping({ letter });
            } else {
                this.addLetterMapping({ letter });
                this.checkSolved();
            }
        } else {
            this.removeIconMapping({ icon: element });
        }
    }

    getShareWorthyString() {
        let res = "";
        for (const char of this.quote.split("")) {
            if (char >= "A" && char <= "Z") {
                res += this.elementIsPartOfHint(char) ? "\u{1F4A1}" : "\u{26AB}";
            } else if (char === " ") {
                res += "\u3000";
            } else if (char === "@") {
                res += "\n";
            }
        }
        return res.slice(1);
    }

    private removeLetterMapping({ letter }: { letter: string }) {
        this.quoteIndex = findCharacterBackward(this.encodedQuote, this.quoteIndex, letter);
        const icon = [...this.decodingMap].find(([, v]) => v === letter)?.[0];
        if (!icon) throw Error;
        this.decodingMap.delete(icon);
        this.setDecodingMap(this.decodingMap);
        this.updateKeyboardValues();
        this.setActiveIcon(icon);
    }

    private removeIconMapping({ icon }: { icon: string }) {
        this.decodingMap.delete(icon);
        this.setDecodingMap(this.decodingMap);
        this.updateKeyboardValues();
        this.quoteIndex = this.encodedQuote.indexOf(icon);
        this.setActiveIcon(icon);
    }

    private addLetterMapping({ letter }: { letter: string }) {
        this.decodingMap.set(this.activeIcon, letter);
        this.setDecodingMap(this.decodingMap);
        this.updateKeyboardValues();
        this.setActiveIcon(this.getNextIconName());
    }
}

export default GameState;
