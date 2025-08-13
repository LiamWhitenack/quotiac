import QuotiacGame from "@/App";
import { ThemeProvider, useTheme } from "@/src/theme/ThemeContext";
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GameState from "@/src/state";
import { fetchTodayQuote } from "@/src/puzzles/get-puzzle";
import { todayString } from "@/src/utils";
import LandingPage from "./landing-page";
import { useNavigation } from "expo-router";
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

// ...other imports

export default function Index() {
    const [showGame, setShowGame] = useState(false);
    const [gameDate, setGameDate] = useState<string | null>(null);
    const [eagerState, setEagerState] = useState<GameState | null>(null);

    const todayDate = useMemo(() => todayString(), []);
    const urlDate = useMemo(() => getDateFromURL(), []);
    const fixedDate = urlDate || todayDate;

    // Load Google Analytics once on component mount
    useEffect(() => {
        const GA_MEASUREMENT_ID = "G-4V14VP7203"; // <-- Replace with your ID

        // Insert the GA script tag
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Initialize GA after script loads
        script.onload = () => {
            (window as any).dataLayer = (window as any).dataLayer || [];
            function gtag(...args: any[]) {
                (window as any).dataLayer.push(args);
            }
            (window as any).gtag = gtag;
            gtag("js", new Date());
            gtag("config", GA_MEASUREMENT_ID);
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Eagerly fetch for the default (fixed) date
    useEffect(() => {
        (async () => {
            const puzzle = await fetchTodayQuote(fixedDate);
            const gameState = await GameState.create(fixedDate, puzzle);
            setEagerState(gameState);
        })();
    }, [fixedDate]);

    const startGame = async (date: string) => {
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
        <LandingPage
            urlDate={urlDate}
            todayDate={todayDate}
            fixedDate={fixedDate}
            startGame={startGame}
        />
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
