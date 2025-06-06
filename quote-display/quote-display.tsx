import { Ionicons } from "@expo/vector-icons";
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

interface WordDisplayProps {
  quote: string[];
  setQuoteIndex: (index: number) => void;
  decodingMap: Map<string, string>;
  setDecodingMap: (newMap: Map<string, string>) => void;
  showSpaces: boolean;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
  updateKeyRows: (map: Map<string, string>) => void;
  solved: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({
  quote,
  setQuoteIndex,
  decodingMap,
  setDecodingMap,
  showSpaces,
  activeIcon,
  setActiveIcon,
  updateKeyRows,
  solved,
}) => {
  // Statically sized icons for now. We will worry about scrolling later.
  const iconSize = 32;

  // ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  // const numberOfIconsInColumn = sizing.quoteHeight / iconSize;


  const display_quote = quoteIconDisplay(
    quote,
    decodingMap,
    showSpaces,
    iconSize,
    solved,
    activeIcon,
    setActiveIcon,
    setQuoteIndex
  );

  return (
    <View style={styles.verticalContainer}>
      <View style={styles.horizontalContainer}>
        {display_quote.map((element, index) => (
          <View
            key={index}
            style={{
              width: iconSize,
              height: iconSize,
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
};

export default WordDisplay;
function quoteIconDisplay(
  quote: string[],
  decodingMap: Map<string, string>,
  showSpaces: boolean,
  iconSize: number,
  solved: boolean,
  activeIcon: string,
  setActiveIcon: (icon: string) => void,
  setQuoteIndex: (index: number) => void
) {
  // determine number of icons per row for wordwrap
  const numberOfIconsInRow = Math.floor((sizing.maxWidth - 20) / iconSize); // Subtract 20 to account for 10px padding
  console.log(numberOfIconsInRow)

  // Format quote for word wrapping
  quote = wrapWords(quote, numberOfIconsInRow);
  console.log(quote)

  return quote

    .map((element) => {
      const decoded = decodingMap.get(element);
      return decoded !== undefined ? decoded : element;
    })
    .map((element, index) => {
      if (element === " " && showSpaces) {
        // empty space for space
        return (
          <View
            key={element}
            style={{ height: iconSize, width: iconSize }}
          ></View>
        );
      } else if (element.length === 1) {
        // display capital letter
        return (
          <View
            key={element}
            style={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              height: iconSize,
              width: iconSize,
            }}
          >
            <TouchableOpacity disabled={solved}>
              {<Text style={{ fontSize: iconSize / 1.2 }}>{element}</Text>}
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View
            key={element + index}
            style={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              height: iconSize,
              width: iconSize,
            }}
          >
            <Ionicons
              // @ts-ignore
              name={element}
              size={iconSize / 1.2}
              color={element === activeIcon ? "blue" : "black"}
              onPress={() => {
                if (activeIcon === element) {
                  setActiveIcon("");
                } else {
                  setQuoteIndex(index);
                  setActiveIcon(element);
                }
              }}
            />
          </View>
        );
      }
    });
}

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
