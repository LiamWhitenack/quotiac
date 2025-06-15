import React from "react";
import { Modal, View, Text, TouchableOpacity, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import GameState from "@/state/state";
import getIcons from "./get-icons";
import { useViewShotShare } from "./share";

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
  const { ViewShotComponent, handleShare: handleMobileShare } =
    useViewShotShare(state);

  const YourComponentToShare: React.FC<ViewProps> = () => (
    <View style={styles.shareHorizontalContainer}>
      <View style={styles.shareVerticalContainer}>{getIcons(state)}</View>
    </View>
  );

  return (
    <>
      <ViewShotComponent />

      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Puzzle Solved!</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <YourComponentToShare />
            <View style={{ height: 20 }} />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleMobileShare}
              >
                <Text style={styles.modalButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PuzzleCompleteModal;
