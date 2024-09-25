import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const horizontalMargin = 15;

interface WordDisplayProps {
  quote: string[];
  showSpaces: boolean;
}

const QuoteDisplay: React.FC<WordDisplayProps> = ({ quote, showSpaces }) => {
  const display_quote = quote.map((element) => {
    if (element == " " && showSpaces) {
      return <Ionicons name={"basketball"} size={20} color="transparent" />;
    } else if (element.length == 1) {
      return <Text>{element}</Text>;
    } else {
      // @ts-ignore
      return <Ionicons name={element} size={20} color="black" />;
    }
  });
  return (
    <View style={styles.verticalContainer}>
      <View style={styles.horizontalContainer}>
        {display_quote.map((element, index) => (
          <TouchableOpacity key={index}>{element}</TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verticalContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: horizontalMargin,
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
