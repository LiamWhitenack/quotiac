import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStyles } from "./styles";
import GameState from "@/src/state/state";
import { useTheme } from "@/src/theme/ThemeContext";
import { createAppStyles } from "../theme/styles";

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
  const appStyles = createAppStyles(theme);

  return false ? (
    <Text style={styles.modalTitle}>this.state.puzzle.</Text>
  ) : (
    <TouchableOpacity
      style={[{ flex: 1, marginVertical: 5}, appStyles.elevatedButton]}
      disabled={puzzleDetailsModalDisabled}
      onPress={() => {
        showPuzzleDetailsModal(true);
      }}
    >
      <Text style={appStyles.elevatedButtonText}>
        {state.puzzle.puzzleType}
      </Text>
    </TouchableOpacity>
  );
};

export default ShowPuzzleInfoButton;
