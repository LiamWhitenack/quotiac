import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import sizing from "../sizing/sizing";
import { splitOnPercent } from "@/src/sizing/wrap-words";
import CustomIonicons from "@/src/custom-icons";
import type { Theme } from "@/src/theme/themes";
import { useTheme } from "../theme/ThemeContext";

export function TutorialIcons() {
  const { theme } = useTheme();
  const quote = "I think, therefore I am.";

  const encodingEntries: [string, string][] = [
    ["i", "eye"],
    ["t", "t"],
    ["h", "hammer"],
    ["n", "nuclear"],
    ["k", "key"],
    ["e", "egg"],
    ["r", "radio"],
    ["f", "fish"],
    ["o", "open"],
    ["a", "airplane"],
    ["m", "map"],
  ];

  const [decodingMap, setDecodingMap] = useState<Map<string, string>>(
    () => new Map(encodingEntries)
  );
  const [stepIndex, setStepIndex] = useState(0);

  const hintLetter = "t";
  let selectedIcon: string = "";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (stepIndex < encodingEntries.length) {
      timeout = setTimeout(() => {
        const [letterToDecode] = encodingEntries[stepIndex];
        setDecodingMap((prev) => {
          const newMap = new Map(prev);
          newMap.delete(letterToDecode); // Reveal the letter
          return newMap;
        });
        setStepIndex(stepIndex + 1);
      }, 500);
    } else {
      // Animation finished — wait 2s and restart
      timeout = setTimeout(() => {
        setDecodingMap(new Map(encodingEntries)); // Reset icons
        setStepIndex(0);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [stepIndex]);

  const decodeQuote = (quote: string): string[] => {
    return quote
      .split("")
      .map((char) => decodingMap.get(char.toLowerCase()) ?? char);
  };

  const renderSpace = (key: string) => (
    <View
      key={key}
      style={{ height: sizing.iconSize, width: sizing.iconSize }}
    />
  );

  const renderLetter = (letter: string, key: string) => (
    <View
      key={key}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: sizing.iconSize,
        width: sizing.iconSize,
      }}
    >
      <Text
        style={{
          fontSize: sizing.iconSize * 0.8,
          color: letter === hintLetter ? theme.hint : theme.text,
        }}
      >
        {letter.toUpperCase()}
      </Text>
    </View>
  );

  const renderIcon = (iconName: string, key: string) => (
    <View
      key={key}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: sizing.iconSize,
        width: sizing.iconSize,
      }}
    >
      <CustomIonicons
        // @ts-ignore
        name={iconName}
        size={sizing.iconSize * 0.8}
        color={iconName === selectedIcon ? theme.selected : theme.text}
      />
    </View>
  );

  const renderNonLetterCharacter = (char: string, key: string) => (
    <View
      key={key}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: sizing.iconSize,
        width: char === "%" ? sizing.iconSize / 1 : sizing.iconSize / 2,
      }}
    >
      <Text style={{ fontSize: sizing.iconSize * 0.8, color: theme.text }}>
        {char}
      </Text>
    </View>
  );

  const decodedQuote = decodeQuote(quote);

  return splitOnPercent(decodedQuote).map((line, lineIndex) => (
    <View
      key={`line-${lineIndex}`}
      style={{ flexDirection: "row", justifyContent: "center" }}
    >
      {line.map((element, charIndex) => {
        const key = `line-${lineIndex}-char-${charIndex}`;
        if (element === " ") {
          return renderSpace(key);
        } else if (element.length === 1) {
          if (element.toLowerCase() >= "a" && element.toLowerCase() <= "z") {
            return renderLetter(element, key);
          } else {
            return renderNonLetterCharacter(element, key);
          }
        } else {
          return renderIcon(element, key);
        }
      })}
    </View>
  ));
}

export default TutorialIcons;
