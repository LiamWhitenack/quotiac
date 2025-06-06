import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import mainWindowStyles from "./styles";
import QuoteDisplay from "./quote-display/quote-display";
import LetterKeyboardDisplay from "./keyboard/keyboard";
import { Ionicons } from "@expo/vector-icons";
import { puzzle } from "./src/quotes";
import sizing from "./sizing/sizing";
import ConfettiCannon from "react-native-confetti-cannon";
import GameState from "./state/state";

const CodiacApp = () => {
  const [state, setGameState] = useState(new GameState(puzzle));

  // Use effect to listen to key presses

  useEffect(() => {
    if (!sizing.isMobile) {
      const handleKeyPress = (event: KeyboardEvent) => {
        state.reactToKeyPress(event.key.toUpperCase());
        setGameState(state.clone());
      };

      window.addEventListener("keydown", handleKeyPress);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }); //, [activeIcon, decodingMap, quoteIndex, reactToKeyPress]);

  return (
    <SafeAreaView style={mainWindowStyles.container}>
      <View style={mainWindowStyles.topBarContainer}>
        <Text style={mainWindowStyles.title}>Codiac</Text>
        <View style={mainWindowStyles.topBarIconContainer}>
          <TouchableOpacity
            style={mainWindowStyles.iconContainer}
            disabled={state.solved}
          >
            <Ionicons
              name={"refresh-outline"}
              size={32}
              color="black"
              onPress={() => {
                state.reactToResetButton();
                setGameState(state.clone());
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {state.fireConfetti && (
        <ConfettiCannon count={100} origin={{ x: 200, y: 0 }} fadeOut />
      )}

      <QuoteDisplay state={state} setGameState={setGameState} />
      <LetterKeyboardDisplay state={state} setGameState={setGameState} />
    </SafeAreaView>
  );
};

export default CodiacApp;
