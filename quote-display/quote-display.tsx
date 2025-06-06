import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styles from "./styles";
import sizing from "../sizing/sizing";
import getIcons from "./get-icons";

interface QuoteDisplayProps {
  quote: string[];
  setQuoteIndex: (index: number) => void;
  decodingMap: Map<string, string>;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
  solved: boolean;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
  quote,
  setQuoteIndex,
  decodingMap,
  activeIcon,
  setActiveIcon,
  solved,
}) => {
  // ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  // const numberOfIconsInColumn = sizing.quoteHeight / sizing.iconSize;
  const numberOfIconsInRow = sizing.maxWidth - 20 / sizing.iconSize; // Subtract 20 to account for 10px padding
  console.log(numberOfIconsInRow);


  const display_quote = getIcons(
    quote,
    decodingMap,
    solved,
    activeIcon,
    setActiveIcon,
    setQuoteIndex
  );

  function putIconsInBoxes(display_quote: React.JSX.Element[]) {
    return (
      <View style={styles.verticalContainer}>
        <View style={styles.horizontalContainer}>
          {display_quote.map((element, index) => (
            <View
              key={index}
              style={{
                width: sizing.iconSize,
                height: sizing.iconSize,
              }}
            >
              <TouchableOpacity key={index} disabled={solved}>
                <Text>{element}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
  return putIconsInBoxes(display_quote);
};

function wrapWords(input: string[], iconsPerRow: number): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let lineLength = 0;

  let i = 0;
  while (i < input.length) {
    const token = input[i];

    if (token === ' ') {
      // Only add space if room on this line
      if (lineLength < iconsPerRow) {
        currentRow.push(token);
        lineLength++;
      }
      i++;
    } else {
      // Get the entire word sequence
      const wordStart = i;
      const word: string[] = [];
      while (i < input.length && input[i] !== ' ') {
        word.push(input[i]);
        i++;
      }

      // If it doesn't fit, push current row and start new
      if (lineLength + word.length > iconsPerRow) {
        rows.push(currentRow);
        currentRow = [];
        lineLength = 0;
      }

      // Add the word
      currentRow.push(...word);
      lineLength += word.length;
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}

export default QuoteDisplay;
