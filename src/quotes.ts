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
    "i'm not superstitious, but i am a little stitious. - MICHAEL SCOTT",
    "Michael Scott",
    "The Office",

  ),
  new PuzzleOfTheDay(
    "One does not simply walk into Mordor",
    "Boromir",
    "Lord of the Rings: The Fellowship of the Ring",
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
    "If I had a gun with two bullets, and I was in a room with Hitler, Bin Laden and Toby, I would shoot Toby twice",
    "Michael Scott",
    "The Office S6E25"
  ),
  new PuzzleOfTheDay(
    "If I had a nickel for every time, I'd have two nickels. Which isn't a lot, but it's weird that it happened twice",
    "Dr. Doofenshmirtz",
    "Phineas and Ferb the Movie: Across the 2nd Dimension",
  ),
  new PuzzleOfTheDay(
    "greater good? I am your wife! I'm the greatest good you are ever gonna get!",
    "Frozone's Wife",
    "The Incredibles",
  ),
  new PuzzleOfTheDay(
    "I feel the need - the need for speed!",
    "Pete Mitchell",
    "Top Gun"
  ),
  new PuzzleOfTheDay(
    "I am a nice shark, not a mindless eating machine. If I am to change this image, I must first change myself. Fish are friends, not food.",
    "Bruce",
    "Finding Nemo"
  ),
  new PuzzleOfTheDay(
    "They may take our lives, but they'll never take our freedom!",
    "William Wilberforce",
    "Braveheart"
  ),
  new PuzzleOfTheDay(
    "Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering.",
    "Yoda",
    "Episode I: The Phantom Menace"
  ),
  new PuzzleOfTheDay(
    "I don't like sand. It's coarse and rough and irritating and it gets everywhere.",
    "Anakin Skywalker",
    "Episode II: Attack of The Clones"
  ),
  new PuzzleOfTheDay(
    "A dyslexic man walks into a bra",
  ),
  new PuzzleOfTheDay(
    "It doesn't matter if you're tall or short, thin or fat, rich or poor, at the end of the day, it's night.",
  ),
  new PuzzleOfTheDay(
    "You either die a hero, or you live long enough to see yourself become the villain.",
    "Commissioner Gordon",
    "The Dark Knight",
  ),
  new PuzzleOfTheDay(
    "There's no place like home. There's no place like home. There's no place like home.",
    "Wizard of Oz",
  ),
  new PuzzleOfTheDay(
    "Life is like a box of chocolates... You never know what you're going to get.",
    "Forrest Gump",
    "Forrest Gump",
  ),
  new PuzzleOfTheDay(
    "What do boobs and model trains have in common? They're meant for kids but are primarily played with by grown men.",
  ),
  new PuzzleOfTheDay(
    "I love the smell of napalm in the morning",
    "Apocalypse Now"
  ),
  new PuzzleOfTheDay(
    "Good morning, and in case I don't see ya, good afternoon, good evening, and good night!",
    "The Truman Show"
  ),
  new PuzzleOfTheDay(
    "Hello from the other side I must've called a thousand times To tell you I'm sorry for everything that I've done But when I call, you never seem to be home",
    "Hello by Adele"
  ),
  new PuzzleOfTheDay(
    "The toothbrush was invented in West Virginia. Otherwise it would have been called the teethbrush.",
  ),
  new PuzzleOfTheDay(
    "Toby is in HR, which technically means he works for corporate, so he's really not a part of our family. Also, he's divorced, so he's really not a part of his family",
    "Michael Scott",
    "The office",
  ),
  new PuzzleOfTheDay(
    "You miss 100% of the shots you don't take",
  ),
  new PuzzleOfTheDay(
    "The quick brown fox jumps over the lazy brown dog",
  ),
  new PuzzleOfTheDay(
    "Never gonna give you up, never gonna let you down",
    "Gandalf",
    "The Hobbit",
  ),
  new PuzzleOfTheDay(
    "Not all those who wander are lost, Bilbo Baggins.",
    "Gandalf",
    "The Hobbit",
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
