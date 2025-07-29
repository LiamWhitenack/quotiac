import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import sizing from "../../../sizing/sizing";
import { splitOnPercent } from "@/src/sizing/wrap-words";
import CustomIonicons from "@/src/custom-icons";
import { useTheme } from "../../../theme/ThemeContext";

export function HintDemonstration() {
  const { theme } = useTheme();
  const quote = "I think,@therefore@I am.";

  const encodingEntries = useMemo(
    () =>
      [
        ["t", "tv"],
        ["i", "eye"],
        ["h", "hammer"],
        ["n", "nuclear"],
        ["k", "key"],
        ["e", "egg"],
        ["r", "radio"],
        ["f", "fish"],
        ["o", "open"],
        ["a", "airplane"],
        ["m", "map"],
      ] as [string, string][],
    []
  );

  const [decodingMap, setEncodingMap] = useState<Map<string, string>>(
    () => new Map(encodingEntries)
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const hintLetter = "t";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (stepIndex < encodingEntries.length) {
      const [letterToDecode] = encodingEntries[stepIndex];
      setSelectedLetter(letterToDecode); // highlight current
      // @ts-ignore
      timeout = setTimeout(() => {
        setEncodingMap((prev) => {
          const newMap = new Map(prev);
          newMap.delete(letterToDecode);
          return newMap;
        });
        setStepIndex(stepIndex + 1);
      }, 1000);
    } else {
      // @ts-ignore
      timeout = setTimeout(() => {
        setEncodingMap(new Map(encodingEntries)); // reset
        setStepIndex(0);
        setSelectedLetter(encodingEntries[0][0]); // restart highlight
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [stepIndex, encodingEntries]);

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

  const renderIcon = (
    iconName: string,
    key: string,
    originalLetter: string
  ) => {
    const isSelected = originalLetter === selectedLetter;
    return (
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
          color={isSelected && iconName !== "tv" ? theme.selected : theme.text}
        />
      </View>
    );
  };

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
          // element is the icon name, find the original letter for selection matching
          const found = encodingEntries.find(([, icon]) => icon === element);
          const originalLetter = found?.[0] ?? "";
          return renderIcon(element, key, originalLetter);
        }
      })}
    </View>
  ));
}

export default HintDemonstration;
