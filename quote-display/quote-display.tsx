import React from "react";
import { View } from "react-native";
import styles from "./styles";
import sizing from "../sizing/sizing";
import getIcons from "./get-icons";
import GameState from "@/state/state";

interface QuoteDisplayProps {
  state: GameState;
  updateState: () => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ state, updateState }) => {
  // ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  // const numberOfIconsInColumn = sizing.quoteHeight / sizing.iconSize;

  return (
    <View style={styles.verticalContainer}>
      <View style={styles.horizontalContainer}>
        {getIcons(state, updateState)}
      </View>
    </View>
  );
};

export default QuoteDisplay;
