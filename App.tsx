import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import mainWindowStyles from "./styles";
import QuoteDisplay from "./quote-display/quote-display";
import LetterKeyboardDisplay from "./keyboard/keyboard";
import { Ionicons } from "@expo/vector-icons";
import sizing from "./sizing/sizing";
import ConfettiCannon from "react-native-confetti-cannon";
import GameState from "./state/state";
import { todayQuote } from "./puzzles/get-puzzle";
import PuzzleCompleteModal from "./puzzle-complete-modal/modal";
import useTitleFade from "./app-effects/title-fade";
import useOnCompleteModal from "./app-effects/show-modal";
import { StatusBar } from "react-native";

const CodiacApp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const fadeTitleAnimation = useRef(new Animated.Value(1)).current;
  const [state, setGameState] = useState(new GameState(todayQuote()));

  function updateState() {
    let clone = state.clone();
    setGameState(clone);
  }

  // Use effect to listen to key presses
  useEffect(() => {
    if (!sizing.isMobile) {
      const handleKeyPress = (event: KeyboardEvent) => {
        const key = event.key;

        if (key === "ArrowLeft") {
          state.setActiveIcon(state.getNextIconName(true));
        } else if (key === "ArrowRight") {
          state.setActiveIcon(state.getNextIconName());
        } else if (/^[a-z]$/i.test(key)) {
          state.reactToKeyboardPress(key.toUpperCase());
        } else {
          return; // ignore unrecognized keys
        }

        updateState();
      };

      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  });
  //, [activeIcon, decodingMap, quoteIndex, reactToKeyPress]);

  useTitleFade(fadeTitleAnimation, state, setGameState);
  useOnCompleteModal(state, setModalVisible);

  // Conditional render with view or safe area view based on platform
  const Wrapper = sizing.isMobile ? SafeAreaView : View;

  return (
    <>
      <StatusBar barStyle="dark-content" /> {/* This is needed to make the iPhone status bar dark colored */}
      <Wrapper style={[
        mainWindowStyles.container,
        !sizing.isMobile && { padding: 20 },
      ]}
      >
        <View style={mainWindowStyles.topBarContainer}>
          <Animated.Text
            style={[mainWindowStyles.title, { opacity: fadeTitleAnimation }]}
          >
            {state.showAppTitle ? "Codiac" : state.puzzle.puzzleType}
          </Animated.Text>
          <View style={mainWindowStyles.topBarIconContainer}>
            <TouchableOpacity style={mainWindowStyles.iconContainer}>
              <Ionicons
                name={"bulb-outline"}
                size={32}
                color="black"
                onPress={() => {
                  state.giveAHint();
                  updateState();
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={mainWindowStyles.iconContainer}>
              <Ionicons
                name={"refresh-outline"}
                size={32}
                color="black"
                onPress={() => {
                  if (state.solved) {
                    state.givenHintLetters.length = 0;
                  }
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
        {
          <PuzzleCompleteModal
            state={state}
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
          />
        }
      </Wrapper>
    </>
  );
};

export default CodiacApp;
