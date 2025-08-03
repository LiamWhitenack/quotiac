import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import sizing from "../../../sizing/sizing";
import { splitOnPercent } from "@/src/sizing/wrap-words";
import CustomIonicons from "@/src/custom-icons";
import { useTheme } from "../../../theme/ThemeContext";

export function SolvingDemonstration() {
  const { theme } = useTheme();
  const quote = "a quack,@qujsjfwsj@a bx.";

  const encodingEntries = useMemo(
    () =>
      [
        ["a", "eye"],
        ["q", "tv"],
        ["u", "hammer"],
        ["c", "nuclear"],
        ["k", "key"],
        ["j", "egg"],
        ["s", "radio"],
        ["f", "fish"],
        ["w", "open"],
        ["b", "airplane"],
        ["x", "map"],
      ] as [string, string][],
    []
  );

  const [decodingMap, setEncodingMap] = useState<Map<string, string>>(
    () => new Map(encodingEntries)
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const kIndex = encodingEntries.findIndex(([letter]) => letter === "k");

  const hintLetter = "0";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (direction === "forward") {
      if (stepIndex < encodingEntries.length) {
        const [letterToDecode] = encodingEntries[stepIndex];
        setSelectedLetter(letterToDecode);
        // @ts-ignore
        timeout = setTimeout(() => {
          setEncodingMap((prev) => {
            const newMap = new Map(prev);
            newMap.delete(letterToDecode);
            return newMap;
          });

          if (letterToDecode === "k") {
            setDirection("backward");
          } else {
            setStepIndex(stepIndex + 1);
          }
        }, 1000);
      } else {
        // @ts-ignore
        timeout = setTimeout(() => {
          setEncodingMap(new Map(encodingEntries));
          setStepIndex(0);
          setSelectedLetter(encodingEntries[0][0]);
        }, 2000);
      }
    } else if (direction === "backward") {
      if (stepIndex >= 0) {
        const [letterToRestore, iconToRestore] = encodingEntries[stepIndex];
        // @ts-ignore
        timeout = setTimeout(() => {
          setEncodingMap((prev) => {
            const newMap = new Map(prev);
            newMap.set(letterToRestore, iconToRestore);
            return newMap;
          });
          setSelectedLetter(letterToRestore); // highlight the icon just restored
          setStepIndex(stepIndex - 1);
        }, 1000);
      }
      else {
        // @ts-ignore
        timeout = setTimeout(() => {
          setDirection("forward");
          setStepIndex(0);
          setEncodingMap(new Map(encodingEntries));
          setSelectedLetter(encodingEntries[0][0]);
        }, 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [stepIndex, direction, encodingEntries]);

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
          color={isSelected ? theme.selected : theme.subtext}
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
          const found = encodingEntries.find(([, icon]) => icon === element);
          const originalLetter = found?.[0] ?? "";
          return renderIcon(element, key, originalLetter);
        }
      })}
    </View>
  ));
}

export default SolvingDemonstration;
