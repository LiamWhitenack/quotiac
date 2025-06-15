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
import * as Clipboard from "expo-clipboard";
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
  const webRef = useRef<HTMLDivElement>(null); // DOM ref for web

  const YourComponentToShare: React.FC<ViewProps> = (props) => (
    <View
      style={styles.shareHorizontalContainer}
      // @ ts-ignore
      ref={Platform.OS === "web" ? webRef : undefined}
      {...props}
    >
      <View style={styles.shareVerticalContainer}>
        {getIcons(state)}

        <Text style={styles.shareMessage}>
          Go to https://codiac.expo.app to play!
        </Text>
      </View>
    </View>
  );

  const handleShare = async () => {
    if (Platform.OS === "web") {
      if (!webRef.current) {
        alert("Could not find element to capture.");
        return;
      }
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(webRef.current, {
        backgroundColor: null,
        scale: window.devicePixelRatio,
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1)
      );

      if (!blob) {
        alert("Failed to generate image.");
        return;
      }

      try {
        // Use the native Clipboard API on web
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        alert("Image copied to clipboard!");
      } catch (err) {
        alert("Failed to copy image to clipboard: " + err);
      }
    } else {
      // Native platforms use react-native-view-shot
      // @ ts-ignore
      const uri = await viewShotRef.current!.capture!({
        format: "png",
        quality: 1,
        result: "tmpfile",
      });
      await Sharing.shareAsync(uri);
    }
  };

  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      {/* Hidden ViewShot for native capture */}
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
          <YourComponentToShare />
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

            {/* Show the share component visually */}
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
