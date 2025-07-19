import React from "react";
import { View, Text, Button } from "react-native";

export function TutorialScreen({ onComplete }: { onComplete: () => void }) {
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
      <Button title="Get Started" onPress={onComplete} />
    </View>
  );
}
