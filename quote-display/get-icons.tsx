import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import sizing from "../sizing/sizing";
import GameState from "@/state/state";
import { splitOnPercent } from "@/sizing/wrap-words";
import type { Theme } from "@/theme/themes";

function getIcons(state: GameState, updateState: () => void, theme: Theme) {
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
          color: state.elementColor(letter),
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
        color={state.elementColor(iconName)}
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

export default getIcons;
