import GameState from "@/state/state";
import { useEffect } from "react";
import { Animated, Easing } from "react-native";

function useTitleFade(
  fadeAnim: Animated.Value,
  state: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  useEffect(() => {
    if (state.showAppTitle) {
      const timeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start(() => {
          state.showAppTitle = false;
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }).start();
          setGameState(state.clone());
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  });
}

export default useTitleFade;
