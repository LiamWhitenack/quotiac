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
  const iconSize = 32;
  // ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  // const numberOfIconsInColumn = sizing.quoteHeight / iconSize;
  const numberOfIconsInRow = sizing.maxWidth - 20 / iconSize; // Subtract 20 to account for 10px padding
  console.log(numberOfIconsInRow);

  // Dynamic sized display
  const { height, width, scale, fontScale } = useWindowDimensions();
  sizing.screenHeight = height;
  sizing.screenWidth = width;

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
