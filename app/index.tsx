import QuotiacGame from "@/App";
import { ThemeProvider, useTheme } from "@/src/theme/ThemeContext";
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GameState from "@/src/state";
import { useNavigation } from "@react-navigation/native";
import { createAppStyles } from "@/src/theme/styles";
import { fetchTodayQuote } from "@/src/puzzles/get-puzzle";
import { todayString } from "@/src/utils";
import { useAppBootstrap, useRouteDateSync } from "@/src/hooks";



function getDateFromURL(): string | null {
    try {
        const params = new URLSearchParams(window.location.search);
        const maybeDate = params.get("date");
        return maybeDate && /^\d{8}$/.test(maybeDate) ? maybeDate : null;
    } catch {
        return null;
    }
}

export default function Index() {
    const [showGame, setShowGame] = useState(false);
    const [gameDate, setGameDate] = useState<string | null>(null);
    const [eagerState, setEagerState] = useState<GameState | null>(null);
    const { theme } = useTheme();
    const styles = createAppStyles(theme);

    const todayDate = useMemo(() => todayString(), []);
    const urlDate = useMemo(() => getDateFromURL(), []);
    const fixedDate = urlDate || todayDate;

    // Eagerly fetch for the default (fixed) date
    useEffect(() => {
        (async () => {
            const puzzle = await fetchTodayQuote(fixedDate);
            const gameState = await GameState.create(fixedDate, puzzle);
            setEagerState(gameState);
        })();
    }, [fixedDate]);

    const startGame = async (date: string) => {
        // If eager state matches the date, use it, otherwise fetch
        if (eagerState && eagerState.puzzleDate === date) {
            setGameDate(date);
            setShowGame(true);
        } else {
            const puzzle = await fetchTodayQuote(date);
            const newState = await GameState.create(date, puzzle);
            setEagerState(newState);
            setGameDate(date);
            setShowGame(true);
        }
    };

    if (showGame && gameDate) {
        return (
            <App
                eagerState={eagerState?.puzzleDate === gameDate ? eagerState : null}
                dateString={gameDate}
            />
        );
    }
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {urlDate === todayDate ? (
                // One button if urlDate exists
                <TouchableOpacity
                    onPress={() => startGame(fixedDate)}
                    style={styles.elevatedButton}
                >
                    <Text style={styles.elevatedButtonText}>Play</Text>
                </TouchableOpacity>
            ) : (
                // Two buttons if no urlDate
                <View style={{ width: 220 }}>

                    <TouchableOpacity
                        onPress={() => startGame(fixedDate)}
                        style={[styles.elevatedButton, { marginTop: 20 }]}
                    >
                        <Text
                            style={[
                                styles.elevatedButtonText,
                                { flexWrap: "wrap", textAlign: "center" }
                            ]}
                        >
                            Play Current Puzzle
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => startGame(todayDate)}
                        style={[styles.elevatedButton, { marginTop: 20 }]}
                    >
                        <Text
                            style={[
                                styles.elevatedButtonText,
                                { flexWrap: "wrap", textAlign: "center" }
                            ]}
                        >
                            Play Today's Puzzle
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );


}

type AppProps = {
    eagerState: GameState | null;
    dateString: string;
};

function App({ eagerState, dateString }: AppProps) {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [routeDate, setRouteDate] = useState<string | undefined>(dateString);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    useAppBootstrap(setFontsLoaded);
    useRouteDateSync(routeDate, setRouteDate, navigation);

    useEffect(() => {
        if (!routeDate) return;

        const maybeUseEagerState = async () => {
            if (routeDate === dateString && eagerState) {
                setGameState(eagerState);
            } else {
                const puzzle = await fetchTodayQuote(routeDate);
                const newState = await GameState.create(routeDate, puzzle);
                setGameState(newState);
            }
        };

        maybeUseEagerState();
    }, [routeDate, eagerState, dateString]);

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
