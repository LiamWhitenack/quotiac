class PuzzleOfTheDay {
  quote: string;
  date: Date;
  attributedTo: string | undefined;
  source: string | undefined;

  constructor(date: Date, quote: string, attributedTo: string | undefined = undefined, source: string | undefined = undefined) {
    this.quote = quote;
    this.date = date;
    this.attributedTo = attributedTo;
    this.source = source;
  }
}

const QUOTES: PuzzleOfTheDay[] = [
  new PuzzleOfTheDay(
    new Date(2024, 8, 26),
    "You shouldn't believe everything you see on the internet.",
    undefined,
    "The internet",
  ),
  new PuzzleOfTheDay(
    new Date(2024, 8, 27),
    "Not all those who wander are lost, Bilbo Baggins.",
    "Gandalf",
    "The Hobbit",
  ),
  new PuzzleOfTheDay(
    new Date(2024, 8, 28),
    "If I had a nickel for every time, I'd have two nickels. Which isn't a lot, but it's weird that it happened twice",
    "Dr. Doofenshmirtz",
    "Phineas and Ferb the Movie: Across the 2nd Dimension",
  ),
  new PuzzleOfTheDay(
    new Date(2024, 8, 29),
    "The quick brown fox jumped over the lazy brown dog",
  ),
  new PuzzleOfTheDay(
    new Date(2024, 8, 30),
    "Why don't you make like a tree and get outta here",
    "Biff Tannen",
    "Back to The Future Part II",
  ),
  new PuzzleOfTheDay(
    new Date(2024, 9, 1),
    "There are only two things I can't stand in this world. People who are intolerant of other people's cultures. and the Dutch.",
    "Nigel Powers",
    "Austin Powers in Goldmember",
  ),
  new PuzzleOfTheDay(
    new Date(2024, 9, 2),
    "If I had a gun with two bullets, and I was in a room with Hitler, Bin Laden and Toby, I would shoot Toby twice",
    "Michael Scott",
    "The Office S6E25"
  ),
  new PuzzleOfTheDay(
    new Date(2024, 9, 3),
    "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
    "Abraham Lincoln",
    "The Gettysburg Address",
  ),
]

const todayQuote = () => {
  const daysSinceEpoch = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
  const firstCodiacDaysSinceEphoch = Math.floor(new Date(2024, 8, 26).getTime() / (1000 * 60 * 60 * 24));
  const index = daysSinceEpoch - firstCodiacDaysSinceEphoch
  console.log(index)
  return QUOTES[index]
};

const puzzle = todayQuote()

export default puzzle;