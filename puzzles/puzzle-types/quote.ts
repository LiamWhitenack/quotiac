import CryptographBase from "./base";

/**
 * Represents a fiction or non-fiction quote in which a character is being quoted from anything, including novels, comic
 *  books, movies, etc. (i.e. Gandalf in The Hobbit)
 */
class CharacterQuote extends CryptographBase {
    sourceTitle: string
    characterName: string
    releaseDate: number

    constructor(quote: string, sourceType: string, characterName: string, sourceTitle: string, releaseDate: number) {
        super(quote, sourceType + " Quote")
        this.sourceTitle = sourceTitle
        this.characterName = characterName
        this.releaseDate = releaseDate
    }
}
/**
 * Like the declaration of independence
 */
class FamousDocumentQuote extends CryptographBase {
    sourceTitle: string
    AuthorName: string
    releaseDate: number

    constructor(quote: string, sourceTitle: string, authorName: string, publishDate: number) {
        super(quote, "Famous Document")
        this.sourceTitle = sourceTitle
        this.AuthorName = authorName
        this.releaseDate = publishDate
    }
}
/**
 * Represents a direct quote from someone outside of a famous context
 */
class DirectQuote extends CryptographBase {
    author: string
    date: number | undefined

    constructor(quote: string, author: string, date: number | undefined = undefined) {
        super(quote, "Direct Quote")
        this.author = author
        this.date = date
    }
}

/**
 * Represents a general quote which has been used enough to have no recognizeable source (i.e. "If a Brooklyn man finds
 * himself in a room with Hitler, Stalin, and O'Malley, but has only two bullets, what does he do? Shoot O'Malley 
 * twice." (This could also be a riddle))
 */
class GeneralPhrase extends CryptographBase {
    constructor(quote: string) {
        super(quote, "General Quote")
    }
}

/**
 * Represents a general quote which has been used enough to have no recognizeable source (i.e. "What are thoooooose?")
 */
class SongLyrics extends CryptographBase {
    artist: string
    songName: string
    date: number

    constructor(lyric: string, artist: string, songName: string, date: number) {
        super(lyric, "Song Lyric")
        this.songName = songName
        this.artist = artist
        this.date = date
    }
}


export { CharacterQuote, DirectQuote, GeneralPhrase, SongLyrics, FamousDocumentQuote };