import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styles from "./styles";
import sizing from "../sizing/sizing";
import getIcons from "./get-icons";
import GameState from "@/state/state";

interface QuoteDisplayProps {
  state: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ state, setGameState }) => {
  // ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  // const numberOfIconsInColumn = sizing.quoteHeight / sizing.iconSize;
  const numberOfIconsInRow = sizing.maxWidth - 20 / sizing.iconSize; // Subtract 20 to account for 10px padding
  console.log(numberOfIconsInRow);

  // Dynamic sized display
  const { height, width } = useWindowDimensions();
  sizing.screenHeight = height;
  sizing.screenWidth = width;

  const displayQuote = getIcons(state, setGameState);

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
              <TouchableOpacity key={index} disabled={state.solved}>
                <Text>{element}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
  return putIconsInBoxes(displayQuote);
};

export default QuoteDisplay;
