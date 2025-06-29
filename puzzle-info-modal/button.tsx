import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStyles } from "./styles";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";

type ShowPuzzleInfoButtonProps = {
  state: GameState;
  onPressed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowPuzzleInfoButton: React.FC<ShowPuzzleInfoButtonProps> = ({
  state,
  onPressed: showPuzzleDetailsModal,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={styles.modalButton}
      onPress={() => {
        showPuzzleDetailsModal(true);
      }}
    >
      <Text style={styles.modalButtonText}>{state.puzzle.puzzleType}</Text>
    </TouchableOpacity>
  );
};

export default ShowPuzzleInfoButton;
