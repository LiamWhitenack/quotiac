import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import sizing from "../sizing/sizing";
import GameState from "@/state/state";
import { splitOnPercent, wrapWords } from "@/sizing/wrap-words";
import styles from "./styles";

function getIcons(state: GameState, updateState: () => void) {
  const miniIconSize = sizing.iconSize * 0.7;
  const renderSpace = (key: string) => (
    <View key={key} style={{ height: miniIconSize, width: miniIconSize }} />
  );

  const renderIcon = (iconName: string, key: string) => (
    <View
      key={key}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: miniIconSize,
        width: miniIconSize,
      }}
    >
      <Ionicons
        name={iconName as any}
        size={miniIconSize * 0.8}
        color={"black"}
      />
    </View>
  );
  const renderHint = (iconName: string, key: string) => (
    <View
      key={key}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: miniIconSize,
        width: miniIconSize,
      }}
    >
      {/* <Ionicons
        name={iconName as any}
        size={miniIconSize * 0.8}
        color="green"
        style={{ position: "absolute", top: 0, left: 0 }}
      /> */}
      <Ionicons
        name="bulb"
        size={miniIconSize * 0.8}
        color="yellow"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <Ionicons
        name="bulb-outline"
        size={miniIconSize * 0.8}
        color="black"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </View>
  );

  const quote = wrapWords(
    state.puzzle.stringToEncrypt.split(" "),
    (sizing.maxWidth / sizing.iconSize) * 0.7
  )
    .split("")
    .map((char) => state.encodingMap.get(char.toLowerCase()) ?? char);
  return (
    <View>
      {splitOnPercent(quote).map((line, lineIndex) => {
        return (
          <View
            key={`line-${lineIndex}`}
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            {line.map((element, charIndex) => {
              const key = `line-${lineIndex}-char-${charIndex}`;

              if (element === " ") {
                return renderSpace(key);
              } else if (
                state.givenHintLetters.includes(
                  state.decodingMap.get(element) ?? ""
                )
              ) {
                return renderHint(element, key);
              } else if (element.length > 1) {
                return renderIcon(element, key);
              }
            })}
          </View>
        );
      })}
    </View>
  );
}

export default getIcons;
