import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import sizing from "../sizing/sizing";
import GameState from "@/state/state";

function getIcons(
  state: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
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
      <TouchableOpacity disabled={state.solved}>
        <Text style={{ fontSize: sizing.iconSize / 1.2 }}>{letter}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderIcon = (iconName: string, index: number) => (
    <View
      key={iconName + index}
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
          let stateCopy = state.clone();
          setGameState(stateCopy);
        }}
      />
    </View>
  );

  const decodedQuote = decodeQuote(state.encodedQuote);

  return decodedQuote.map((element, index) => {
    if (element === " ") {
      return renderSpace(`space-${index}`);
    } else if (element.length === 1) {
      return renderLetter(element, `letter-${index}`);
    } else {
      return renderIcon(element, index);
    }
  });
}

export default getIcons;
