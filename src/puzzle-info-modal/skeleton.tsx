import React, { useEffect, useState } from "react";
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

  const [isMounted, setIsMounted] = useState(false);

  const hasDetails = state.puzzle.otherInfo.size > 0;

  // Sync mount state with visible
  useEffect(() => {
    if (visible) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMounted}
      onRequestClose={onClose}
      onDismiss={() => {
        // When fade-out is finished and parent says "not visible", call onClose
        if (!visible) onClose();
      }}
    >
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

          {hasDetails ? (
            <QuoteDetails puzzle={state.puzzle} />
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 10 }}>
              <Text style={{ fontSize: 16, color: theme.subtext }}>
                No additional details
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PuzzleDetailsModal;
