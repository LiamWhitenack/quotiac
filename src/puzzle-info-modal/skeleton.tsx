import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import { createStyles } from "./styles";
import GameState from "@/src/state";
import { useTheme } from "@/src/theme/ThemeContext";

import QuoteDetails from "./render-quote";
import CustomIonicons from "@/src/custom-icons";

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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <CustomIonicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <QuoteDetails puzzle={state.puzzle} />
        </View>
      </View>
    </Modal>
  );
};

export default PuzzleDetailsModal;
