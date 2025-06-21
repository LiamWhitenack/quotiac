import React from "react";
import { View } from "react-native";
import { createStyles } from "./styles";
import keyboardKey from "./key";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";
import { BlurView } from "expo-blur";
import { createMainWindowStyles } from "@/styles";

interface LetterKeyboardDisplayProps {
  state: GameState;
  updateState: () => void;
  mode: string;
}

const LetterKeyboardDisplay: React.FC<LetterKeyboardDisplayProps> = ({
  state,
  updateState,
  mode,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const mainWindowStyles = createMainWindowStyles(theme);
  return (
    <BlurView
      tint={mode === "dark" ? "dark" : "light"}
      intensity={60}
      style={mainWindowStyles.keyboardBlurOverlay}
      pointerEvents="none"
    >
      <View style={styles.outerKeyboardContainer}>
        <View style={styles.container}>
          {state.keyboardValues.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((element, index) =>
                keyboardKey(state, updateState, rowIndex, index, element)
              )}
            </View>
          ))}
        </View>
      </View>
    </BlurView>
  );
};

export default LetterKeyboardDisplay;
