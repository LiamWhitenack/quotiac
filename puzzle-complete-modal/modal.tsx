import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import React, { useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ViewProps,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import GameState from "@/state/state";
import getIcons from "./get-icons";

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
  const viewShotRef = useRef<ViewShot>(null);

  const YourComponentToShare: React.FC<ViewProps> = (props) => (
    <View style={styles.shareHorizontalContainer}>
      <View style={styles.shareVerticalContainer}>{getIcons(state)}</View>
    </View>
  );

  const handleShare = async () => {
    try {
      if (Platform.OS === "web") {
        await navigator.clipboard.writeText(
          "https://codiac.expo.app: " + state.getShareWorthyString()
        );
        alert("Text copied to clipboard!");
        return;
      }

      //@ts-ignore
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
    <>
      {Platform.OS !== "web" && (
        <ViewShot
          ref={viewShotRef}
          options={{ format: "png", quality: 1 }}
          style={{
            position: "absolute",
            top: -9999,
            left: -9999,
            backgroundColor: "white",
            padding: 20,
            width: 300,
            borderRadius: 8,
          }}
        >
          <View style={styles.shareHorizontalContainer}>
            <View style={styles.shareVerticalContainer}>{getIcons(state)}</View>
          </View>
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "black",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Go to https://codiac.expo.app to play!
          </Text>
        </ViewShot>
      )}

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
                onPress={handleShare}
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
