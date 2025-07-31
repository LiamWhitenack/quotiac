import QuotiacGame from "@/App";
import { ThemeProvider } from "@/src/theme/ThemeContext";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GameState from "@/src/state/state";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppBootstrap, useFetchPuzzle, useRouteDateSync } from "./hooks";

export default function Index() {
    const [showGame, setShowGame] = useState(false);

    if (showGame) {
        return <App />;
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
                onPress={() => setShowGame(true)}
                style={{
                    backgroundColor: "#333",
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: "white", fontSize: 18 }}>Play</Text>
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
