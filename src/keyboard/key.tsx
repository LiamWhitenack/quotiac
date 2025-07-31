import React from "react";
import { Text, TouchableOpacity } from "react-native";
import sizing from "../sizing/sizing";
import { createStyles } from "./styles";
import GameState from "@/src/state";
import { useTheme } from "@/src/theme/ThemeContext";
import CustomIonicons from "@/src/custom-icons";
import KEYBOARD_LETTERS from "./keyboard-letters";

function keyboardKey(
  state: GameState,
  updateState: () => void,
  rowIndex: number,
  index: number,
  element: string
) {
  const letter = KEYBOARD_LETTERS[rowIndex][index];
  const isLetter = element === letter;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      key={element}
      disabled={state.solved || state.elementIsPartOfHint(element)}
      style={isLetter ? styles.key : styles.iconKey}
      onPress={() => {
        state.reactToKeyboardPress(element);
        updateState();
      }}
    >
      {isLetter ? (
        <Text style={styles.keyText}>{element}</Text>
      ) : (
        <CustomIonicons
          // @ts-ignore
          name={element}
          color={state.elementColor(element, theme)}
          size={sizing.keyboardKeyWidth * 0.8}
        />
      )}
    </TouchableOpacity>
  );
}

export default keyboardKey;
