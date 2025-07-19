import KEYBOARD_LETTERS from "@/src/keyboard/keyboard-letters";
import { mapsAreEqual } from "@/src/utils";
import { wrapWords } from "@/src/sizing/wrap-words";
import sizing from "@/src/sizing/sizing";
import GiveALetterHint from "@/src/puzzles/hints/letter";
import type { Theme } from "@/src/theme/themes";
import CryptographBase from "@/src/puzzles/base";

function inverseMap(map: Map<string, string>): Map<string, string> {
    const inverseDecodingMap = new Map<string, string>();
    map.forEach((value, key) => {
        inverseDecodingMap.set(value, key);
    });
    return inverseDecodingMap;
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

    constructor(puzzle: CryptographBase) {
        this.puzzle = puzzle
        this.quote = wrapWords(puzzle.stringToEncrypt.split(" "), (sizing.maxWidth * 0.9) / sizing.iconSize);
        this.quoteHeight = this.quote.split("@").length * sizing.iconSize - sizing.iconSize;
        this.encodingMap = puzzle.encodingMap
        this.solution = inverseMap(this.encodingMap);
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

    decreaseQuoteIconSize() {
        sizing.iconSize -= 1;
        this.quote = wrapWords(this.puzzle.stringToEncrypt.split(" "), (sizing.maxWidth * 0.9) / sizing.iconSize);
        this.setQuoteHeight(sizing.iconSize)
        this.encodedQuote = this.encodeQuote(this.quote);
    }

    userHasDiscoveredLetter(hint: GiveALetterHint) {
        return this.inverseDecodingMap.get(hint.letter) === this.encodingMap.get(hint.letter);
    }

    giveAHint() {
        for (const [, hint] of this.puzzle.hints.entries()) {
            if (hint instanceof GiveALetterHint && !this.userHasDiscoveredLetter(hint)) {
                this.givenHintLetters.push(hint.letter)
                let updatedDecodingMap = new Map(this.decodingMap)
                updatedDecodingMap.delete(this.inverseDecodingMap.get(hint.letter)!)
                updatedDecodingMap.set(this.encodingMap.get(hint.letter)!, hint.letter)
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

    setQuoteHeight(iconSize: number) {
        this.quoteHeight = this.quote.split("@").length * iconSize;
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
            char = char
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
                    const associatedIconName = this.inverseDecodingMap.get(char.toLowerCase());
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
            return theme.hint
        } else if (element === this.activeIcon) {
            return theme.selectedLetter
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

    letterIsAssociatedWithIcon(letter: string) {
        return this.inverseDecodingMap.get(letter) !== undefined
    }


    reactToKeyboardPress(element: string) {
        if (this.solved || this.elementIsPartOfHint(element) || (this.activeIcon === "" && !this.letterIsAssociatedWithIcon(element))) {
            return;
        }

        if (isACapitalLetter(element.toUpperCase())) {
            const letter = element.toLowerCase()
            // the letter is associated with an icon iff the user is using a keyboard
            if (this.letterIsAssociatedWithIcon(letter)) {
                this.removeLetterMapping({ letter: letter })
            } else {
                this.addLetterMapping({ letter: letter })
                this.checkSolved();
            }

        } else {
            this.removeIconMapping({ icon: element })
        }

    }

    getShareWorthyString() {
        let res = ""
        for (const character of this.quote.split("")) {
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
            ([, v]) => v === letter
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
        for (const key of this.decodingMap.keys()) {
            if (!this.elementIsPartOfHint(key)) {
                this.decodingMap.delete(key)
            }
        }
        this.setDecodingMap(new Map(this.decodingMap))
        this.fireConfetti = false;
        this.updateKeyboardValues();
        this.setQuoteIndex(0);
        this.setActiveIcon(this.encodedQuote[0]);
        this.checkSolved();
    }
}

export default GameState;
