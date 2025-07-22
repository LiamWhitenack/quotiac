import React, { useState } from "react";
import { View, Text, Button, Touchable, TouchableOpacity } from "react-native";
import { createAppStyles } from "../theme/styles";
import { useTheme } from "../theme/ThemeContext";
import QuotiacGame from "@/App";
import { useFetchTutorial } from "@/app/hooks";
import GameState from "../state/state";

export function TutorialScreen({ onComplete }: { onComplete: () => void }) {
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [gameState, setGameState] = useState<GameState | null>(null);
  useFetchTutorial(setGameState);

  if (!gameState) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading puzzle...</Text>
      </View>
    );
  }
  // https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/main/resources/tutorial.json
  if (welcomeScreen) return <WelcomeScreen onComplete={setWelcomeScreen} />;
  return <QuotiacGame state={gameState} setGameState={setGameState} />;
}
export function WelcomeScreen({
  onComplete,
}: {
  onComplete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { theme } = useTheme();
  const appStyles = createAppStyles(theme);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Welcome to Quotiac!
      </Text>
      <TouchableOpacity
        style={appStyles.elevatedButton}
        onPress={() => {
          onComplete(false);
        }}
      >
        <Text style={appStyles.elevatedButtonText}>Start Tutorial</Text>
      </TouchableOpacity>
    </View>
  );
}
