import { useEffect, useRef } from "react";
import sizing from "@/src/sizing/sizing";
import GameState from "@/src/state";
import { fetchTodayQuote, fetchTutorialQuote } from "@/src/puzzles/get-puzzle";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todayString } from "./utils";

function useRouteDateSync(
  puzzle: GameState,
  setRouteDate: (date: string) => void,
  navigation: any
) {
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    const today = todayString()
    if (hasInitializedRef.current) return;

    const extractDateFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const maybeDate = params.get("date");
      return maybeDate && (/^\d{8}$/.test(maybeDate) || maybeDate === "staging") ? maybeDate : null;
    };


    const initializeRouteDate = () => {
      setRouteDate(puzzle.puzzleDate);
      navigation.setParams({ date: puzzle.puzzleDate });

      hasInitializedRef.current = true;
    };

    initializeRouteDate();

    if (!sizing.isMobile) {
      window.addEventListener("popstate", initializeRouteDate);
      return () => window.removeEventListener("popstate", initializeRouteDate);
    }
  }, [navigation, puzzle, setRouteDate]);
}

function useFetchPuzzle(
  routeDate: string | undefined,
  setGameState: (state: GameState) => void
) {
  const lastFetchedDateRef = useRef<string | null>(null);

  useEffect(() => {
    if (!routeDate || lastFetchedDateRef.current === routeDate) return;

    lastFetchedDateRef.current = routeDate;

    (async () => {
      try {
        const storageKey = `puzzle-${routeDate}`;
        const storedPuzzle = await AsyncStorage.getItem(storageKey);

        let puzzle;

        if (storedPuzzle) {
          puzzle = JSON.parse(storedPuzzle);
        } else {
          puzzle = await fetchTodayQuote(routeDate);
          await AsyncStorage.setItem(storageKey, JSON.stringify(puzzle));
        }

        const gameState = await GameState.create(routeDate, puzzle);
        setGameState(gameState);
      } catch (error) {
        console.error("Error fetching or loading puzzle:", error);
      }
    })();
  }, [routeDate, setGameState]);
}



function useAppBootstrap(
  setFontsLoaded: (loaded: boolean) => void,
) {
  useEffect(() => {
    const init = async () => {
      await Font.loadAsync({
        Ionicons: require("@/assets/fonts/Ionicons.ttf"),
      });
      await Font.loadAsync({
        SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
      });
      setFontsLoaded(true);
    };

    init();
  });
}

export { useRouteDateSync, useFetchPuzzle, useAppBootstrap };
