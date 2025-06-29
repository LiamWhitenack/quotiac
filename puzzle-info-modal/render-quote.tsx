import React from "react";
import { Text } from "react-native";
import CryptographBase from "@/puzzles/puzzle-types/base";
import {
  CharacterQuote,
  DirectQuote,
  FamousDocumentQuote,
  SongLyrics,
} from "@/puzzles/puzzle-types/quote";

type QuoteDetailsProps = {
  puzzle: CryptographBase;
};

const QuoteDetails: React.FC<QuoteDetailsProps> = ({ puzzle }) => {
  if (puzzle instanceof CharacterQuote) {
    return (
      <>
        <Text>Character: {puzzle.characterName}</Text>
        <Text>Title: {puzzle.sourceTitle}</Text>
        <Text>Release: {puzzle.releaseDate}</Text>
      </>
    );
  }

  if (puzzle instanceof FamousDocumentQuote) {
    return (
      <>
        <Text>Author: {puzzle.AuthorName}</Text>
        <Text>Title: {puzzle.sourceTitle}</Text>
        <Text>Release: {puzzle.releaseDate}</Text>
      </>
    );
  }

  if (puzzle instanceof DirectQuote) {
    return (
      <>
        <Text>Author: {puzzle.author}</Text>
        {puzzle.date !== undefined && <Text>Date: {puzzle.date}</Text>}
      </>
    );
  }

  if (puzzle instanceof SongLyrics) {
    return (
      <>
        <Text>Artist: {puzzle.artist}</Text>
        <Text>Song: {puzzle.songName}</Text>
        <Text>Release: {puzzle.date}</Text>
      </>
    );
  }

  // GeneralPhrase or unknown types
  return null;
};

export default QuoteDetails;
