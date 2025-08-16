function wrapWords(words: string[], maxWidth: number, ignoreNonAlphabetic: boolean = false): string {
    let res: string = "";
    let currentLine: string[] = [];

    const getLength = (word: string): number => {
        if (!ignoreNonAlphabetic) return word.length;
        return word.replace(/[^a-zA-Z]/g, "").length;
    };

    for (const word of words) {
        const widthOfSpaces = currentLine.length;
        const lineLength =
            currentLine.reduce((sum, str) => sum + getLength(str), 0) + widthOfSpaces;
        if (currentLine.length === 0) {
            currentLine = [word];
        } else if (lineLength + getLength(word) <= maxWidth) {
            currentLine.push(word);
        } else {
            res += "@" + currentLine.join(" ");
            currentLine = [word];
        }
    }
    return res + "@" + currentLine.join(" ");
}

function splitOnPercent(chars: string[]): string[][] {
    const lines: string[][] = [];
    let currentLine: string[] = [];

    chars.forEach((char) => {
        if (char === "@") {
            lines.push(currentLine);
            currentLine = [];
        } else {
            currentLine.push(char);
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines
}

export { wrapWords, splitOnPercent };