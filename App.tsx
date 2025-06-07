import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import mainWindowStyles from "./styles";
import QuoteDisplay from "./quote-display/quote-display";
import LetterKeyboardDisplay from "./keyboard/keyboard";
import { Ionicons } from "@expo/vector-icons";
import sizing from "./sizing/sizing";
import ConfettiCannon from "react-native-confetti-cannon";
import GameState from "./state/state";
import { todayQuote } from "./puzzles/get-puzzle";

const CodiacApp = () => {
  const [state, setGameState] = useState(new GameState(todayQuote()));

  function updateState() {
    let clone = state.clone();
    setGameState(clone);
  }

  // Use effect to listen to key presses

  useEffect(() => {
    if (!sizing.isMobile) {
      const handleKeyPress = (event: KeyboardEvent) => {
        state.reactToKeyPress(event.key.toUpperCase());
        updateState();
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
        <Text style={mainWindowStyles.title}>{state.puzzle.puzzleType}</Text>
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
                updateState();
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {state.fireConfetti && (
        <ConfettiCannon count={100} origin={{ x: 200, y: 0 }} fadeOut />
      )}

      <QuoteDisplay state={state} updateState={updateState} />
      <LetterKeyboardDisplay state={state} updateState={updateState} />
    </SafeAreaView>
  );
};

export default CodiacApp;
