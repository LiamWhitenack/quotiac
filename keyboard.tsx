import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import sizing from "./sizing";
import { Ionicons } from "@expo/vector-icons";
import KEYBOARD_LETTERS from "./src/keyboard-letters";

interface LetterKeyboardDisplayProps {
  encodedQuote: string[];
  reactToKeyPress: (letter: string) => void;
  quoteIndex: number;
  setQuoteIndex: (index: number) => void;
  decodingMap: Map<string, string>;
  setDecodingMap: (newMap: Map<string, string>) => void;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
  keyRows: string[][];
  updateKeyRows: (map: Map<string, string>) => void;
}

const LetterKeyboardDisplay: React.FC<LetterKeyboardDisplayProps> = ({
  reactToKeyPress,
  keyRows,
}) => {
  return (
    <View style={styles.container}>
      {keyRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((element, index) =>
            keyboardKey(reactToKeyPress, rowIndex, index, element)
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the main container takes the full height
    justifyContent: "flex-end",
    // alignItems: "flex-end",
    paddingTop: 50,
    backgroundColor: "#F3F4F6",
    maxWidth: sizing.maxWidth,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: sizing.keyboardMargin / 8,
    marginHorizontal: sizing.keyboardMargin / 8,
  },
  key: {
    width: sizing.keyboardKeyWidth, // Each key takes equal space in the row
    height: 55, // Fixed height for keys
    justifyContent: "center",
    alignItems: "center",
    margin: sizing.keyboardKeyGap, // Adjust margin for spacing
    backgroundColor: "#D3D6DA",
    borderRadius: 5,
  },
  disabledKey: {
    width: sizing.keyboardKeyWidth, // Each key takes equal space in the row
    height: 55, // Fixed height for keys
    justifyContent: "center",
    alignItems: "center",
    margin: sizing.keyboardKeyGap, // Adjust margin for spacing
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  keyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activeKey: {
    backgroundColor: "#D3D6DA",
  },
});

function keyboardKey(
  reaction: (letter: string) => void,
  rowIndex: number,
  index: number,
  element: string
) {
  const letter = KEYBOARD_LETTERS[rowIndex][index];
  const isLetter = element === letter;
  return (
    <TouchableOpacity
      key={element}
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

export default LetterKeyboardDisplay;
