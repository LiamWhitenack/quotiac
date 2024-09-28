import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import QUOTES from "./src/quotes"; // Import word list from external file
import { mainWindowStyles } from "./styles";
import WordDisplay from "./quote-display";
import LetterKeyboardDisplay from "./keyboard";
import iconNamesToUse from "./icons";
import { Ionicons } from "@expo/vector-icons";
import KEYBOARD_LETTERS from "./src/keyboard-letters";
import puzzle from "./src/quotes";
import sizing from "./sizing";

function inverseMap(map: Map<string, string>): Map<string, string> {
  const inverseDecodingMap = new Map<string, string>();
  map.forEach((value, key) => {
    inverseDecodingMap.set(value, key);
  });
  return inverseDecodingMap;
}

const CodiacApp = () => {
  const [encodingMap, setEncodingMap] = useState(
    mapUniqueLettersToNumbers(puzzle.quote)
  );
  const [decodingMap, setDecodingMap] = useState<Map<string, string>>(
    new Map()
  );
  const [showSpaces, setShowSpaces] = useState(true);
  const [activeIcon, setActiveIcon] = useState("");
  const [keyRows, setKeyRows] = useState(KEYBOARD_LETTERS);
  const [quoteIndex, setQuoteIndex] = useState(0);

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

  const encodedQuote = encodeQuote(puzzle.quote.toLowerCase());

  const updateKeyRows = (map: Map<string, string>) => {
    setKeyRows(
      KEYBOARD_LETTERS.map((row) =>
        row.map((char) => {
          const inverseDecodingMap = inverseMap(map);
          const associatedIconName = inverseDecodingMap.get(char);
          return associatedIconName === undefined ? char : associatedIconName;
        })
      )
    );
  };

  function getNextIconName(): string {
    for (let i = 0; i < encodedQuote.length; i++) {
      let iconName = encodedQuote[i];
      if (i <= quoteIndex || iconName == " " || iconName == activeIcon) {
        continue;
      }
      const char = decodingMap.get(iconName);
      if (char === undefined) {
        setQuoteIndex(i);
        return iconName;
      }
    }
    setQuoteIndex(0);
    return "";
  }

  function reactToKeyPress(letter: string) {
    letter = letter.toUpperCase();
    if (letter < "A" || letter > "Z") {
      return;
    }
    if (letter.length != 1) {
      throw Error();
    }
    // React to an key being pressed
    if (
      // if no key is selected or that letter has already been used
      activeIcon == "" ||
      Array.from(decodingMap.values()).includes(letter)
    ) {
      return;
    } else {
      // update decoding map and update the keyboard
      let updatedDecodingMap = new Map(decodingMap).set(activeIcon, letter);
      setDecodingMap(updatedDecodingMap);
      updateKeyRows(updatedDecodingMap);
      setActiveIcon(getNextIconName());
    }
  }

  // Use effect to listen to key presses
  if (!sizing.isMobile) {
    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        const letter = event.key.toLowerCase();
        if (letter >= "a" && letter <= "z") {
          reactToKeyPress(letter);
        }
      };

      window.addEventListener("keydown", handleKeyPress);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [activeIcon, decodingMap, quoteIndex]);
  }

  return (
    <SafeAreaView style={mainWindowStyles.container}>
      <View style={mainWindowStyles.topBarContainer}>
        <Text style={mainWindowStyles.title}>Codiac</Text>
        <View style={mainWindowStyles.topBarIconContainer}>
          <TouchableOpacity style={mainWindowStyles.iconContainer}>
            <Ionicons
              name={"refresh-outline"}
              size={32}
              color="black"
              onPress={() => {
                setDecodingMap(new Map());
                updateKeyRows(new Map());
              }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={mainWindowStyles.iconContainer}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
      </View>
      <WordDisplay
        quote={encodedQuote}
        setQuoteIndex={setQuoteIndex}
        decodingMap={decodingMap}
        setDecodingMap={setDecodingMap}
        showSpaces={showSpaces}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
        updateKeyRows={updateKeyRows}
      />
      <LetterKeyboardDisplay
        reactToKeyPress={reactToKeyPress}
        quoteIndex={quoteIndex}
        encodedQuote={encodedQuote}
        setQuoteIndex={setQuoteIndex}
        decodingMap={decodingMap}
        setDecodingMap={setDecodingMap}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
        keyRows={keyRows}
        updateKeyRows={updateKeyRows}
      />
    </SafeAreaView>
  );
};

export default CodiacApp;
