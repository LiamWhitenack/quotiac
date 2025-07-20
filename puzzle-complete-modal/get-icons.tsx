import { View } from "react-native";
import sizing from "../sizing/sizing";
import GameState from "@/state/state";
import { splitOnPercent, wrapWords } from "@/sizing/wrap-words";
import type { Theme } from "@/theme/themes";
import CustomIonicons from "@/src/custom-icons";

// Define fallback/default colors here
const defaultTheme = {
  text: "#000", // default icon color
  lightBulbFill: "#FFD700", // default bulb fill (gold)
  lightBulbBorder: "#000", // default bulb border (black)
};

function getIcons(state: GameState, theme: Partial<Theme> = {}) {
  state.puzzle.encodingMap
  const noThemePassed = Object.keys(theme).length === 0;
  const resolvedTheme = { ...defaultTheme, ...theme };

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
      <CustomIonicons
        name={iconName as any}
        size={miniIconSize * 0.8}
        color={resolvedTheme.text}
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
      <CustomIonicons
        name={iconName as any}
        size={miniIconSize * 0.8}
        color="green"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </View>
  );

  const words = state.puzzle.stringToEncrypt.split(" ");
  const uniqueChars = Array.from(state.encodingMap.keys());
  const maxLength = noThemePassed
    ? Math.max(10, Math.max(...uniqueChars.map((s) => s.length)))
    : (sizing.maxWidth / sizing.iconSize) * 0.8;

  const quote = wrapWords(uniqueChars, maxLength, true)
    .split("")
    .map((char) => state.encodingMap.get(char) ?? char);

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
