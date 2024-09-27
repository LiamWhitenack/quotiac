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
function seededRandom(seed: number): () => number {
  return function () {
    // Use a simple pseudo-random number generator (PRNG)
    seed = (seed * 9301 + 49297) % 233280; // Example seed formula
    return seed / 233280;
  };
}

function shuffleArray<T>(array: T[]): T[] {
  // Get the current date as a seed
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  // Create a seeded random number generator
  const random = seededRandom(seed);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1)); // Generate a seeded random index
    // Swap array[i] with the element at random index
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; // Return the shuffled array
}
const iconNamesToUse = shuffleArray(iconNames);

export default iconNamesToUse;
