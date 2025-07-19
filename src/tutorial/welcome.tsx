import React from "react";
import { View, Text, Button, Touchable, TouchableOpacity } from "react-native";
import { createAppStyles } from "../theme/styles";
import { useTheme } from "../theme/ThemeContext";

export function TutorialScreen({ onComplete }: { onComplete: () => void }) {
  const { theme } = useTheme();
  const appStyles = createAppStyles(theme);
  // https://raw.githubusercontent.com/LiamWhitenack/codiac-puzzles/main/resources/tutorial.json
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Welcome to Quotiac!
      </Text>
      <Text
        style={{ textAlign: "center", paddingHorizontal: 40, marginBottom: 30 }}
      >
        This quick tutorial will walk you through how to play. Press the button
        to get started!
      </Text>
      <TouchableOpacity style={appStyles.elevatedButton} onPress={onComplete}>
        <Text style={appStyles.elevatedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
