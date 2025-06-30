import React from "react";
import { Text, View } from "react-native";
import CryptographBase from "@/puzzles/puzzle-types/base";
import {
  CharacterQuote,
  DirectQuote,
  FamousDocumentQuote,
  GeneralPhrase,
  SongLyrics,
} from "@/puzzles/puzzle-types/quote";
import { createStyles } from "./styles";
import { useTheme } from "@/theme/ThemeContext";

type DetailsViewProps = {
  details: Record<string, string | number | undefined>;
};

const DetailsView: React.FC<DetailsViewProps> = ({ details }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View>
      {Object.entries(details).map(([key, value], index) => {
        if (value === undefined) return null;
        return (
          <View key={index} style={{ marginBottom: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.puzzleInfoHeader}>{key}: </Text>
              <Text style={styles.puzzleInfoText}>{value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

type QuoteDetailsProps = {
  puzzle: CryptographBase;
};
const QuoteDetails: React.FC<QuoteDetailsProps> = ({ puzzle }) => {
  if (puzzle instanceof CharacterQuote) {
    return (
      <DetailsView
        details={{
          Character: puzzle.characterName,
          Title: puzzle.sourceTitle,
          Release: puzzle.releaseDate,
        }}
      />
    );
  }

  if (puzzle instanceof FamousDocumentQuote) {
    return (
      <DetailsView
        details={{
          Author: puzzle.AuthorName,
          Title: puzzle.sourceTitle,
          Release: puzzle.releaseDate,
        }}
      />
    );
  }

  if (puzzle instanceof DirectQuote) {
    return (
      <DetailsView
        details={{
          Author: puzzle.author,
          Date: puzzle.date,
        }}
      />
    );
  }

  if (puzzle instanceof SongLyrics) {
    return (
      <DetailsView
        details={{
          Artist: puzzle.artist,
          Song: puzzle.songName,
          Release: puzzle.date,
        }}
      />
    );
  }

  return null;
};
export default QuoteDetails;
