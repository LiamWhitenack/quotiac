import React, { useState, useEffect, FC } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import WORDS from "./src/quotes"; // Import word list from external file
import { mainWindowStyles } from "./styles";
import WordDisplay from "./quote-display";
import LetterKeyboardDisplay from "./keyboard";
import icons from "./icons";
import { Ionicons } from "@expo/vector-icons";

const getRandomQuote = () => {
  const keys = Object.keys(WORDS);
  return keys[Math.floor(Math.random() * keys.length)];
};

const CodiacApp = () => {
  const [targetQuote, setTargetQuote] = useState(getRandomQuote());
  const [encodingMap, setEncodingMap] = useState(
    mapUniqueLettersToNumbers(targetQuote)
  );
  const [showSpaces, setSpaces] = useState(true);

  function mapUniqueLettersToNumbers(
    input: string
  ): Map<string, React.JSX.Element | string> {
    // Create a set to store unique letters
    const uniqueLetters = new Set<string>();

    // Iterate over each character in the input string
    for (const char of input.toLowerCase()) {
      if (char >= "a" && char <= "z") {
        // Check if the character is a letter
        uniqueLetters.add(char);
      }
    }

    // Create a map to store letters and their corresponding numbers
    const letterMap = new Map<string, React.JSX.Element>();
    let index = 1;

    // Populate the map with unique letters and their positions
    for (const letter of uniqueLetters) {
      letterMap.set(letter, icons[index]);
      index++;
    }

    return letterMap;
  }

  const encodeStringToIcons = (
    input: string
  ): (React.JSX.Element | string)[] => {
    return input
      .split("")
      .map((char, index) => {
        if (char == " " && showSpaces) {
          return (
            <View key={index} style={mainWindowStyles.emptyIconContainer}>
              <Ionicons name={"basketball"} size={20} color="transparent" />
            </View>
          );
        }
        return encodingMap.get(char);
      })
      .filter((icon) => icon !== undefined);
  };

  return (
    <SafeAreaView style={mainWindowStyles.container}>
      <Text style={mainWindowStyles.title}>Codiac</Text>
      <WordDisplay quote={encodeStringToIcons(targetQuote.toLowerCase())} />
      <LetterKeyboardDisplay />
      {}
    </SafeAreaView>
  );
};

export default CodiacApp;
