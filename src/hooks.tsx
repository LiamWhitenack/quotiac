import { useEffect, useRef } from "react";
import sizing from "@/src/sizing/sizing";
import GameState from "@/src/state";
import { fetchTodayQuote, fetchTutorialQuote } from "@/src/puzzles/get-puzzle";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useRouteDateSync(
  routeDate: string | undefined,
  setRouteDate: (date: string) => void,
  navigation: any
) {
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) return;

    const extractDateFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const maybeDate = params.get("date");
      return maybeDate && (/^\d{8}$/.test(maybeDate) || maybeDate === "staging") ? maybeDate : null;
    };


    const initializeRouteDate = () => {
      const urlDate = extractDateFromURL();

      if (urlDate) {
        setRouteDate(urlDate);
        navigation.setParams({ date: urlDate });
      } else {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(now.getDate()).padStart(2, "0");

        const today = `${year}${month}${day}`;
        setRouteDate(today);
        navigation.setParams({ date: today });
      }

      hasInitializedRef.current = true;
    };

    initializeRouteDate();

    if (!sizing.isMobile) {
      window.addEventListener("popstate", initializeRouteDate);
      return () => window.removeEventListener("popstate", initializeRouteDate);
    }
  }, [navigation, routeDate, setRouteDate]);
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
      const puzzle = await fetchTodayQuote(routeDate);
      const gameState = await GameState.create(routeDate, puzzle);
      setGameState(gameState);
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
