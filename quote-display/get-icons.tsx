import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import sizing from "../sizing/sizing";

function getIcons(
  quote: string[],
  decodingMap: Map<string, string>,
  solved: boolean,
  activeIcon: string,
  setActiveIcon: (icon: string) => void,
  setQuoteIndex: (index: number) => void
) {
  const decodeQuote = (quote: string[]): string[] => {
    return quote.map((char) => decodingMap.get(char) ?? char);
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
      <TouchableOpacity disabled={solved}>
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
        color={iconName === activeIcon ? "blue" : "black"}
        onPress={() => {
          if (activeIcon === iconName) {
            setActiveIcon("");
          } else {
            setQuoteIndex(index);
            setActiveIcon(iconName);
          }
        }}
      />
    </View>
  );

  const decodedQuote = decodeQuote(quote);

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
