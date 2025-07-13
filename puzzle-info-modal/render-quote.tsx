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

  return (
    <View>
      {puzzle.otherInfo.entries().map(([key, value]) => (
        <View key={key} style={{ marginVertical: 4 }}>
          <Text style={{ fontWeight: "bold" }}>{key}</Text>
          <Text>{value?.toString()}</Text>
        </View>
      ))}
    </View>
  );
};

export default QuoteDetails;
