import QuotiacGame from "@/App";
import { ThemeProvider, useTheme } from "@/src/theme/ThemeContext";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GameState from "@/src/state";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppBootstrap, useFetchPuzzle, useRouteDateSync } from "@/src/hooks";
import { createAppStyles } from "@/src/theme/styles";

export default function Index() {
    const [showGame, setShowGame] = useState(false);
    const { theme } = useTheme();
    const styles = createAppStyles(theme);

    if (showGame) {
        return <App />;
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
                onPress={() => setShowGame(true)}
                style={styles.elevatedButton}
            >
                <Text style={styles.elevatedButtonText}>Play</Text>
            </TouchableOpacity>
        </View>
    );
}

function App() {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [routeDate, setRouteDate] = useState<string | undefined>(undefined);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    useAppBootstrap(setFontsLoaded);
    useRouteDateSync(routeDate, setRouteDate, navigation);
    useFetchPuzzle(routeDate, setGameState);

    if (!fontsLoaded || !gameState) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
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
