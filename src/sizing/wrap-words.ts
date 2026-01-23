function wrapWords(
    words: string[],
    maxWidth: number,
    ignoreNonAlphabetic: boolean = false
): string {
    let res = "";
    let currentLine: string[] = [];
    let inBullet = false;
    let bulletBuffer: string[] = [];
    let bulletPrefix = "* ";

    const getLength = (word: string): number => {
        if (!ignoreNonAlphabetic) return word.length;
        return word.replace(/[^a-zA-Z]/g, "").length;
    };

    const flushLine = (prefix = "") => {
        if (currentLine.length > 0) {
            res += "@" + prefix + currentLine.join(" ");
            currentLine = [];
        }
    };

    const padToWidth = (prefix: string, line: string[], maxWidth: number): string => {
        const textLength = prefix.length + line.join(" ").length;
        const padding = Math.max(0, maxWidth - textLength);
        return prefix + line.join(" ") + " ".repeat(padding);
    };

    const flushBullet = () => {
        if (bulletBuffer.length === 0) return;
        let line: string[] = [];
        let lineLength = bulletPrefix.length;

        for (const word of bulletBuffer) {
            const wordLen = getLength(word) + (line.length > 0 ? 1 : 0);
            if (lineLength + wordLen <= maxWidth) {
                line.push(word);
                lineLength += wordLen;
            } else {
                // flush current line, padded
                res += "@" + padToWidth(bulletPrefix, line, maxWidth);
                // switch to indent prefix for continuation lines
                bulletPrefix = "  ";
                // start new line
                line = [word];
                lineLength = bulletPrefix.length + getLength(word);
            }
        }

        if (line.length > 0) {
            res += "@" + padToWidth(bulletPrefix, line, maxWidth);
        }

        bulletBuffer = [];
        bulletPrefix = "* ";
    };

    for (const word of words) {
        if (word.startsWith("^") && word.endsWith("^")) {
            // handle ^singleword^ case
            flushLine();
            bulletBuffer = [word.slice(1, -1)];
            flushBullet();
        } else if (word.startsWith("^")) {
            flushLine();
            inBullet = true;
            bulletBuffer = [word.slice(1)];
        } else if (word.endsWith("^")) {
            bulletBuffer.push(word.slice(0, -1));
            flushBullet();
            inBullet = false;
        } else if (inBullet) {
            bulletBuffer.push(word);
        } else {
            const widthOfSpaces = currentLine.length;
            const lineLength =
                currentLine.reduce((sum, str) => sum + getLength(str), 0) +
                widthOfSpaces;
            if (currentLine.length === 0) {
                currentLine = [word];
            } else if (lineLength + getLength(word) <= maxWidth) {
                currentLine.push(word);
            } else {
                flushLine();
                currentLine = [word];
            }
        }
    }

    // Flush remaining content
    if (inBullet && bulletBuffer.length > 0) flushBullet();
    else if (currentLine.length > 0) flushLine();

    return res;
}


function splitByLine(chars: string[]): string[][] {
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

export { wrapWords, splitByLine };