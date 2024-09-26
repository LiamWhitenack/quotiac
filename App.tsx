import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import WORDS from "./src/quotes"; // Import word list from external file
import { mainWindowStyles } from "./styles";
import WordDisplay from "./quote-display";
import LetterKeyboardDisplay from "./keyboard";
import iconNamesToUse from "./icons";
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
  const [decodingMap, setDecodingMap] = useState<Map<string, string>>(
    new Map()
  );
  const [showSpaces, setSpaces] = useState(true);
  const [activeIcon, setActiveIcon] = useState("");

  function mapUniqueLettersToNumbers(input: string): Map<string, string> {
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
    const letterMap = new Map<string, string>();
    let index = 1;

    // Populate the map with unique letters and their positions
    for (const letter of uniqueLetters) {
      letterMap.set(letter, iconNamesToUse[index]);
      index++;
    }

    return letterMap;
  }

  const encodeQuote = (input: string): string[] => {
    return input
      .split("")
      .map((char) => {
        if (char == " " && showSpaces) {
          return char;
        } else if (char >= "a" && char <= "z") {
          return encodingMap.get(char);
        }
        return undefined;
      })
      .filter((icon) => icon !== undefined);
  };

  const encodedQuote = encodeQuote(targetQuote.toLowerCase());

  return (
    <SafeAreaView style={mainWindowStyles.container}>
      <View style={mainWindowStyles.topBarContainer}>
        <Text style={mainWindowStyles.title}>Codiac</Text>
        <View style={mainWindowStyles.topBarIconContainer}>
          <TouchableOpacity style={mainWindowStyles.iconContainer}>
            <Ionicons name="bulb-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={mainWindowStyles.iconContainer}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <WordDisplay
        quote={encodedQuote}
        decodingMap={decodingMap}
        setDecodingMap={setDecodingMap}
        showSpaces={showSpaces}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />
      <LetterKeyboardDisplay
        decodingMap={decodingMap}
        setDecodingMap={setDecodingMap}
        activeIcon={activeIcon}
      />
    </SafeAreaView>
  );
};

export default CodiacApp;
