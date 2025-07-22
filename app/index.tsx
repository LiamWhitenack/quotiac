import QuotiacGame from "@/App";
import { ThemeProvider } from "@/src/theme/ThemeContext";
import React, { useState } from "react";
import { View, Text } from "react-native";
import GameState from "@/src/state/state";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppBootstrap, useFetchPuzzle, useRouteDateSync } from "./hooks";
import { TutorialScreen } from "@/src/tutorial/welcome";

export default function Index() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [routeDate, setRouteDate] = useState<string | undefined>(undefined);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState<boolean | null>(null);
  const navigation = useNavigation();

  useAppBootstrap(setFontsLoaded, setHasSeenTutorial);
  useRouteDateSync(routeDate, setRouteDate, navigation);
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
      {/* @ts-ignore */}
      <QuotiacGame state={gameState} setGameState={setGameState} />
    </ThemeProvider>
  );
}
