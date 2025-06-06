import { mapUniqueLettersToNumbers } from "@/src/encoded-quotes";
import KEYBOARD_LETTERS from "@/src/keyboard-letters";
import { mapsAreEqual } from "@/src/utils";
import { PuzzleOfTheDay } from "@/src/quotes"

function inverseMap(map: Map<string, string>): Map<string, string> {
    const inverseDecodingMap = new Map<string, string>();
    map.forEach((value, key) => {
        inverseDecodingMap.set(value, key);
    });
    return inverseDecodingMap;
}

class GameState {
    puzzle: PuzzleOfTheDay;
    quote: string[];
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
        this.quote = puzzle.quote.split("")
        this.encodingMap = mapUniqueLettersToNumbers(puzzle.quote);
        this.solution = inverseMap(this.encodingMap)
        this.fireConfetti = false;
        this.solved = false;
        this.decodingMap = new Map();
        this.inverseDecodingMap = new Map();
        this.activeIcon = "";
        this.keyboardValues = KEYBOARD_LETTERS;
        this.quoteIndex = 0;
        this.encodedQuote = this.encodeQuote(puzzle.quote.toLowerCase());
    }

    clone(): GameState {
        const cloned = new GameState(this.puzzle); // Use existing constructor

        for (const key of Object.keys(this) as (keyof GameState)[]) {
            const value = this[key];

            cloned[key] = value
        }

        return cloned;
    }

    setEncodingMap(map: Map<string, string>) {
        this.encodingMap = map;
    }

    setFireConfetti(val: boolean) {

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
            this.setActiveIcon("");
        } else {
            this.setQuoteIndex(index);
            this.setActiveIcon(iconName);
        }
    }

    encodeQuote(input: string): string[] {
        return input
            .split("")
            .map((char) => {
                if (char === " ") {
                    return char;
                } else if (char >= "a" && char <= "z") {
                    return this.encodingMap.get(char);
                }
                return undefined;
            })
            .filter((icon) => icon !== undefined);
    };

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
        for (let i = 0; i < this.encodedQuote.length; i++) {
            let iconName = this.encodedQuote[i];
            if (
                i <= this.quoteIndex ||
                iconName === " " ||
                iconName === this.activeIcon
            ) {
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
        // if no key is selected
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
                this.setQuoteIndex(this.encodedQuote.indexOf(icon));
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
            this.setActiveIcon(element);
            this.setQuoteIndex(this.encodedQuote.indexOf(element));
        }

        this.checkSolved();
    }

    reactToRestButton() {
        this.setDecodingMap(new Map());
        this.updateKeyboardValues(new Map());
        this.checkSolved();
        this.setFireConfetti(false); // reset confetti
    }
}

export default GameState;
