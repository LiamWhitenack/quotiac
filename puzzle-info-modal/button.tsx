import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStyles } from "./styles";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";

type ShowPuzzleInfoButtonProps = {
  state: GameState;
  puzzleDetailsModalDisabled: boolean;
  onPressed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowPuzzleInfoButton: React.FC<ShowPuzzleInfoButtonProps> = ({
  state,
  puzzleDetailsModalDisabled,
  onPressed: showPuzzleDetailsModal,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={
        puzzleDetailsModalDisabled
          ? styles.disabledModalButton
          : styles.modalButton
      }
      disabled={puzzleDetailsModalDisabled}
      onPress={() => {
        showPuzzleDetailsModal(true);
      }}
    >
      <Text
        style={
          puzzleDetailsModalDisabled
            ? styles.modalButtonDisabledText
            : styles.modalButtonText
        }
      >
        {state.puzzle.puzzleType}
      </Text>
    </TouchableOpacity>
  );
};

export default ShowPuzzleInfoButton;
