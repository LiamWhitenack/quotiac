import React from "react";
import { View } from "react-native";
import styles from "./styles";
import keyboardKey from "./key";

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
  solved: boolean;
}

const LetterKeyboardDisplay: React.FC<LetterKeyboardDisplayProps> = ({
  reactToKeyPress,
  keyRows,
  solved,
}) => {
  return (
    <View style={styles.container}>
      {keyRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((element, index) =>
            keyboardKey(reactToKeyPress, solved, rowIndex, index, element)
          )}
        </View>
      ))}
    </View>
  );
};

export default LetterKeyboardDisplay;
