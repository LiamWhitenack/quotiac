import { mapUniqueLettersToNumbers } from "@/src/encoded-quotes";
import KEYBOARD_LETTERS from "@/src/keyboard-letters";
import { mapsAreEqual } from "@/src/utils";
import { PuzzleOfTheDay } from "@/src/quotes"
import { wrapWords } from "@/sizing/wrap-words";
import sizing from "@/sizing/sizing";
import { ActivityIndicator } from "react-native";

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

class GameState {
    puzzle: PuzzleOfTheDay;
    quote: string;
    encodingMap: Map<string, string>;
    fireConfetti: boolean;
    solution: Map<string, string>;
    solved: boolean;
    decodingMap: Map<string, string>;
    inverseDecodingMap: Map<string, string>;
    activeIcon: string;
    keyboardValues: string[][];
    quoteIndex: number;
    encodedQuote: string[];

    constructor(puzzle: PuzzleOfTheDay) {
        this.puzzle = puzzle
        this.quote = wrapWords(puzzle.quote.split(" "), sizing.maxWidth / sizing.iconSize);
        this.encodingMap = mapUniqueLettersToNumbers(puzzle.quote);
        this.solution = capitalizeValues(inverseMap(this.encodingMap));
        this.fireConfetti = false;
        this.solved = false;
        this.decodingMap = new Map();
        this.inverseDecodingMap = new Map();
        this.activeIcon = "";
        this.keyboardValues = KEYBOARD_LETTERS;
        this.quoteIndex = 0;
        this.encodedQuote = this.encodeQuote(this.quote.toLowerCase());
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
        // console.log(index)
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



    updateKeyboardValues(map: Map<string, string>) {
        this.setKeyboardValues(
            KEYBOARD_LETTERS.map((row) =>
                row.map((char) => {
                    const associatedIconName = this.inverseDecodingMap.get(char);
                    return associatedIconName === undefined ? char : associatedIconName;
                })
            )
        );
    };

    getNextIconName(): string {
        for (let i = this.quoteIndex + 1; i < this.encodedQuote.length; i++) {
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

    reactToKeyPress(element: string) {
        if (this.solved) {
            return;
        }
        // if a key is selected
        if (element >= "A" && element <= "Z") {
            // add letter mapping
            if (
                // if that letter has already been used
                Array.from(this.decodingMap.values()).includes(element)
            ) {
                // remove letter mapping
                const icon = [...this.decodingMap].find(
                    ([k, v]) => v === element
                )?.[0];
                if (icon === undefined) {
                    throw Error;
                }
                this.decodingMap.delete(icon);
                this.setDecodingMap(this.decodingMap);
                this.updateKeyboardValues(this.decodingMap);
                this.setActiveIcon(icon);
            } else if (this.activeIcon !== "") {
                // remove letter mapping
                this.decodingMap.set(this.activeIcon, element);
                this.setDecodingMap(this.decodingMap);
                this.updateKeyboardValues(this.decodingMap);
                this.setActiveIcon(this.getNextIconName());
            }
        } else {
            // remove letter mapping
            this.decodingMap.delete(element);
            this.setDecodingMap(this.decodingMap);
            this.updateKeyboardValues(this.decodingMap);
            this.quoteIndex = this.encodedQuote.indexOf(element);
            this.setActiveIcon(element);
        }

        this.checkSolved();
    }

    reactToResetButton() {
        this.setDecodingMap(new Map());
        this.updateKeyboardValues(new Map());
        this.setQuoteIndex(0);
        this.setActiveIcon(this.encodedQuote.at(0));
        this.checkSolved();
    }
}

export default GameState;
