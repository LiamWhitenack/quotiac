import HintBase from "../hints/base";
import CryptographBase, { EncryptionMap } from "./base";

/**
 * Represents a fiction or non-fiction quote in which a character is being quoted from anything, including novels, comic
 *  books, movies, etc. (i.e. Gandalf in The Hobbit)
 */
class CharacterQuote extends CryptographBase {
    sourceTitle: string;
    characterName: string;
    releaseDate: string;

    constructor(
        quote: string,
        characterName: string,
        sourceTitle: string,
        releaseDate: string,
        hints: HintBase[],
        encryptionMap: EncryptionMap
    ) {
        super(quote, "Film Quote", hints, encryptionMap);
        this.sourceTitle = sourceTitle;
        this.characterName = characterName;
        this.releaseDate = releaseDate;
    }

    static fromJSON(data: any, hints: HintBase[], encryptionMap: EncryptionMap): CharacterQuote {
        return new CharacterQuote(
            data.string_to_encrypt,
            data.character_name,
            data.source,
            data.release_date,
            hints,
            encryptionMap
        );
    }
}

/**
 * Like the declaration of independence
 */
class FamousDocumentQuote extends CryptographBase {
    sourceTitle: string;
    authorName: string;
    releaseDate: string;

    constructor(
        quote: string,
        sourceTitle: string,
        authorName: string,
        releaseDate: string,
        hints: HintBase[],
        encryptionMap: EncryptionMap
    ) {
        super(quote, "Famous Document", hints, encryptionMap);
        this.sourceTitle = sourceTitle;
        this.authorName = authorName;
        this.releaseDate = releaseDate;
    }

    static fromJSON(data: any, hints: HintBase[], encryptionMap: EncryptionMap): FamousDocumentQuote {
        return new FamousDocumentQuote(
            data.string_to_encrypt,
            data.source,
            data.author,
            data.release_date,
            hints,
            encryptionMap
        );
    }
}

/**
 * Represents a direct quote from someone outside of a famous context
 */
class DirectQuote extends CryptographBase {
    author: string;
    date: number | undefined;

    constructor(
        quote: string,
        author: string,
        date: number | undefined,
        hints: HintBase[],
        encryptionMap: EncryptionMap
    ) {
        super(quote, "Direct Quote", hints, encryptionMap);
        this.author = author;
        this.date = date;
    }

    static fromJSON(data: any, hints: HintBase[], encryptionMap: EncryptionMap): DirectQuote {
        return new DirectQuote(
            data.string_to_encrypt,
            data.author,
            data.release_date ? data.release_date : undefined,
            hints,
            encryptionMap
        );
    }
}

/**
 * Represents a general quote which has been used enough to have no recognizeable source (i.e. "If a Brooklyn man finds
 * himself in a room with Hitler, Stalin, and O'Malley, but has only two bullets, what does he do? Shoot O'Malley 
 * twice." (This could also be a riddle))
 */
class GeneralPhrase extends CryptographBase {
    constructor(
        quote: string,
        hints: HintBase[],
        encryptionMap: EncryptionMap
    ) {
        super(quote, "General Quote", hints, encryptionMap);
    }

    static fromJSON(data: any, hints: HintBase[], encryptionMap: EncryptionMap): GeneralPhrase {
        return new GeneralPhrase(data.string_to_encrypt, hints, encryptionMap);
    }
}

/**
 * Represents a general quote which has been used enough to have no recognizeable source (i.e. "What are thoooooose?")
 */
class SongLyrics extends CryptographBase {
    artist: string;
    songName: string;
    date: number;

    constructor(
        lyric: string,
        artist: string,
        songName: string,
        date: number,
        hints: HintBase[],
        encryptionMap: EncryptionMap
    ) {
        super(lyric, "Song Lyric", hints, encryptionMap);
        this.artist = artist;
        this.songName = songName;
        this.date = date;
    }

    static fromJSON(data: any, hints: HintBase[], encryptionMap: EncryptionMap): SongLyrics {
        return new SongLyrics(
            data.string_to_encrypt,
            data.artist,
            data.title,
            data.release_date,
            hints,
            encryptionMap
        );
    }
}


export { CharacterQuote, DirectQuote, GeneralPhrase, SongLyrics, FamousDocumentQuote };