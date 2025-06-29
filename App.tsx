import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { createMainWindowStyles } from "./styles";
import QuoteDisplay from "./quote-display/quote-display";
import LetterKeyboardDisplay from "./keyboard/keyboard";
import { Ionicons } from "@expo/vector-icons";
import sizing from "./sizing/sizing";
import ConfettiCannon from "react-native-confetti-cannon";
import GameState from "./state/state";
import { todayQuote } from "./puzzles/get-puzzle";
import PuzzleCompleteModal from "./puzzle-complete-modal/modal";
import { useTitleFade, useAnimatedValue } from "./app-effects/title-fade";
import {
  useOnCompleteModal,
  usePuzzleDetailsModal,
} from "./app-effects/show-modal";
import { useTheme } from "./theme/ThemeContext";
import ShowPuzzleInfoButton from "./puzzle-info-modal/button";
import PuzzleDetailsModal from "./puzzle-info-modal/skeleton";

const CodiacApp = () => {
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [puzzleDetailsModalVisible, setPuzzleDetailsModalVisible] =
    useState(false);
  const fadeTitleAnimation = useRef(new Animated.Value(1)).current;
  const [showAppTitle, setShowAppTitle] = useState(true);
  const fadeValue = useAnimatedValue(fadeTitleAnimation);

  // Get current theme from provider
  const { theme, mode } = useTheme();

  // Initialize game state
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

  useTitleFade(fadeTitleAnimation, showAppTitle, setShowAppTitle);
  useOnCompleteModal(state, setCompletionModalVisible);

  // Conditional render with view or safe area view based on platform
  const Wrapper = sizing.isMobile ? SafeAreaView : View;

  // Create styles using theme
  const mainWindowStyles = createMainWindowStyles(theme);

  return (
    <>
      <StatusBar
        barStyle={mode === "light" ? "dark-content" : "light-content"}
        backgroundColor={theme.background}
      />
      <Wrapper
        style={[
          mainWindowStyles.container,
          !sizing.isMobile && { padding: 20 },
        ]}
      >
        <View style={mainWindowStyles.topBarContainer}>
          <Animated.View
            style={[mainWindowStyles.title, { opacity: Math.abs(fadeValue) }]}
          >
            {fadeValue > 0 ? (
              <Text style={mainWindowStyles.title}>Codiac</Text>
            ) : (
              <ShowPuzzleInfoButton
                state={state}
                onPressed={setPuzzleDetailsModalVisible}
              />
            )}
          </Animated.View>

          <View style={mainWindowStyles.topBarIconContainer}>
            <TouchableOpacity
              style={mainWindowStyles.iconContainer}
              onPress={() => {
                state.giveAHint();
                updateState();
              }}
            >
              <View style={{ position: "relative", width: 32, height: 32 }}>
                <Ionicons
                  name="bulb-outline"
                  size={32}
                  color={theme.lightBulbBorder}
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={mainWindowStyles.iconContainer}>
              <Ionicons
                name={"refresh-outline"}
                size={32}
                color={theme.text}
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
        <LetterKeyboardDisplay
          state={state}
          updateState={updateState}
          mode={mode}
        />

        <PuzzleCompleteModal
          state={state}
          visible={completionModalVisible}
          onClose={() => {
            setCompletionModalVisible(false);
          }}
        />
        <PuzzleDetailsModal
          state={state}
          visible={puzzleDetailsModalVisible}
          onClose={() => {
            setPuzzleDetailsModalVisible(false);
          }}
        />
      </Wrapper>
    </>
  );
};

export default CodiacApp;
