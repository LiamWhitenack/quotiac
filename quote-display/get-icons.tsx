import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import sizing from "../sizing/sizing";
import GameState from "@/state/state";
import { splitOnPercent } from "@/sizing/wrap-words";

function getIcons(state: GameState, updateState: () => void) {
  const decodeQuote = (quote: string[]): string[] => {
    return quote.map((char) => state.decodingMap.get(char) ?? char);
  };

  const renderSpace = (key: string) => (
    <View
      key={key}
      style={{ height: sizing.iconSize, width: sizing.iconSize / 2 }}
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
      <TouchableOpacity
        disabled={state.solved}
        onPress={() => {
          state.reactToKeyPress(letter);
          updateState();
        }}
      >
        <Text style={{ fontSize: sizing.iconSize / 1.2 }}>{letter}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderNonLetterCharacter = (char: string, key: string) => (
    <View
      key={key}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: sizing.iconSize,
        width: sizing.iconSize / 2,
      }}
    >
      <Text style={{ fontSize: sizing.iconSize / 1.2 }}>{char}</Text>
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
        size={sizing.iconSize / 1.2}
        color={iconName === state.activeIcon ? "blue" : "black"}
        onPress={() => {
          state.reactToQuoteIconPress(index, iconName);
          updateState();
        }}
      />
    </View>
  );

  const decodedQuote = decodeQuote(state.encodedQuote);

  return (
    <View>
      {splitOnPercent(decodedQuote).map((line, lineIndex) => (
        <View
          key={`line-${lineIndex}`}
          style={{ flexDirection: "row", justifyContent: "center" }}
        >
          {line.map((element, charIndex) => {
            const key = `line-${lineIndex}-char-${charIndex}`;
            const flatIndex = lineIndex * 1000 + charIndex; // ensure unique and stable keys for icons

            if (element === " ") {
              return renderSpace(key);
            } else if (element.length === 1) {
              if (element >= "A" && element <= "Z") {
                return renderLetter(element, key);
              } else {
                return renderNonLetterCharacter(element, key);
              }
            } else {
              return renderIcon(element, key, flatIndex);
            }
          })}
        </View>
      ))}
    </View>
  );
}

export default getIcons;
