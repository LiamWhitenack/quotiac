import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import iconNames from "./src/icon-names";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  iconContainer: {
    margin: 10,
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
  },
});
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    // Swap array[i] with the element at random index
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; // Return the shuffled array
}
const iconNamesToUse = shuffleArray(iconNames);

export default iconNamesToUse;
