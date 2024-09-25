import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const horizontalMargin = 15;

interface WordDisplayProps {
  quote: (React.JSX.Element | string)[];
}

const QuoteDisplay: React.FC<WordDisplayProps> = ({ quote }) => {
  return (
    <View style={styles.verticalContainer}>
      <View style={styles.horizontalContainer}>
        {quote.map((element, index) => (
          <TouchableOpacity key={index}>
            {typeof element === "string" ? (
              <Text>{element}</Text> // Display the string
            ) : (
              element // Display the React element
            )}
          </TouchableOpacity>
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
