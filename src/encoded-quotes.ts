import iconNames from "./icon-names";

function pseudoRandomFloatGenerator(seed: number): () => number {
    return function () {
        seed = (seed ** 2 * 453165 + 163) % 37856;
        return seed / 37856;
    };
}

function shuffleArray<T>(array: T[]): T[] {
    const today = new Date();
    const seed =
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate();

    const random = pseudoRandomFloatGenerator(seed);

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const iconNamesToUse = shuffleArray(iconNames);

function mapUniqueLettersToNumbers(input: string): Map<string, string> {
    const uniqueLetters = new Set<string>();

    for (const char of input.toLowerCase()) {
        if (char >= "a" && char <= "z") {
            uniqueLetters.add(char);
        }
    }

    const letterMap = new Map<string, string>();
    let index = 1;

    for (const letter of uniqueLetters) {
        letterMap.set(letter, iconNamesToUse[index]);
        index++;
    }

    return letterMap;
}

export { iconNamesToUse, mapUniqueLettersToNumbers };
