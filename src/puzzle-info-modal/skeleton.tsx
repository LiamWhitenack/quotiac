import React from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import { createStyles } from "./styles";
import GameState from "@/src/state";
import { useTheme } from "@/src/theme/ThemeContext";

import QuoteDetails from "./render-quote";

type PuzzleDetailsModalProps = {
  state: GameState;
  visible: boolean;
  onClose: () => void;
};

const PuzzleDetailsModal: React.FC<PuzzleDetailsModalProps> = ({
  state,
  visible,
  onClose,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.5)" }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          {/* Title */}
          <Text style={[styles.modalTitle, { marginBottom: 20 }]}>
            {state.puzzle.puzzleType}
          </Text>

          <QuoteDetails puzzle={state.puzzle} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PuzzleDetailsModal;
