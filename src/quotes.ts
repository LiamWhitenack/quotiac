class PuzzleOfTheDay {
  quote: string;
  attributedTo: string | undefined;
  source: string | undefined;

  constructor(quote: string, attributedTo: string | undefined = undefined, source: string | undefined = undefined) {
    this.quote = quote;
    this.attributedTo = attributedTo;
    this.source = source;
  }
}

const QUOTES: PuzzleOfTheDay[] = [
  new PuzzleOfTheDay(
    "I'm not superstitious, but I am a little stitious.",
    "Michael Scott",
    "The Office",
  ),
  new PuzzleOfTheDay(
    "Toby is in HR, which technically means he works for corporate, so he's really not a part of our family. Also, he's divorced, so he's really not a part of his family",
    "Michael Scott",
    "The office",
  ),
  new PuzzleOfTheDay(
    "One does not simply walk into Mordor",
    "Boromir",
    "Lord of the Rings: The Fellowship of the Ring",
  ),
  new PuzzleOfTheDay(
    "If I had a nickel for every time, I'd have two nickels. Which isn't a lot, but it's weird that it happened twice",
    "Dr. Doofenshmirtz",
    "Phineas and Ferb the Movie: Across the 2nd Dimension",
  ),
  new PuzzleOfTheDay(
    "Hello, my name is Inigo Montoya. You killed my father. Prepare to die.",
    "Inigo Montoya",
    "The Princess Bride",
  ),
  new PuzzleOfTheDay(
    "Ez TO GUESS",
    "Liam",
    "Testing",
  ),
  new PuzzleOfTheDay(
    "Not all those who wander are lost, Bilbo Baggins.",
    "Gandalf",
    "The Hobbit",
  ),
  new PuzzleOfTheDay(
    "The quick brown fox jumped over the lazy brown dog",
  ),
  new PuzzleOfTheDay(
    "Why don't you make like a tree and get outta here",
    "Biff Tannen",
    "Back to The Future Part II",
  ),
  new PuzzleOfTheDay(
    "There are only two things I can't stand in this world. People who are intolerant of other people's cultures. and the Dutch.",
    "Nigel Powers",
    "Austin Powers in Goldmember",
  ),
  new PuzzleOfTheDay(
    "If I had a gun with two bullets, and I was in a room with Hitler, Bin Laden and Toby, I would shoot Toby twice",
    "Michael Scott",
    "The Office S6E25"
  ),
  new PuzzleOfTheDay(
    "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
    "Abraham Lincoln",
    "The Gettysburg Address",
  ),
  new PuzzleOfTheDay(
    "You shouldn't believe everything you see on the internet.",
    undefined,
    "The internet",
  ),
]

const todayQuote = () => {
  const daysSinceEpoch = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
  const firstCodiacDaysSinceEphoch = Math.floor(new Date(2025, 4, 31).getTime() / (1000 * 60 * 60 * 24));
  const index = daysSinceEpoch - firstCodiacDaysSinceEphoch
  return QUOTES[index]
};

const puzzle = todayQuote()

export { puzzle, PuzzleOfTheDay };
