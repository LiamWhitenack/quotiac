import QuotiacGame from "@/App";
import { ThemeProvider, useTheme } from "@/src/theme/ThemeContext";
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GameState from "@/src/state";
import { fetchTodayQuote as fetchQuote } from "@/src/puzzles/get-puzzle";
import { todayString } from "@/src/utils";
import LandingPage from "./landing-page";
import { useNavigation } from "expo-router";
import { useAppBootstrap, useRouteDateSync } from "@/src/hooks";
import LoadingPage from "./loading-page";

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

    const todayDate = useMemo(() => todayString(), []);
    const urlDate = useMemo(() => getDateFromURL(), []);
    const fixedDate = urlDate || todayDate;


    // Eagerly fetch for the default (fixed) date
    useEffect(() => {
        (async () => {
            const puzzle = await fetchQuote(fixedDate);
            const gameState = await GameState.create(fixedDate, puzzle);
            setEagerState(gameState);
        })();
    }, [fixedDate]);

    const startGame = async (date: string) => {
        if (eagerState && eagerState.puzzleDate === date) {
            setGameDate(date);
            setShowGame(true);
        } else {
            setEagerState(null);
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
        <ThemeProvider>
            <LandingPage
                urlDate={urlDate}
                todayDate={todayDate}
                fixedDate={fixedDate}
                startGame={startGame}
            />
        </ThemeProvider>
        
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
    const { theme } = useTheme();

    useAppBootstrap(setFontsLoaded);
    useRouteDateSync(routeDate, setRouteDate, navigation);

    useEffect(() => {
        if (!routeDate) return;

        const maybeUseEagerState = async () => {
            if (routeDate === dateString && eagerState) {
                setGameState(eagerState);
            } else {
                const puzzle = await fetchQuote(routeDate);
                const newState = await GameState.create(routeDate, puzzle);
                setGameState(newState);
            }
        };

        maybeUseEagerState();
    }, [routeDate, eagerState, dateString]);

    if (!fontsLoaded || !gameState) {
        return (
            <ThemeProvider>
                <LoadingPage />
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider>
            {/* @ts-ignore */}
            <QuotiacGame state={gameState} setGameState={setGameState} />
        </ThemeProvider>
    );
}
