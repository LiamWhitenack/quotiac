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
  quoteIndex: number;
  decodingMap: Map<string, string>;
  setDecodingMap: (newMap: Map<string, string>) => void;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
  keyRows: string[][];
  updateKeyRows: (map: Map<string, string>) => void;
}

const LetterKeyboardDisplay: React.FC<LetterKeyboardDisplayProps> = ({
  encodedQuote,
  quoteIndex,
  decodingMap,
  setDecodingMap,
  activeIcon,
  setActiveIcon,
  keyRows,
  updateKeyRows,
}) => {
  function getNextIconName(): string {
    for (let iconName in encodedQuote.slice(quoteIndex)) {
      console.log(quoteIndex);
      if (iconName == "bluetooth") {
        continue;
      }
      const char = decodingMap.get(iconName);
      if (char === undefined) {
        return iconName;
      }
    }
    return "";
  }

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
                  // React to an key being pressed
                  if (
                    // if no key is selected or that letter has already been used
                    activeIcon == "" ||
                    Array.from(decodingMap.values()).includes(letter)
                  ) {
                    return;
                  } else {
                    // update decoding map and update the keyboard
                    decodingMap = new Map(decodingMap).set(activeIcon, letter);
                    setDecodingMap(decodingMap);
                    updateKeyRows(decodingMap);
                    setActiveIcon(getNextIconName());
                  }
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
    marginBottom: sizing.keyboardMargin / 2,
    marginHorizontal: sizing.keyboardMargin,
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
