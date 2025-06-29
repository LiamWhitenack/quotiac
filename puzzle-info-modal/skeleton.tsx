import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStyles } from "./styles";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";

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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <QuoteDetails puzzle={state.puzzle} />
        </View>
      </View>
    </Modal>
  );
};

export default PuzzleDetailsModal;
