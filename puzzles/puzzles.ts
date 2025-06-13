import CryptographBase from "./puzzle-types/base";
import { CharacterQuote, DirectQuote, FamousDocumentQuote, GeneralPhrase, SongLyrics } from "./puzzle-types/quote";


const PUZZLES: CryptographBase[] = [

  new GeneralPhrase(
    "What do boobs and model trains have in common? They're meant for kids but are primarily played with by grown men.",
  ),
  new CharacterQuote(
    "One does not simply walk into Mordor",
    "Film",
    "Boromir",
    "Lord of the Rings: The Fellowship of the Ring (Film)",
    2001
  ),

  // new CryptographBase( // Taking this one out for now because Steve Carrell wasn't the first or the second person who famously used this quote
  //   "If I had a gun with two bullets, and I was in a room with Hitler, Bin Laden and Toby, I would shoot Toby twice",
  //   "Michael Scott",
  //   "The Office"
  //   new Date(2007, 8, 27),
  // ),

  new CharacterQuote(
    "greater good? I am your wife! I'm the greatest good you are ever gonna get!",
    "Film",
    "Frozone's Wife",
    "The Incredibles",
    2004,
  ),
  new CharacterQuote(
    "I feel the need - the need for speed!",
    "Film",
    "Pete Mitchell",
    "Top Gun",
    1986,
  ),
  new CharacterQuote(
    "They may take our lives, but they'll never take our freedom!",
    "Film",
    "William Wilberforce",
    "Braveheart",
    1995
  ),
  new CharacterQuote(
    "Why don't you make like a tree and get outta here",
    "Film",
    "Biff Tannen",
    "Back to The Future Part II",
    1989,
  ),
  new CharacterQuote(
    "I love the smell of napalm in the morning",
    "Film",
    "Colonel Bill Kilgore",
    "Apocalypse Now",
    1979
  ),
  new CharacterQuote(
    "I am a nice shark, not a mindless eating machine. If I am to change this image, I must first change myself. Fish are friends, not food.",
    "Film",
    "Bruce",
    "Finding Nemo",
    2003,
  ),
  new CharacterQuote(
    "Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering.",
    "Film",
    "Yoda",
    "Episode I: The Phantom Menace",
    1999
  ),
  new CharacterQuote(
    "I don't like sand. It's coarse and rough and irritating and it gets everywhere.",
    "Film",
    "Anakin Skywalker",
    "Episode II: Attack of The Clones",
    2002,
  ),
  new CharacterQuote(
    "Hello, my name is Inigo Montoya. You killed my father. Prepare to die.",
    "Film",
    "Inigo Montoya",
    "The Princess Bride",
    1987
  ),
  new CharacterQuote(
    "Remember, Red, hope is a good thing, maybe the best of things, and no good thing ever dies.",
    "Film",
    "Andy Dufresne",
    "The Shawshank Redemption",
    1994
  ),
  new CharacterQuote(
    "I'm not superstitious, but I am a little stitious.",
    "Sitcom",
    "Michael Scott",
    "The Office",
    2007
  ),
  new CharacterQuote(
    "If I had a nickel for every time, I'd have two nickels. Which isn't a lot, but it's weird that it happened twice",
    "Film",
    "Dr. Doofenshmirtz",
    "Phineas and Ferb the Movie: Across the 2nd Dimension",
    2011
  ),
  new CharacterQuote(
    "There is no Easter Bunny, There is no Tooth Fairy, and there is no queen of England.",
    "File",
    "Tighten",
    "Megamind",
    2010
  ),
  new GeneralPhrase(
    "A dyslexic man walks into a bra",
  ),
  new CharacterQuote(
    "Life is like a box of chocolates... You never know what you're going to get.",
    "Film",
    "Forrest Gump",
    "Forrest Gump",
    1994,
  ),
  new GeneralPhrase(
    "It doesn't matter if you're tall or short, thin or fat, rich or poor, at the end of the day, it's night.",
  ),
  new CharacterQuote(
    "You either die a hero, or you live long enough to see yourself become the villain.",
    "Film",
    "Commissioner Gordon",
    "The Dark Knight",
    2008,
  ),
  new CharacterQuote(
    "There's no place like home. There's no place like home. There's no place like home.",
    "Film",
    "Dorothy Gale",
    "Wizard of Oz",
    1939,
  ),
  new CharacterQuote(
    "You want forgiveness? Get religion.",
    "Film",
    "Eddie Brock",
    "SPIDER-MAN 3",
    2007
  ),

  new CharacterQuote(
    "Good morning, and in case I don't see ya, good afternoon, good evening, and good night!",
    "Film",
    "Truman Burbank",
    "The Truman Show",
    1198,
  ),
  new SongLyrics(
    "Hello from the other side I must've called a thousand times To tell you I'm sorry for everything that I've done But when I call, you never seem to be home",
    "Adele",
    "Hello",
    2015
  ),
  new GeneralPhrase(
    "The toothbrush was invented in West Virginia. Otherwise it would have been called the teethbrush.",
  ),
  new CharacterQuote(
    "Toby is in HR, which technically means he works for corporate, so he's really not a part of our family. Also, he's divorced, so he's really not a part of his family",
    "Sitcom",
    "Michael Scott",
    "The Office",
    2005,
  ),
  new DirectQuote(
    "You miss 100% of the shots you don't take",
    "Wayne Gretzky",
    1990,
  ),
  new GeneralPhrase(
    "The quick brown fox jumps over the lazy brown dog",
  ),
  new SongLyrics(
    "Never gonna give you up, never gonna let you down",
    "Rick Astley",
    "Never Gonna Give You Up",
    1987,
  ),
  new CharacterQuote(
    "Not all those who wander are lost, Bilbo Baggins.",
    "Novel",
    "Gandalf",
    "The Hobbit",
    1937,
  ),

  new CharacterQuote(
    "There are only two things I can't stand in this world. People who are intolerant of other people's cultures. and the Dutch.",
    "Film",
    "Nigel Powers",
    "Austin Powers in Goldmember",
    2002
  ),
  new FamousDocumentQuote(
    "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
    "Abraham Lincoln",
    "The Gettysburg Address",
    1863,
  ),
  new DirectQuote(
    "You shouldn't believe everything you see on the internet.",
    "Abraham Lincoln"
  ),
]

export { PUZZLES, CryptographBase as PuzzleOfTheDay };
