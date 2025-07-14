import React from "react";
import { Text, View } from "react-native";
import CryptographBase from "@/puzzles/base";
import { createStyles } from "./styles";
import { useTheme } from "@/theme/ThemeContext";

type DetailsViewProps = {
  puzzle: CryptographBase;
};

const QuoteDetails: React.FC<DetailsViewProps> = ({ puzzle }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Convert entries to an array before rendering
  const entries = Array.from(puzzle.otherInfo.entries());

  return (
    <View>
      {entries.map(([key, value]) => (
        <View key={key} style={{ marginVertical: 4 }}>
          <Text style={styles.puzzleInfoHeader}>{key}</Text>
          <Text style={styles.puzzleInfoText}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

export default QuoteDetails;
