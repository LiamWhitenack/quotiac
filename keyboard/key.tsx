import React from "react";
import { Text, TouchableOpacity } from "react-native";
import sizing from "../sizing/sizing";
import { Ionicons } from "@expo/vector-icons";
import KEYBOARD_LETTERS from "../src/keyboard-letters";
import styles from "./styles";
import GameState from "@/state/state";

function keyboardKey(
  state: GameState,
  updateState: () => void,
  rowIndex: number,
  index: number,
  element: string
) {
  const letter = KEYBOARD_LETTERS[rowIndex][index];
  const isLetter = element === letter;
  console.log(element);
  return (
    <TouchableOpacity
      key={element}
      disabled={state.solved || state.elementIsPartOfHint(element)}
      style={isLetter ? styles.key : styles.iconKey}
      onPress={() => {
        state.reactToKeyPress(element);
        updateState();
      }}
    >
      {isLetter ? (
        <Text style={styles.keyText}>{element}</Text>
      ) : (
        <Ionicons
          // @ts-ignore
          name={element}
          color={state.elementColor(element)}
          size={sizing.keyboardKeyWidth * 0.8}
        />
      )}
    </TouchableOpacity>
  );
}

export default keyboardKey;
