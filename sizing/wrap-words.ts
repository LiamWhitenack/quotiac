function wrapWords(words: string[], maxWidth: number): string {
    let res: string = "";
    let currentLine: string[] = [];
    for (const word of words) {
        const widthOfSpaces = currentLine.length;
        const lineLength =
            currentLine.reduce((sum, str) => sum + str.length, 0) + widthOfSpaces;
        if (currentLine.length === 0) { currentLine = [word]; } else if (lineLength + word.length <= maxWidth) {
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