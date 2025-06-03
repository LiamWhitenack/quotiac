import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import sizing from "./sizing";

function getKeyByValue<T extends Map<string, string>>(
  map: T,
  value: string
): string {
  // Get array of object values
  const values = Array.from(map.values());

  // Find the index of the target value
  const index = values.indexOf(value);
  // If the value is found
  if (index != -1) {
    // Get array of object keys
    const keys = Array.from(map.keys());
    // Return the key at the same index
    return keys[index];
  }
  // If value is not found, return null or handle accordingly
  throw Error();
}

interface WordDisplayProps {
  quote: string[];
  setQuoteIndex: (index: number) => void;
  decodingMap: Map<string, string>;
  setDecodingMap: (newMap: Map<string, string>) => void;
  showSpaces: boolean;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
  updateKeyRows: (map: Map<string, string>) => void;
}

const QuoteDisplay: React.FC<WordDisplayProps> = ({
  quote,
  setQuoteIndex,
  decodingMap,
  setDecodingMap,
  showSpaces,
  activeIcon,
  setActiveIcon,
  updateKeyRows,
}) => {
  const iconSize =
    ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  const numberOfIconsInColumn = sizing.quoteHeight / iconSize;
  const numberOfIconsInRow = sizing.screenWidth / iconSize;
  const { height, width, scale, fontScale } = useWindowDimensions();
  sizing.screenHeight = height;
  sizing.screenWidth = width;
  const display_quote = quote
    .map((element) => {
      const decoded = decodingMap.get(element);
      console.log(decoded)
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
            <TouchableOpacity>
              {
                <Text
                  style={{ fontSize: iconSize / 1.2 }}
                  onPress={() => {
                    // clear the active icon and the decoding selection
                    decodingMap = new Map(decodingMap);
                    const keyOfElement = getKeyByValue(decodingMap, element);
                    const removed = decodingMap.delete(keyOfElement);
                    if (!removed) {
                      throw Error();
                    }
                    setActiveIcon(keyOfElement);
                    setDecodingMap(decodingMap);
                    updateKeyRows(decodingMap);
                  }}
                >
                  {element}
                </Text>
              }
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
              color={element == activeIcon ? "blue" : "black"}
              onPress={() => {
                if (activeIcon == element) {
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
            <TouchableOpacity key={index}>{element}</TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    color: "black",
  },
  spaceIconStyle: {
    color: "transparent",
  },
  // TODO: Add a container to make the icon spaces larger
  verticalContainer: {
    flex: 5,
    flexDirection: "column",
    alignContent: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  horizontalContainer: {
    maxWidth: sizing.maxWidth * 0.87,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  quote: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default QuoteDisplay;
