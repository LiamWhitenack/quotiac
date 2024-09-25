import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import sizing from "./sizing";

interface WordDisplayProps {
  quote: string[];
  showSpaces: boolean;
}

const QuoteDisplay: React.FC<WordDisplayProps> = ({ quote, showSpaces }) => {
  const numIconsInRow = Math.floor(Math.sqrt(quote.length));
  const iconMarginSize = sizing.maxWidth / (12 * numIconsInRow);
  const iconSize = iconMarginSize * 10;
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
        // @ts-ignore
        <Ionicons name={element} size={iconSize} style={styles.iconStyle} />
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
    // resizeMode: "contain", // Ensures the icon scales proportionally
  },
  spaceIconStyle: {
    // flex: 1,
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
    maxWidth: 600,
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
