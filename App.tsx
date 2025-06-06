import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import mainWindowStyles from "./styles";
import QuoteDisplay from "./quote-display/quote-display";
import LetterKeyboardDisplay from "./keyboard/keyboard";
import { Ionicons } from "@expo/vector-icons";
import KEYBOARD_LETTERS from "./src/keyboard-letters";
import puzzle from "./src/quotes";
import sizing from "./sizing/sizing";
import ConfettiCannon from "react-native-confetti-cannon";
import { mapsAreEqual } from "./src/utils";
import { mapUniqueLettersToNumbers } from "./src/encoded-quotes";

function inverseMap(map: Map<string, string>): Map<string, string> {
  const inverseDecodingMap = new Map<string, string>();
  map.forEach((value, key) => {
    inverseDecodingMap.set(value, key);
  });
  return inverseDecodingMap;
}
function capitalizeValues(map: Map<string, string>): Map<string, string> {
  const res = new Map<string, string>();
  map.forEach((value, key) => {
    res.set(key, value.toUpperCase());
  });
  return res;
}

const CodiacApp = () => {
  const [encodingMap, setEncodingMap] = useState(
    mapUniqueLettersToNumbers(puzzle.quote)
  );
  const [fireConfetti, setFireConfetti] = useState(false);
  const solution = capitalizeValues(inverseMap(encodingMap));
  const [solved, setSolved] = useState(false);
  const [decodingMap, setDecodingMap] = useState<Map<string, string>>(
    new Map()
  );
  const [activeIcon, setActiveIcon] = useState("");
  const [keyRows, setKeyRows] = useState(KEYBOARD_LETTERS);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const encodeQuote = (input: string): string[] => {
    return input
      .split("")
      .map((char) => {
        if (char === " ") {
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
      if (i <= quoteIndex || iconName === " " || iconName === activeIcon) {
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

  function reactToKeyPress(element: string) {
    if (solved) {
      return;
    }
    // if no key is selected
    if (element >= "A" && element <= "Z") {
      // add letter mapping
      if (
        // if that letter has already been used
        Array.from(decodingMap.values()).includes(element)
      ) {
        // remove letter mapping
        const icon = [...decodingMap].find(([k, v]) => v === element)?.[0];
        if (icon === undefined) {
          throw Error;
        }
        decodingMap.delete(icon);
        setDecodingMap(decodingMap);
        updateKeyRows(decodingMap);
        setActiveIcon(icon);
        setQuoteIndex(encodedQuote.indexOf(icon));
      } else if (activeIcon !== "") {
        // remove letter mapping
        decodingMap.set(activeIcon, element);
        setDecodingMap(decodingMap);
        updateKeyRows(decodingMap);
        setActiveIcon(getNextIconName());
      }
    } else {
      // remove letter mapping
      decodingMap.delete(element);
      setDecodingMap(decodingMap);
      updateKeyRows(decodingMap);
      setActiveIcon(element);
      setQuoteIndex(encodedQuote.indexOf(element));
    }

    if (mapsAreEqual(decodingMap, solution)) {
      setFireConfetti(true);
      setSolved(true);
    }
  }

  // Use effect to listen to key presses

  useEffect(() => {
    if (!sizing.isMobile) {
      const handleKeyPress = (event: KeyboardEvent) => {
        reactToKeyPress(event.key.toUpperCase());
      };

      window.addEventListener("keydown", handleKeyPress);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }); //, [activeIcon, decodingMap, quoteIndex, reactToKeyPress]);

  return (
    <SafeAreaView style={mainWindowStyles.container}>
      <View style={mainWindowStyles.topBarContainer}>
        <Text style={mainWindowStyles.title}>Codiac</Text>
        <View style={mainWindowStyles.topBarIconContainer}>
          <TouchableOpacity
            style={mainWindowStyles.iconContainer}
            disabled={solved}
          >
            <Ionicons
              name={"refresh-outline"}
              size={32}
              color="black"
              onPress={() => {
                setDecodingMap(new Map());
                updateKeyRows(new Map());
                setSolved(false);
                setFireConfetti(false); // reset confetti
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {fireConfetti && (
        <ConfettiCannon count={100} origin={{ x: 200, y: 0 }} fadeOut />
      )}

      <QuoteDisplay
        quote={encodedQuote}
        setQuoteIndex={setQuoteIndex}
        decodingMap={decodingMap}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
        solved={solved}
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
        solved={solved}
      />
    </SafeAreaView>
  );
};

export default CodiacApp;
