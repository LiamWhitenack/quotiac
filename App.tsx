import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  Button,
} from "react-native";
import { createMainWindowStyles } from "./styles";
import QuoteDisplay from "@/src/quote-display/quote-display";
import LetterKeyboardDisplay from "@/src/keyboard/keyboard";
import sizing from "@/src/sizing/sizing";
import ConfettiCannon from "react-native-confetti-cannon";
import GameState from "@/src/state";
import { fetchTodayQuote } from "@/src/puzzles/get-puzzle";
import PuzzleCompleteModal from "@/src/puzzle-complete-modal/modal";
import { useTitleFade, useAnimatedValue } from "@/src/app-effects/title-fade";
import { useOnCompleteModal } from "@/src/app-effects/show-modal";
import { useTheme } from "@/src/theme/ThemeContext";
import ShowPuzzleInfoButton from "@/src/puzzle-info-modal/button";
import PuzzleDetailsModal from "@/src/puzzle-info-modal/skeleton";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import CustomIonicons from "@/src/custom-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpDropdownButton from "./src/help-button/help-button";

const QuotiacGame = ({
  state,
  setGameState,
}: {
  state: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) => {
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [puzzleDetailsModalDisabled, setPuzzleDetailsModalDisabled] =
    useState(false);
  const [puzzleDetailsModalVisible, setPuzzleDetailsModalVisible] =
    useState(false);
  const fadeTitleAnimation = useRef(new Animated.Value(1)).current;
  const [showAppTitle, setShowAppTitle] = useState(true);
  const fadeValue = useAnimatedValue(fadeTitleAnimation);

  const { theme, mode } = useTheme();

  function updateState() {
    const clone = state.clone();
    setGameState(clone);
  }

  useEffect(() => {
    if (!sizing.isMobile) {
      const handleKeyPress = (event: KeyboardEvent) => {
        const key = event.key;

        if (key === "ArrowLeft") {
          state.setActiveIcon(state.getNextIconName(true));
        } else if (key === "ArrowRight") {
          state.setActiveIcon(state.getNextIconName());
        } else if (/^[a-z]$/i.test(key)) {
          state.reactToKeyboardPress(key);
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

  useTitleFade(fadeTitleAnimation, showAppTitle, setShowAppTitle);
  useOnCompleteModal(
    state,
    setCompletionModalVisible,
    setPuzzleDetailsModalDisabled
  );

  const Wrapper = sizing.isMobile ? SafeAreaView : View;
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
              <Text style={mainWindowStyles.title}>Quotiac (Beta)</Text>
            ) : (
              <ShowPuzzleInfoButton
                state={state}
                puzzleDetailsModalDisabled={puzzleDetailsModalDisabled}
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
              disabled={state.givenHintLetters.length == 5}
            >
              <View style={{ position: "relative", width: 32, height: 32 }}>
                <CustomIonicons
                  name="bulb-outline"
                  size={32}
                  color={state.givenHintLetters.length == 5 ? theme.surface : theme.text}
                  style={{ position: "absolute", top: 0, left: 0, marginRight: 5 }}
                />
              </View>
            </TouchableOpacity>
            <HelpDropdownButton />

            {/* <TouchableOpacity style={mainWindowStyles.iconContainer}>
              <CustomIonicons
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
            </TouchableOpacity> */}
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

export default QuotiacGame;
