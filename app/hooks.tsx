import { useEffect, useRef } from "react";
import sizing from "@/sizing/sizing";
import GameState from "@/state/state";
import { fetchTodayQuote } from "@/puzzles/get-puzzle";
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
      return maybeDate && /^\d{8}$/.test(maybeDate) ? maybeDate : null;
    };

    const initializeRouteDate = () => {
      const urlDate = extractDateFromURL();

      if (urlDate) {
        setRouteDate(urlDate);
        navigation.setParams({ date: urlDate });
      } else {
        const now = new Date();
        const today = now.toISOString().slice(0, 10).replace(/-/g, "");
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
    fetchTodayQuote(routeDate).then((puzzle) => {
      setGameState(new GameState(puzzle));
    });
  }, [routeDate, setGameState]);
}

function useAppBootstrap(
  setFontsLoaded: (loaded: boolean) => void,
  setHasSeenTutorial: (val: boolean) => void
) {
  useEffect(() => {
    const init = async () => {
      await Font.loadAsync({
        Ionicons: require("@/assets/fonts/Ionicons.ttf"),
      });
      setFontsLoaded(true);

      const val = await AsyncStorage.getItem("hasSeenTutorial");
      setHasSeenTutorial(val === "true");
    };

    init();
  });
}

export { useRouteDateSync, useFetchPuzzle, useAppBootstrap };
