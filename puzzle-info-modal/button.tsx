import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStyles } from "./styles";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";

type ShowPuzzleInfoButtonProps = {
  state: GameState;
};

const ShowPuzzleInfoButton: React.FC<ShowPuzzleInfoButtonProps> = ({
  state,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.modalButton}>
      <Text style={styles.modalButtonText}>{state.puzzle.puzzleType}</Text>
    </TouchableOpacity>
  );
};

export default ShowPuzzleInfoButton;
