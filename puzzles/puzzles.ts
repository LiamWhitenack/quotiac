import CryptographBase from "./puzzle-types/base";
import { CharacterQuote, DirectQuote, FamousDocumentQuote, GeneralPhrase, SongLyrics } from "./puzzle-types/quote";


const PUZZLES: CryptographBase[] = [

  // new GeneralPhrase(
  //   "What do boobs and model trains have in common? They're meant for kids but are primarily played with by grown men.",
  // ),
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
    "If I had a nickel for every time, I'd have two nickels. Which isn't a lot, but it's weird that it happened twice",
    "Film",
    "Dr. Doofenshmirtz",
    "Phineas and Ferb the Movie: Across the 2nd Dimension",
    2011
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
    "There is no Easter Bunny, There is no Tooth Fairy, and there is no queen of England.",
    "Film",
    "Tighten",
    "Megamind",
    2010
  ),
  new CharacterQuote(
    "Life is like a box of chocolates... You never know what you're gonna get.",
    "Film",
    "Forrest Gump",
    "Forrest Gump",
    1994,
  ),
  new CharacterQuote(
    "This isn't flying, this is falling with style!",
    "Film",
    "Buzz Lightyear",
    "Toy Story",
    1995,
  ),
  new SongLyrics(
    "Never gonna give you up, never gonna let you down",
    "Rick Astley",
    "Never Gonna Give You Up",
    1987,
  ),
  new GeneralPhrase(
    "A dyslexic man walks into a bra",
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
    "They may take our lives, but they'll never take our freedom!",
    "Film",
    "William Wilberforce",
    "Braveheart",
    1995
  ),
  new DirectQuote(
    "You miss 100% of the shots you don't take",
    "Wayne Gretzky",
    1990,
  ),
  new GeneralPhrase(
    "The quick brown fox jumps over the lazy brown dog",
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
    1998,
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
  new DirectQuote("I am the state.", "Louiz XIV"),
  new CharacterQuote(
    "Toby is in HR, which technically means he works for corporate, so he's really not a part of our family. Also, he's divorced, so he's really not a part of his family either.",
    "Sitcom",
    "Michael Scott",
    "The Office",
    2005,
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
  new CharacterQuote(
    "I'm not superstitious, but I am a little stitious.",
    "Sitcom",
    "Michael Scott",
    "The Office",
    2007
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
  new DirectQuote("Give a man a fish and you feed him for a day. Teach a man to fish and you feed him for a lifetime.", "Lao Tzu"),
  new DirectQuote("Put your shoulder to the wheel.", "Aesop"),
  new DirectQuote("Oh farmers, pray that your summers be wet and your winters clear.", "Virgil"),
  new DirectQuote("Hath not the potter power over the clay, to make one vessel unto honor, and another unto dishonor?", "The Bible, Romans"),
  new DirectQuote("If you chase two rabbits, you will lose them both.", "Native American Saying"),
  new DirectQuote("Nature herself has imprinted on the minds of all the idea of God.", "Cicero"),
  new GeneralPhrase("You can't direct the wind, but you can adjust your sails."),
  new DirectQuote("The man who moves a mountain begins by carrying away small stones.", "Confucius"),
  new DirectQuote("Blessed shall be the fruit of thy cattle, the increase of thy kine, and the flocks of thy sheep.", "The Bible, Deut. 28:4"),
  new DirectQuote("Do not throw the arrow which will return against you.", "Kurdish Proverb"),
  new DirectQuote("Meditation brings wisdom; lack of meditation leaves ignorance. Know well what leads you forward and what holds you back.", "The Buddha"),
  new DirectQuote("Not at all similar are the race of the immortal gods and the race of men who walk upon the earth.", "Homer"),
  new DirectQuote("It is from their foes, not their friends, that cities learn the lesson of building high walls.", "Aristophanes"),
  new DirectQuote("If you speak the truth, have a foot in the stirrup.", "Turkish Proverb"),
  new DirectQuote("The Lord bless you and keep you; the Lord make His face to shine upon you and be gracious to you; the Lord lift up His countenance upon you and give you peace.", "The Bible, Numbers"),
  new DirectQuote("I am the Lord thy God. Thou shalt have no other gods before Me.", "The Bible, Exodus"),
  new DirectQuote("It is entirely seemly for a young man killed in battle to lie mangled by the bronze spear. In his death all things appear fair.", "Homer"),
  new DirectQuote("True glory consists in doing what deserves to be written; in writing what deserves to be read.", "Pliny the Elder"),
  new DirectQuote("And them that take the sword shall perish by the sword.", "The Bible, Matthew"),
  new DirectQuote("You should hammer your iron when it is glowing hot.", "Publius Syrus"),
  new DirectQuote("Words have the power to both destroy and heal. When words are both true and kind, they can change our world.", "The Buddha"),
  new DirectQuote("If in other sciences we should arrive at certainty without doubt and truth without error, it behooves us to place the foundations of knowledge in mathematics.", "Roger Bacon"),
  new DirectQuote("A multitude of rulers is not a good thing. Let there be one ruler, one king.", "Herodotus (Although, this sentence can be found at Homer's Iliad, in a speech from Ulysses)"),
  new DirectQuote("The wisest men follow their own direction.", "Euripides"),
  new DirectQuote("Some books are to be tasted, others to be swallowed, and some few to be chewed and digested.", "Sir Francis Bacon"),
  new DirectQuote("For everything there is a season and a time for every purpose under heaven.", "Ecclesiastes"),
  new DirectQuote("And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!'", "Percy Bysshe Shelley"),
  new DirectQuote("Everything is worth what its purchaser will pay for it.", "Publius Syrus"),
  new DirectQuote("A god from the machine", "Menander"),
  new DirectQuote("All the world's a stage, And all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts. ", "William Shakespeare"),
  new DirectQuote("A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.", "Antoine de Sain,Exupery"),
  new SongLyrics(
    "Hello from the other side I must've called a thousand times To tell you I'm sorry for everything that I've done But when I call, you never seem to be home",
    "Adele",
    "Hello",
    2015
  ),
  new DirectQuote("To bring about the rule of righteousness in the land, so that the strong should not harm the weak.", "Hammurabi's Code; Prologue"),
  new DirectQuote("I will to my lord be true and faithful, and love all which he loves and shun all which he shuns.", "Anglo Saxon Oath of Fealty"),
  new DirectQuote("One doesn't discover new lands without losing sight of the shore.", "Andre Gide"),
  new DirectQuote("If music be the food of love, play on.", "William Shakespeare"),
  new DirectQuote("I have gained this by philosophy: that I do without being commanded what others do only from fear of the law.", "Aristotle"),
  new DirectQuote("The bureaucracy is expanding to meet the needs of the expanding bureaucracy", "Unknown"),
  new DirectQuote("Two cities have been formed by two loves: the earthly by the love of self; the heavenly by the love of God.", "St. Augustine"),
  new DirectQuote("People of the same trade seldom meet together, even for merriment and diversion, but the conversation ends in a conspiracy against the public.", "Adam Smith"),
  new DirectQuote("I am the state.", "Louiz XIV"),
  new DirectQuote("I cannot live without books", "Thomas Jefferson"),
  new DirectQuote("Banking establishments are more dangerous than standing armies.", "Thomas Jefferson"),
  new DirectQuote("A man does not have himself killed for a half-pence a day or for a petty distinction. You must speak to the soul in order to electrify him.", "Napoleon Bonaparte"),
  new DirectQuote("What gunpowder did for war, the printing press has done for the mind.", "Wendell Phillips"),
  new DirectQuote("There is no wealth like knowledge, no poverty like ignorance.", "Ali ibn Abi Talib"),
  new DirectQuote("Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.", "Sun Tzu"),
  new DirectQuote("No freeman shall be taken, imprisoned, or in any other way destroyed, except by the lawful judgment of his peers.", "The Magna Carta]"),
  new DirectQuote("The whole is more than the sum of its parts.", "Aristotle"),
  new DirectQuote("Any society that would give up a little liberty to gain a little security will deserve neither and lose both.", "Benjamin Franklin"),
  new DirectQuote("Compound interest is the most powerful force in the universe.", "Albert Einstein"),
  new DirectQuote("You can get more of what you want with a kind word and a gun than you can with just a kind word.", "Al Capone"),
  new DirectQuote("it has been said that democracy is the worst form of government except all the others that have been tried.", "Winston Churchill"),
  new DirectQuote("Political power grows out of the barrel of a gun.", "Mao Zedong"),
  new DirectQuote("Astronomy compels the soul to look upwards and leads us from this world to another.", "Plato"),
  new DirectQuote("Corporation, n. An ingenious device for obtaining individual profit without individual responsibility.", "Ambrose Bierce"),
  new DirectQuote("Chemistry means the difference between poverty and starvation and the abundant life.", "Robert Brent"),
  new DirectQuote("You would make a ship sail against the winds and currents by lighting a bonfire under her deck ? I have no time for such nonsense.", "Napoleon, on Robert Fulton's Steamship"),
  new DirectQuote("I do not feel obliged to believe that the same God who has endowed us with sense, reason, and intellect has intended us to forgo their use.", "Galileo Galilei"),
  new DirectQuote("Before that steam drill shall beat me down, I'll die with my hammer in my hand.", "from 'John Henry, the Steel Driving Man'"),
  new DirectQuote("People can have the Model T in any color - so long as it's black.", "Henry Ford"),
  new DirectQuote("When I give food to the poor, they call me a saint. When I ask why the poor have no food, they call me a communist.", "Dom Helder Camara"),
  new DirectQuote("To every action there is always opposed an equal reaction.", "Isaac Newton"),
  new DirectQuote("It is not the strongest of the species that survive, but the one most responsive to change.", "Charles Darwin"),
  new DirectQuote("I fooled you, I fooled you, I got pig iron, I got pig iron, I got all pig iron.", "Lonnie Donegan, 'Rock Island Line'"),
  new DirectQuote("For once you have tasted flight you will walk the earth with your eyes turned skywards, for there you have been and there you will long to return.", "Leonardo Da Vinci"),
  new DirectQuote("Artillery adds dignity to what would otherwise be a vulgar brawl.", "Frederick the Great"),
  new DirectQuote("The great masses of the people... Will more easily fall victims to a big lie than to a small one.", "Adolf Hitler (Misatributted)"),
  new DirectQuote("We will make electricity so cheap that only the rich will burn candles.", "Thomas Edison"),
  new DirectQuote("As to diseases make a habit of two things - to help, or at least, to do no harm.", "Hippocrates"),
  new DirectQuote("Everything in life is somewhere else, and you get there in a car.", "E. B. White"),
  new DirectQuote("The Earth is the cradle of the mind, but one cannot eternally live in a cradle.", "Konstantin E. Tsiolkovsky"),
  new DirectQuote("There is one rule for the industrialist and that is: Make the best quality of goods possible at the lowest cost possible, paying the highest wages possible.", "Henry Ford"),
  new DirectQuote("If the radiance of a thousand suns were to burst at once into the sky, that would be like the splendor of the Mighty One... I am become Death, the Shatterer of Worlds.", "J. Robert Oppenheimer, quoting 'The Bhagavad Gita'"),
  new DirectQuote("Tell me what you eat, and I will tell you what you are.", "Anthelme Brilla,S-avarin"),
  new DirectQuote("Then one fine mornin' she puts on a New York station. You know her life was saved by Rock 'n' Roll.", "The Velvet Underground, 'Rock And Roll'"),
  new DirectQuote("Beep...beep...beep...beep...", "Sputnik I"),
  new DirectQuote("I just want to say one word to you. Just one word: plastics.", "Calder Willingham, The Graduate"),
  new DirectQuote("Never trust a computer you can't throw out a window.", "Steve Wozniak"),
  new DirectQuote("The only thing worse than being talked about is not being talked about.", "Oscar Wilde"),
  new DirectQuote("The whole is greater than the sum of its parts.", "Aristotle"),
  new DirectQuote("There is a single light of science, and to brighten it anywhere is to brighten it everywhere.", "Isaac Asimov"),
  new DirectQuote("We do not inherit the earth from our ancestors, we borrow it from our children", "Native American Song"),
  new DirectQuote("Soon it will be a sin for parents to have a child which carries the heavy burden of genetic disease.", "Bob Edwards"),
  new DirectQuote("The real problem is not whether machines think, but whether men do.", "B. F. Skinner"),
  new DirectQuote("Any sufficiently advanced technology is indistinguishable from magic.", "Arthur C. Clarke"),
  new DirectQuote("The future will be better tomorrow.", "Dan Quayle"),
]

export { PUZZLES, CryptographBase as PuzzleOfTheDay };


