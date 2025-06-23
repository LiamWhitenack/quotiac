// app-effects/title-fade.ts
import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";

export function useTitleFade(
  fadeAnim: Animated.Value,
  showAppTitle: boolean,
  setShowAppTitle: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    if (showAppTitle) {
      const timeout = setTimeout(() => {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(fadeAnim, {
            toValue: -1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
        ]).start(() => {
          setShowAppTitle(false);
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  });
}

export function useAnimatedValue(animatedValue: Animated.Value): number {
  // @ts-ignore
  const [value, setValue] = useState(animatedValue.__getValue?.() ?? 0);

  useEffect(() => {
    const id = animatedValue.addListener(({ value }) => setValue(value));
    return () => animatedValue.removeListener(id);
  }, [animatedValue]);

  return value;
}
