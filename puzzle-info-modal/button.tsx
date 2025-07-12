import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStyles } from "./styles";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";
import { GeneralPhrase } from "@/puzzles/puzzle-types/quote";

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

  return state.puzzle instanceof GeneralPhrase ? (
    <Text style={styles.modalTitle}>this.state.puzzle.</Text>
  ) : (
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
