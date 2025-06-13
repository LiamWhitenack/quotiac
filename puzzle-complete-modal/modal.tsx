import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import React, { useRef } from "react";
import { Modal, View, Text, TouchableOpacity, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import quoteStyles from "../quote-display/styles";
import GameState from "@/state/state";
import getIcons from "@/quote-display/get-icons";

type PuzzleCompleteModalProps = {
  state: GameState;
  visible: boolean;
  updateState: () => void;
  onClose: () => void;
};

const PuzzleCompleteModal: React.FC<PuzzleCompleteModalProps> = ({
  state,
  visible,
  updateState,
  onClose,
}) => {
  const viewShotRef = useRef<ViewShot>(null);

  const YourComponentToShare: React.FC<ViewProps> = (props) => (
    <View style={quoteStyles.verticalContainer}>
      <View style={quoteStyles.horizontalContainer}>
        {getIcons(state, updateState)}
      </View>
    </View>
  );

  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current?.capture?.({
        format: "png",
        quality: 1,
      });

      if (!uri) throw new Error("Failed to capture image");

      await Sharing.shareAsync(uri);
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Puzzle Solved!</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
            <YourComponentToShare />
          </ViewShot>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleShare}>
              <Text style={styles.modalButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PuzzleCompleteModal;
