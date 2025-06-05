import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import sizing from "../sizing/sizing";
import { Ionicons } from "@expo/vector-icons";
import KEYBOARD_LETTERS from "../src/keyboard-letters";
import styles from "./styles";

function keyboardKey(
  reaction: (letter: string) => void,
  solved: boolean,
  rowIndex: number,
  index: number,
  element: string
) {
  const letter = KEYBOARD_LETTERS[rowIndex][index];
  const isLetter = element === letter;
  return (
    <TouchableOpacity
      key={element}
      disabled={solved}
      style={isLetter ? styles.key : styles.disabledKey}
      onPress={() => {
        reaction(element);
      }}
    >
      {isLetter ? (
        <Text style={styles.keyText}>
          {element.length === 1 ? (
            element
          ) : (
            <Ionicons
              // @ts-ignore
              name={element}
              size={Math.min(0.8 * sizing.keyboardKeyWidth)}
            />
          )}
        </Text>
      ) : (
        <Ionicons
          // @ts-ignore
          name={element}
          size={sizing.keyboardKeyWidth * 0.8}
        />
      )}
    </TouchableOpacity>
  );
}

export default keyboardKey;
