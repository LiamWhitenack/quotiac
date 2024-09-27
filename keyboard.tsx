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
          {row.map((element, index) => {
            const letter = KEYBOARD_LETTERS[rowIndex][index];
            if (element != letter) {
              return (
                <View style={styles.disabledKey}>
                  <Ionicons
                    // @ts-ignore
                    name={element}
                    size={sizing.keyboardKeyWidth * 0.8}
                  />
                </View>
              );
            }
            return (
              <TouchableOpacity
                style={styles.key}
                onPress={() => {
                  reactToKeyPress(letter);
                }}
              >
                <Text style={styles.keyText}>
                  {element.length == 1 ? (
                    element
                  ) : (
                    <Ionicons
                      // @ts-ignore
                      name={element}
                      size={Math.min(0.8 * sizing.keyboardKeyWidth)}
                    />
                  )}
                </Text>
              </TouchableOpacity>
            );
          })}
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
    height: 50, // Fixed height for keys
    justifyContent: "center",
    alignItems: "center",
    margin: sizing.keyboardKeyGap, // Adjust margin for spacing
    backgroundColor: "#D3D6DA",
    borderRadius: 5,
  },
  disabledKey: {
    width: sizing.keyboardKeyWidth, // Each key takes equal space in the row
    height: 50, // Fixed height for keys
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

export default LetterKeyboardDisplay;
