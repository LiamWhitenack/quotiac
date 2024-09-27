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
    "Awake, O north wind; and come, thou south; blow upon my garden, that the spices thereof may flow out.",
    "Michael Scott",
    "The Office",
  ),
  new PuzzleOfTheDay(
    "Guilty Guilty Guilty",
    "Michael Scott",
    "The Office",
  ),
  new PuzzleOfTheDay(
    "This is the skin of a killer, Bella",
    "Michael Scott",
    "The Office",
  ),
  new PuzzleOfTheDay(
    "bella, where the hell have you been loca?",
    "Michael Scott",
    "The Office",
  ),
  new PuzzleOfTheDay(
    "When youre feeling weary you are not alone",
    "Michael Scott",
    "The Office",
  ),
  new PuzzleOfTheDay(
    "I'm not superstitious, but I am a little stitious.",
    "Michael Scott",
    "The Office",
  ),
  new PuzzleOfTheDay(
    "Toby is in HR, which technically means he works for corporate, so he's really not a part of our family. Also, he's divorced, so he's really not a part of his family",
    "",
    "Lord of the Rings: The Fellowship of the Ring",
  ),
  new PuzzleOfTheDay(
    "One does not simply walk into Mordor",
    "",
    "Lord of the Rings: The Fellowship of the Ring",
  ),
  new PuzzleOfTheDay(
    "If I had a nickel for every time, I'd have two nickels. Which isn't a lot, but it's weird that it happened twice",
    "Dr. Doofenshmirtz",
    "Phineas and Ferb the Movie: Across the 2nd Dimension",
  ),
  new PuzzleOfTheDay(
    "Well I think my outfit is pretty gorg.  Raquelle, did you mean gorgelicious, or gorgetastic?  No, Barbie. I meant gorg!",
    "MAIRE PUT YOUR speaker HERE",
    " ",
  ),
  new PuzzleOfTheDay(
    "A surprise to be sure, but a welcome one.",
    "Chancellor Palpetine",
    "Star Wars Episode 1: The Phantom Menace",
  ),
  new PuzzleOfTheDay(
    "Not all those who wander are lost, Bilbo Baggins.",
    "Gandalf",
    "The Hobbit",
  ),
  new PuzzleOfTheDay(
    "Hello, my name is Inigo Montoya. You killed my father. Prepare to die.",
    "Inigo Montoya",
    "The Princess Bride",
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
  const firstCodiacDaysSinceEphoch = Math.floor(new Date(2024, 8, 27).getTime() / (1000 * 60 * 60 * 24));
  const index = daysSinceEpoch - firstCodiacDaysSinceEphoch
  return QUOTES[index]
};

const puzzle = todayQuote()

export default puzzle;