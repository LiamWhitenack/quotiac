import QuotiacGame from "@/App";
import { ThemeProvider, useTheme } from "@/src/theme/ThemeContext";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GameState from "@/src/state";
import { useNavigation } from "@react-navigation/native";
import { createAppStyles } from "@/src/theme/styles";
import { fetchTodayQuote } from "@/src/puzzles/get-puzzle";
import { todayString } from "@/src/utils";
import { useAppBootstrap, useRouteDateSync } from "@/src/hooks";

export default function Index() {
    const [showGame, setShowGame] = useState(false);
    const [eagerState, setEagerState] = useState<GameState | null>(null);
    const { theme } = useTheme();
    const styles = createAppStyles(theme);

    const fixedDate = todayString();

    // Eagerly fetch puzzle for today
    useEffect(() => {
        (async () => {
            try {
                const puzzle = await fetchTodayQuote(fixedDate);
                const gameState = await GameState.create(fixedDate, puzzle);
                setEagerState(gameState);
            } catch (error) {
                console.error("Error eagerly fetching puzzle:", error);
            }
        })();
    }, [fixedDate]);

    if (showGame) {
        return <App eagerState={eagerState} fixedDate={fixedDate} />;
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

type AppProps = {
    eagerState: GameState | null;
    fixedDate: string;
};

function App({ eagerState, fixedDate }: AppProps) {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [routeDate, setRouteDate] = useState<string | undefined>(undefined);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    useAppBootstrap(setFontsLoaded);
    useRouteDateSync(routeDate, setRouteDate, navigation);

    useEffect(() => {
        if (!routeDate) return;

        const maybeUseEagerState = async () => {
            if (routeDate === fixedDate && eagerState) {
                setGameState(eagerState);
            } else {
                // fallback to fetching puzzle as usual
                const puzzle = await fetchTodayQuote(routeDate);
                const newState = await GameState.create(routeDate, puzzle);
                setGameState(newState);
            }
        };

        maybeUseEagerState();
    }, [routeDate, eagerState, fixedDate]);

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

