import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/src/theme/ThemeContext";

export default function LoadingPage() {
    const { theme } = useTheme();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
            <Text style={{ color: theme.text }}>Loading...</Text>
        </View>
    );
}