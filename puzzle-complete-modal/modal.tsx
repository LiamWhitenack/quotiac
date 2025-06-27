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
import { createStyles } from "../puzzle-info-modal/styles";
import GameState from "@/state/state";
import getIcons from "./get-icons";
import { useTheme } from "@/theme/ThemeContext";
import sizing from "@/sizing/sizing";

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
  const webRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Visible component shown in modal
  const YourVisibleComponent: React.FC<ViewProps> = (props) => (
    <View style={styles.resultsHorizontalContainer} {...props}>
      <View style={styles.resultsVerticalContainer}>
        <View style={{ height: 20 }} />
        {getIcons(state, theme)}
        <View style={{ height: 20 }} />
      </View>
    </View>
  );

  // Hidden component used for sharing/capture
  const YourHiddenComponent: React.FC<ViewProps> = (props) => (
    <View
      style={[
        styles.hiddenShareHorizontalContainer,
        {
          backgroundColor: "white",
          padding: 20,
          width: 300,
          borderRadius: 8,
        },
      ]}
      // @ts-ignore
      ref={Platform.OS === "web" ? webRef : undefined}
      {...props}
    >
      <View style={styles.hiddenShareVerticalContainer}>
        {getIcons(state)}
        {sizing.isMobile || !sizing.isMobileWeb(navigator) ? (
          <Text style={styles.shareMessage}>
            Go to https://codiac.expo.app to play!
          </Text>
        ) : undefined}
      </View>
    </View>
  );

  const handleShare = async () => {
    try {
      if (sizing.isMobile) {
        // Native platforms: use react-native-view-shot
        // @ts-ignore
        const uri = await viewShotRef.current!.capture!({
          format: "png",
          quality: 1,
          result: "base64",
        });
        await Sharing.shareAsync(uri);
      } else {
        if (!webRef.current) {
          alert("Could not find element to capture.");
          return;
        }

        const html2canvas = (await import("html2canvas")).default;
        await new Promise((resolve) => setTimeout(resolve, 10));
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

        if (sizing.isMobileWeb(navigator)) {
          const file = new File([blob], "image.png", { type: "image/png" });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: "Puzzle Image",
                text: "https://codiac.expo.app",
              });
            } catch (err) {
              alert("Sharing failed: " + err);
            }
          } else {
            alert("Sharing not supported on this device or browser.");
          }
        } else {
          // Use the native Clipboard API on web
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          alert("Image copied to clipboard!");
        }
      }
    } catch {
      alert(
        "Sharing is not supported on this browser. Please use your device's native browser"
      );
    }
  };

  return (
    <>
      {/* Hidden component for ViewShot (mobile only) */}
      {sizing.isMobile && (
        <ViewShot
          ref={viewShotRef}
          options={{ format: "png", quality: 1 }}
          style={{
            position: "absolute",
            top: -9999,
            left: -9999,
          }}
        >
          <YourHiddenComponent />
        </ViewShot>
      )}

      {/* On web, the hidden component is rendered normally (off-screen or hidden via CSS) */}
      {!sizing.isMobile && (
        <View style={{ position: "absolute", top: -9999, left: -9999 }}>
          <YourHiddenComponent />
        </View>
      )}

      {/* Modal with visible component */}
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              {/* <View style={styles.modalTitlePlusContainer}> */}
              <Text style={styles.modalTitle}>Congratulations!</Text>
              {/* <Text style={styles.modalTitlePlus}>
                  You solved today&#39;s Codiac
                </Text> */}
              {/* </View> */}
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <YourVisibleComponent />
            <View style={{ height: 20 }} />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleShare}
              >
                <Text style={styles.modalButtonText}>Share your results</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PuzzleCompleteModal;
