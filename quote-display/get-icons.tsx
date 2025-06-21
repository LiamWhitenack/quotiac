import sizing from "../sizing/sizing";
import GameState from "@/state/state";
import { splitOnPercent } from "@/sizing/wrap-words";
import type { Theme } from "@/theme/themes";
import React, { useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Assume sizing is imported or defined elsewhere in your file
// import sizing from './sizing';

interface IconsWithHeightProps {
  state: GameState;
  updateState: () => void;
  theme: Theme;
  containerHeight: number;
}

export function IconsWithHeight({
  state,
  updateState,
  theme,
  containerHeight,
}: IconsWithHeightProps) {
  for (let size = sizing.iconSize; size >= 28; size -= 2) {
    if (containerHeight < state.quoteHeight) {
      console.log(containerHeight, state.quoteHeight);
      state.decreaseQuoteIconSize();
    }
  }

  const decodeQuote = (quote: string[]): string[] => {
    return quote.map((char) => state.decodingMap.get(char) ?? char);
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
        disabled={state.solved || state.elementIsPartOfHint(letter)}
        onPress={() => {
          state.reactToQuoteLetterPress(letter);
          updateState();
        }}
        style={{
          fontSize: sizing.iconSize * 0.8,
          color: state.elementColor(letter, theme),
        }}
      >
        {letter}
      </Text>
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

  const renderIcon = (iconName: string, key: string, index: number) => (
    <View
      key={key}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: sizing.iconSize,
        width: sizing.iconSize,
      }}
    >
      <Ionicons
        // @ts-ignore
        name={iconName}
        size={sizing.iconSize * 0.8}
        color={state.elementColor(iconName, theme)}
        disabled={state.solved || state.elementIsPartOfHint(iconName)}
        onPress={() => {
          state.reactToQuoteIconPress(index, iconName);
          updateState();
        }}
      />
    </View>
  );

  const decodedQuote = decodeQuote(state.encodedQuote);
  let quoteIndex = -2;

  return (
    <View>
      {splitOnPercent(decodedQuote).map((line, lineIndex) => {
        quoteIndex++;
        return (
          <View
            key={`line-${lineIndex}`}
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            {line.map((element, charIndex) => {
              quoteIndex++;
              const key = `line-${lineIndex}-char-${charIndex}`;

              if (element === " ") {
                return renderSpace(key);
              } else if (element.length === 1) {
                if (element >= "A" && element <= "Z") {
                  return renderLetter(element, key);
                } else {
                  return renderNonLetterCharacter(element, key);
                }
              } else {
                return renderIcon(element, key, quoteIndex);
              }
            })}
          </View>
        );
      })}
    </View>
  );
}
