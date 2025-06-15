import { mapUniqueLettersToNumbers } from "@/src/encoded-quotes";
import KEYBOARD_LETTERS from "@/src/keyboard-letters";
import { mapsAreEqual } from "@/src/utils";
import { PuzzleOfTheDay } from "@/puzzles/puzzles"
import { wrapWords } from "@/sizing/wrap-words";
import sizing from "@/sizing/sizing";
import GiveALetterHint from "@/puzzles/hints/letter";
import type { Theme } from "@/theme/themes";
import { randomQuote, todayQuote } from "@/puzzles/get-puzzle";

function inverseMap(map: Map<string, string>): Map<string, string> {
    const inverseDecodingMap = new Map<string, string>();
    map.forEach((value, key) => {
        inverseDecodingMap.set(value, key);
    });
    return inverseDecodingMap;
}
function capitalizeValues(map: Map<string, string>): Map<string, string> {
    const res = new Map<string, string>();
    map.forEach((value, key) => {
        res.set(key, value.toUpperCase());
    });
    return res;
}
function isACapitalLetter(x: string) {
    return (x.length === 1 && x >= "A" && x <= "Z")
}
function findCharacterBackward(
    charList: string[],
    startingIndex: number,
    searchForCharacter: string
): number {
    for (let i = startingIndex; i >= 0; i--) {
        if (charList[i] === searchForCharacter) {
            return i;
        }
    }
    return -1; // Not found
}


class GameState {
    puzzle: PuzzleOfTheDay;
    quote: string;
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

    constructor(puzzle: PuzzleOfTheDay) {
        this.puzzle = puzzle
        this.quote = wrapWords(puzzle.stringToEncrypt.split(" "), sizing.maxWidth / sizing.iconSize);
        this.encodingMap = mapUniqueLettersToNumbers(puzzle.stringToEncrypt);
        this.solution = capitalizeValues(inverseMap(this.encodingMap));
        this.fireConfetti = false;
        this.solved = false;
        this.decodingMap = new Map();
        this.inverseDecodingMap = new Map();
        this.givenHintLetters = [];
        this.keyboardValues = KEYBOARD_LETTERS;
        this.encodedQuote = this.encodeQuote(this.quote.toLowerCase());
        this.activeIcon = this.encodedQuote[0];
        this.quoteIndex = 0;
        this.showAppTitle = true;
    }

    userHasDiscoveredLetter(hint: GiveALetterHint) {
        return this.inverseDecodingMap.get(hint.letter) === this.encodingMap.get(hint.letter.toLowerCase());
    }

    giveAHint() {
        for (const [i, hint] of this.puzzle.hints.entries()) {
            if (hint instanceof GiveALetterHint && !this.userHasDiscoveredLetter(hint)) {
                this.givenHintLetters.push(hint.letter)
                let updatedDecodingMap = new Map(this.decodingMap)
                updatedDecodingMap.delete(this.inverseDecodingMap.get(hint.letter)!)
                updatedDecodingMap.set(this.encodingMap.get(hint.letter.toLowerCase())!, hint.letter)
                this.setDecodingMap(updatedDecodingMap)
                this.updateKeyboardValues()
                this.checkSolved()
                break
            }
        }

    }

    clone(): GameState {
        const cloned = new GameState(this.puzzle); // Use existing constructor

        for (const key of Object.keys(this) as (keyof GameState)[]) {
            const value = this[key];

            // @ts-ignore
            cloned[key] = value
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

    setDecodingMap(map: Map<string, string>) {
        this.decodingMap = map;
        this.inverseDecodingMap = inverseMap(map);
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
            if (index === 0) {
                return;
            }
            char = char.toLowerCase()
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
                    const associatedIconName = this.inverseDecodingMap.get(char);
                    return associatedIconName === undefined ? char : associatedIconName;
                })
            )
        );
    };

    getNextIconName(descending: boolean = false): string {
        const stop = descending ? 0 : this.encodedQuote.length
        const step = descending ? -1 : 1;
        for (let i = this.quoteIndex + step; descending ? i >= stop : i < stop; i += step) {
            let iconName = this.encodedQuote[i];
            if (iconName.length === 1) {
                continue;
            }
            const char = this.decodingMap.get(iconName);
            if (char === undefined) {
                this.setQuoteIndex(i);
                return iconName;
            }
        }
        this.setQuoteIndex(0);
        return "";
    }

    elementColor(element: string, theme: Theme): string {
        if (this.elementIsPartOfHint(element)) {
            return theme.secondary
        } else if (element === this.activeIcon) {
            return theme.primary
        } else {
            return theme.text
        }
    }

    reactToQuoteLetterPress(letter: string) {
        if (this.solved || this.elementIsPartOfHint(letter)) {
            return
        }
        this.removeLetterMapping({ letter: letter });
    }

    elementIsPartOfHint(element: string) {
        return this.givenHintLetters.includes(element) || this.givenHintLetters.includes(this.solution.get(element)!)
    }


    reactToKeyboardPress(element: string) {
        if (this.solved || this.activeIcon === "") {
            return;
        }

        if (isACapitalLetter(element)) {
            if (this.elementIsPartOfHint(element)) {
                return;
            }
            if (this.inverseDecodingMap.get(element) === undefined) {
                this.addLetterMapping({ letter: element })
                this.checkSolved();
            }
            else {
                this.removeLetterMapping({ letter: element })
            }
        } else {
            if (!this.elementIsPartOfHint(element)) {
                this.removeIconMapping({ icon: element })
            }

        }

    }

    getShareWorthyString() {
        let res = ""
        for (const character of this.quote.toUpperCase().split("")) {
            if (character >= "A" && character <= "Z") {
                if (this.elementIsPartOfHint(character)) {
                    res += "\u{1F4A1}";
                } else {
                    res += "\u{26AB}";
                };
            } else if (character === " ") {
                res += "\u3000"; // emoji-sized space
            } else if (character === "@") {
                res += "\n"
            }
        }
        return res.slice(1)
    }

    private removeLetterMapping({ letter }: { letter: string }) {
        const icon = [...this.decodingMap].find(
            ([k, v]) => v === letter
        )?.[0];
        if (icon === undefined) {
            throw Error;
        }
        this.decodingMap.delete(icon);
        this.setDecodingMap(this.decodingMap);
        this.updateKeyboardValues();
        this.setActiveIcon(icon);
        this.quoteIndex = findCharacterBackward(this.encodedQuote, this.quoteIndex, letter)
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

    reactToResetButton() {
        this.puzzle = randomQuote()
        this.quote = wrapWords(this.puzzle.stringToEncrypt.split(" "), sizing.maxWidth / sizing.iconSize);
        this.encodingMap = mapUniqueLettersToNumbers(this.puzzle.stringToEncrypt);
        this.solution = capitalizeValues(inverseMap(this.encodingMap));
        this.fireConfetti = false;
        this.solved = false;
        this.decodingMap = new Map();
        this.inverseDecodingMap = new Map();
        this.givenHintLetters = [];
        this.activeIcon = "";
        this.keyboardValues = KEYBOARD_LETTERS;
        this.quoteIndex = 0;
        this.encodedQuote = this.encodeQuote(this.quote.toLowerCase());
        this.showAppTitle = true;
        this.setDecodingMap(new Map());
        this.updateKeyboardValues();
        this.setQuoteIndex(0);
        this.setActiveIcon(this.encodedQuote[0]);
        this.checkSolved();
    }
}

export default GameState;
