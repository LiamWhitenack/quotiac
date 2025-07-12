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
import { fetchTodayQuote } from "./puzzles/get-puzzle";
import PuzzleCompleteModal from "./puzzle-complete-modal/modal";
import { useTitleFade, useAnimatedValue } from "./app-effects/title-fade";
import { useOnCompleteModal } from "./app-effects/show-modal";
import { useTheme } from "./theme/ThemeContext";
import ShowPuzzleInfoButton from "./puzzle-info-modal/button";
import PuzzleDetailsModal from "./puzzle-info-modal/skeleton";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AppNavigator"; // adjust path as needed

const CodiacApp = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [routeDate, setRouteDate] = useState<string | undefined>(undefined);
  const [hasCheckedURL, setHasCheckedURL] = useState(false);

  const route = useRoute(); // still useful for initial render
  const navigation = useNavigation();

  // Extract date from the path (e.g., /20250710)
  const extractDateFromPath = () => {
    const params = new URLSearchParams(window.location.search);
    const maybeDate = params.get("date");
    return maybeDate && /^\d{8}$/.test(maybeDate) ? maybeDate : undefined;
  };

  // On first load or popstate, update the date from the URL
  useEffect(() => {
    const updateDateFromURL = () => {
      const urlDate = extractDateFromPath();
      setHasCheckedURL(true);

      if (urlDate && urlDate !== routeDate) {
        setRouteDate(urlDate);
        // @ts-ignore
        navigation.setParams({ date: urlDate });
      }
    };

    updateDateFromURL();
    if (!sizing.isMobile) {
      window.addEventListener("popstate", updateDateFromURL);
      return () => window.removeEventListener("popstate", updateDateFromURL);
    }
  }, [routeDate]);

  // Fallback to today's date only after checking the URL
  useEffect(() => {
    if (!sizing.isMobile && !routeDate && hasCheckedURL) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const dateString = `${year}${month}${day}`;
      setRouteDate(dateString);
      // @ts-ignore
      navigation.setParams({ date: dateString });
    }
  }, [routeDate, hasCheckedURL]);

  // Fetch the puzzle when routeDate is set
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    fetchTodayQuote(routeDate ? routeDate : `${year}${month}${day}`).then(
      (puzzle) => {
        setGameState(new GameState(puzzle));
      }
    );
  }, [routeDate]);

  if (!gameState) {
    // Show loading screen or nothing while fetching puzzle
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading puzzle...</Text>
      </View>
    );
  }
  // @ts-ignore
  return <CodiacGame state={gameState} setGameState={setGameState} />;
};

const CodiacGame = ({
  state,
  setGameState,
}: {
  state: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) => {
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [puzzleDetailsModalDisabled, setPuzzleDetailsModalDisabled] =
    useState(true);
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
              <Text style={mainWindowStyles.title}>Codiac</Text>
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
