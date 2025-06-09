import { mapUniqueLettersToNumbers } from "@/src/encoded-quotes";
import KEYBOARD_LETTERS from "@/src/keyboard-letters";
import { mapsAreEqual } from "@/src/utils";
import { PuzzleOfTheDay } from "@/puzzles/puzzles"
import { wrapWords } from "@/sizing/wrap-words";
import sizing from "@/sizing/sizing";
import GiveALetterHint from "@/puzzles/hints/letter";

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
function mergeMaps(map1: Map<string, string>, map2: Map<string, string>) {
    return new Map([...map2, ...map1]);
}
function isACapitalLetter(x: string) {
    return (x.length === 1 && x >= "A" && x <= "Z")
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
        this.activeIcon = "";
        this.keyboardValues = KEYBOARD_LETTERS;
        this.quoteIndex = 0;
        this.encodedQuote = this.encodeQuote(this.quote.toLowerCase());
        this.showAppTitle = true
    }

    userHasDiscoveredLetter(hint: GiveALetterHint) {
        // console.log("USER DISCOVERED")
        // console.log(hint.letter)
        // console.log(this.inverseDecodingMap)
        // console.log(this.encodingMap)
        // console.log(this.inverseDecodingMap.get(hint.letter))
        // console.log(this.encodingMap.get(hint.letter.toLowerCase()))
        // console.log(this.inverseDecodingMap.get(hint.letter) === this.encodingMap.get(hint.letter.toLowerCase()))
        return this.inverseDecodingMap.get(hint.letter) === this.encodingMap.get(hint.letter.toLowerCase());
    }

    giveAHint() {
        for (const [i, hint] of this.puzzle.hints.entries()) {
            if (hint instanceof GiveALetterHint && !this.userHasDiscoveredLetter(hint)) {
                console.log(hint instanceof GiveALetterHint)
                console.log(this.userHasDiscoveredLetter(hint))
                this.givenHintLetters.push(hint.letter)
                let updatedDecodingMap = new Map(this.decodingMap)
                updatedDecodingMap.set(this.encodingMap.get(hint.letter.toLowerCase())!, hint.letter)
                this.setDecodingMap(updatedDecodingMap)
                this.updateKeyboardValues()
                this.puzzle.hints.splice(i, 1)
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

    reactToQuoteLetterPress(letter: string) {
        console.log(this.givenHintLetters)
        if (this.solved || this.givenHintLetters.includes(letter)) {
            return
        }
        this.removeLetterMapping({ letter: letter });
    }


    reactToKeyPress(element: string) {
        if (this.solved || this.activeIcon === "") {
            return;
        }

        console.log(element)
        console.log(this.inverseDecodingMap)
        if (isACapitalLetter(element)) {
            if (this.givenHintLetters.includes(element)) {
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
            if (!this.givenHintLetters.includes(this.solution.get(element)!)) {
                this.removeIconMapping({ icon: element })
            }

        }

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
        this.setDecodingMap(new Map());
        this.updateKeyboardValues();
        this.setQuoteIndex(0);
        this.setActiveIcon(this.encodedQuote[0]);
        this.checkSolved();
    }
}

export default GameState;
