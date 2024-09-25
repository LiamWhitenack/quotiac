import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import sizing from "./sizing";

interface WordDisplayProps {
  quote: string[];
  showSpaces: boolean;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
}

const QuoteDisplay: React.FC<WordDisplayProps> = ({
  quote,
  showSpaces,
  activeIcon,
  setActiveIcon,
}) => {
  const numIconsInRow = Math.floor(Math.sqrt(quote.length));
  const iconSize = (sizing.maxWidth / (15 * numIconsInRow)) * 10;
  const display_quote = quote.map((element) => {
    if (element == " " && showSpaces) {
      return (
        <Ionicons
          name={"basketball"}
          size={iconSize}
          style={styles.spaceIconStyle}
        />
      );
    } else if (element.length == 1) {
      return <Text>{element}</Text>;
    } else {
      iconSize;

      return (
        <Ionicons
          // @ts-ignore
          name={element}
          size={iconSize}
          color={element == activeIcon ? "blue" : "black"}
          onPress={() => setActiveIcon(element)}
        />
      );
    }
  });

  return (
    <View style={styles.verticalContainer}>
      <View style={styles.horizontalContainer}>
        {display_quote.map((element, index) => (
          // <View style={iconContainer.style}>
          <TouchableOpacity key={index}>{element}</TouchableOpacity>
          // </View>
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

  verticalContainer: {
    flex: 3,
    flexDirection: "column",
    alignContent: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  horizontalContainer: {
    maxWidth: sizing.maxWidth * 0.9,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  quote: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default QuoteDisplay;
