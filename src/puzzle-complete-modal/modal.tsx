import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import React, { useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import GameState from "@/src/state/state";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "@/src/theme/ThemeContext";
import sizing from "@/src/sizing/sizing";
import CustomIonicons from "@/src/custom-icons";
import { createStyles } from "./styles";
import { createAppStyles } from "../theme/styles";

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
  const appStyles = createAppStyles(theme);
  const numHintsUsed = 2 // <-- Destructure new prop

  const currentStreak = 2;
  const maxStreak = 19;
  const puzzlesCompleted = 42;

  const originalEmojis = ["\u{1F632}", "\u{1F601}", "\u{1F642}", "\u{1F60C}", "\u{1F636}"];
  const hintEmoji = "💡";

  const modifiedEmojiArray = [
    ...Array(Math.min(numHintsUsed, originalEmojis.length)).fill(hintEmoji),
    ...originalEmojis.slice(Math.min(numHintsUsed, originalEmojis.length)),
  ];

  const emojiString = modifiedEmojiArray.join(" ");

  const handleShare = async () => {
    try {
      if (sizing.isMobile) {
        await Clipboard.setStringAsync(emojiString);
      } else {
        await navigator.clipboard.writeText(emojiString);
      }
      alert("Copied results to clipboard!");
    } catch (err) {
      alert("Failed to copy to clipboard. Please try again.");
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <TouchableOpacity onPress={onClose}>
              <CustomIonicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }} />

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 28, lineHeight: 36, textAlign: "center" }}>
              {emojiString}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 20, width: "75%", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center", marginHorizontal: 6, width: 70 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>{puzzlesCompleted}</Text>
                <Text style={{ fontSize: 13, color: theme.text, textAlign: "center" }}>Completed</Text>
              </View>
              <View style={{ alignItems: "center", marginHorizontal: 6, width: 70 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>{currentStreak}</Text>
                <Text style={{ fontSize: 13, color: theme.text, textAlign: "center" }}>{"Current\nStreak"}</Text>
              </View>
              <View style={{ alignItems: "center", marginHorizontal: 6, width: 70 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>{maxStreak}</Text>
                <Text style={{ fontSize: 13, color: theme.text, textAlign: "center" }}>{"Max\nStreak"}</Text>
              </View>
            </View>



          </View>

          <View style={{ height: 20 }} />

          <TouchableOpacity style={appStyles.elevatedButton} onPress={handleShare}>
            <Text style={appStyles.elevatedButtonText}>Share your results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


export default PuzzleCompleteModal;
