import React from "react";
import { View } from "react-native";
import { createStyles } from "./styles";
// import sizing from "../sizing/sizing";
import getIcons from "./get-icons";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";

interface QuoteDisplayProps {
  state: GameState;
  updateState: () => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ state, updateState }) => {
  // ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  // const numberOfIconsInColumn = sizing.quoteHeight / sizing.iconSize;
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.verticalContainer}>
      <View style={styles.horizontalContainer}>
        {getIcons(state, updateState, theme)}
      </View>
    </View>
  );
};

export default QuoteDisplay;
