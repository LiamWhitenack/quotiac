import React from "react";
import { View } from "react-native";
import styles from "./styles";
import keyboardKey from "./key";
import GameState from "@/state/state";

interface LetterKeyboardDisplayProps {
  state: GameState;
  updateState: () => void;
}

const LetterKeyboardDisplay: React.FC<LetterKeyboardDisplayProps> = ({
  state,
  updateState,
}) => {
  return (
    <View style={styles.container}>
      {state.keyboardValues.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((element, index) =>
            keyboardKey(state, updateState, rowIndex, index, element)
          )}
        </View>
      ))}
    </View>
  );
};

export default LetterKeyboardDisplay;
