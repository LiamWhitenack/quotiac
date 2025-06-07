import { PUZZLES } from "./quotes";

const todayQuote = () => {
    const daysSinceEpoch = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
    const firstCodiacDaysSinceEphoch = Math.floor(new Date(2025, 4, 31).getTime() / (1000 * 60 * 60 * 24));
    const index = daysSinceEpoch - firstCodiacDaysSinceEphoch
    return PUZZLES[index]
};

const randomQuote = () => {
    return PUZZLES[Math.floor(Math.random() * PUZZLES.length)]
};

export { todayQuote, randomQuote };