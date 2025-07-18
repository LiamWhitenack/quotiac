import QuotiacGame from "@/App";
import { ThemeProvider } from "../theme/ThemeContext";
import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button } from "react-native";
import sizing from "@/sizing/sizing";
import GameState from "@/state/state";
import { fetchTodayQuote } from "@/puzzles/get-puzzle";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🎬 Load fonts + tutorial status
function useAppBootstrap(
  setFontsLoaded: (loaded: boolean) => void,
  setHasSeenTutorial: (val: boolean) => void
) {
  useEffect(() => {
    const init = async () => {
      await Font.loadAsync({
        Ionicons: require("@/assets/fonts/Ionicons.ttf"),
      });
      setFontsLoaded(true);

      const val = await AsyncStorage.getItem("hasSeenTutorial");
      setHasSeenTutorial(val === "true");
    };

    init();
  }, []);
}

// 📆 Sync route date with URL — only once
function useRouteDateSync(
  routeDate: string | undefined,
  setRouteDate: (date: string) => void,
  setHasCheckedURL: (checked: boolean) => void,
  navigation: any
) {
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) return;

    const extractDateFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const maybeDate = params.get("date");
      return maybeDate && /^\d{8}$/.test(maybeDate) ? maybeDate : null;
    };

    const initializeRouteDate = () => {
      const urlDate = extractDateFromURL();
      setHasCheckedURL(true);

      if (urlDate) {
        setRouteDate(urlDate);
        navigation.setParams({ date: urlDate });
      } else {
        const now = new Date();
        const today = now.toISOString().slice(0, 10).replace(/-/g, "");
        setRouteDate(today);
        navigation.setParams({ date: today });
      }

      hasInitializedRef.current = true;
    };

    initializeRouteDate();

    if (!sizing.isMobile) {
      window.addEventListener("popstate", initializeRouteDate);
      return () => window.removeEventListener("popstate", initializeRouteDate);
    }
  }, [navigation, routeDate, setRouteDate, setHasCheckedURL]);
}

// 🧩 Load puzzle from backend — only once per routeDate
function useFetchPuzzle(
  routeDate: string | undefined,
  setGameState: (state: GameState) => void
) {
  const lastFetchedDateRef = useRef<string | null>(null);

  useEffect(() => {
    if (!routeDate || lastFetchedDateRef.current === routeDate) return;

    lastFetchedDateRef.current = routeDate;
    fetchTodayQuote(routeDate).then((puzzle) => {
      setGameState(new GameState(puzzle));
    });
  }, [routeDate, setGameState]);
}

// 👋 Tutorial screen
function TutorialScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        👋 Welcome to Quotiac!
      </Text>
      <Text
        style={{ textAlign: "center", paddingHorizontal: 40, marginBottom: 30 }}
      >
        This quick tutorial will walk you through how to play. (Placeholder)
      </Text>
      <Button title="Get Started" onPress={onComplete} />
    </View>
  );
}

// 🌟 Main entry component
export default function Index() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [routeDate, setRouteDate] = useState<string | undefined>(undefined);
  const [hasCheckedURL, setHasCheckedURL] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState<boolean | null>(null);
  const navigation = useNavigation();

  useAppBootstrap(setFontsLoaded, setHasSeenTutorial);
  useRouteDateSync(routeDate, setRouteDate, setHasCheckedURL, navigation);
  useFetchPuzzle(routeDate, setGameState);

  const handleTutorialComplete = async () => {
    await AsyncStorage.setItem("hasSeenTutorial", "true");
    setHasSeenTutorial(true);
  };

  if (!fontsLoaded || hasSeenTutorial === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!hasSeenTutorial) {
    return <TutorialScreen onComplete={handleTutorialComplete} />;
  }

  if (!gameState) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading puzzle...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <QuotiacGame state={gameState} setGameState={setGameState} />
    </ThemeProvider>
  );
}
