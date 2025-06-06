import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styles from "./styles";
import sizing from "../sizing/sizing";
import getIcons from "./get-icons";

interface QuoteDisplayProps {
  quote: string[];
  setQuoteIndex: (index: number) => void;
  decodingMap: Map<string, string>;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
  solved: boolean;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
  quote,
  setQuoteIndex,
  decodingMap,
  activeIcon,
  setActiveIcon,
  solved,
}) => {
  // ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  // const numberOfIconsInColumn = sizing.quoteHeight / sizing.iconSize;
  const numberOfIconsInRow = sizing.maxWidth - 20 / sizing.iconSize; // Subtract 20 to account for 10px padding
  console.log(numberOfIconsInRow);

  // Dynamic sized display
  const { height, width, scale, fontScale } = useWindowDimensions();
  sizing.screenHeight = height;
  sizing.screenWidth = width;

  const display_quote = getIcons(
    quote,
    decodingMap,
    solved,
    activeIcon,
    setActiveIcon,
    setQuoteIndex
  );

  function putIconsInBoxes(display_quote: React.JSX.Element[]) {
    return (
      <View style={styles.verticalContainer}>
        <View style={styles.horizontalContainer}>
          {display_quote.map((element, index) => (
            <View
              key={index}
              style={{
                width: sizing.iconSize,
                height: sizing.iconSize,
              }}
            >
              <TouchableOpacity key={index} disabled={solved}>
                <Text>{element}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
  return putIconsInBoxes(display_quote);
};

export default QuoteDisplay;
