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

interface LetterKeyboardDisplayProps {
  quote: string[];
  decodingMap: Map<string, string>;
  setDecodingMap: (newMap: Map<string, string>) => void;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
}

const KEYBOARD_LETTERS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const LetterKeyboardDisplay: React.FC<LetterKeyboardDisplayProps> = ({
  quote,
  decodingMap,
  setDecodingMap,
  activeIcon,
  setActiveIcon,
}) => {
  const [rows, setRows] = useState(KEYBOARD_LETTERS);

  function inverseMap(map: Map<string, string>): Map<string, string> {
    const inverseDecodingMap = new Map<string, string>();
    decodingMap.forEach((value, key) => {
      inverseDecodingMap.set(value, key);
    });
    return inverseDecodingMap;
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
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
                key={letter}
                style={styles.key}
                onPress={() => {
                  console.log(decodingMap);
                  if (
                    activeIcon == "" ||
                    Array.from(decodingMap.values()).includes(letter)
                  ) {
                    return;
                  } else {
                    decodingMap = new Map(decodingMap).set(activeIcon, letter);
                    setDecodingMap(decodingMap);
                    const inverseDecodingMap = inverseMap(decodingMap);
                    setRows(
                      KEYBOARD_LETTERS.map((row) =>
                        row.map((char) => {
                          const associatedIconName =
                            inverseDecodingMap.get(char);
                          console.log(inverseDecodingMap);
                          return associatedIconName === undefined
                            ? char
                            : associatedIconName;
                        })
                      )
                    );
                    setActiveIcon("");
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
