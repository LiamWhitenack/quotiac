import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
} from "react-native";
import styles from "./styles";
import GameState from "@/state/state";

type PuzzleCompleteModalProps = {
  state: GameState;
  visible: boolean;
  onClose: () => void;
};

const PuzzleCompleteModal: React.FC<PuzzleCompleteModalProps> = ({
  state,
  visible,
  onClose,
}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: state.getShareWorthyString(),
      });
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Puzzle Solved!</Text>
          <Text style={styles.resultsText}>{state.getShareWorthyString()}</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleShare}>
              <Text style={styles.modalButtonText}>Share</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PuzzleCompleteModal;
