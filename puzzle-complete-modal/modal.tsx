import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./styles";

type PuzzleCompleteModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PuzzleCompleteModal: React.FC<PuzzleCompleteModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Puzzle Solved!</Text>
          <Text style={styles.resultsText}>[Your result summary here]</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PuzzleCompleteModal;
