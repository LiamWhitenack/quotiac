import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import React, { useRef, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const STORAGE_KEY = "streaks";

const PuzzleCompleteModal: React.FC<PuzzleCompleteModalProps> = ({
  state,
  visible,
  onClose,
}) => {
  const viewShotRef = useRef<ViewShot>(null);
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const appStyles = createAppStyles(theme);

  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [puzzlesCompleted, setPuzzlesCompleted] = useState(0);
  const [lastPlayedDate, setLastPlayedDate] = useState<string | null>(null);

  const originalEmojis = ["\u{1F632}", "\u{1F601}", "\u{1F642}", "\u{1F60C}", "\u{1F636}"];
  const hintEmoji = "\u{1F4A1}";
  const numHintsUsed = state.givenHintLetters.length;

  const modifiedEmojiArray = [
    ...Array(Math.min(numHintsUsed, originalEmojis.length)).fill(hintEmoji),
    ...originalEmojis.slice(Math.min(numHintsUsed, originalEmojis.length)),
  ];

  const emojiString = modifiedEmojiArray.join(" ");

  // 🔄 Load streaks on modal open
  useEffect(() => {
    if (visible) {
      loadAndUpdateStreaks();
    }
  }, [visible]);

  const loadAndUpdateStreaks = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const today = new Date().toDateString();

      let stored = {
        currentStreak: 0,
        maxStreak: 0,
        puzzlesCompleted: 0,
        lastPlayed: null,
      };

      if (data) {
        stored = JSON.parse(data);
      }

      if (stored.lastPlayed === today) {
        // Already recorded today, just update display
        setCurrentStreak(stored.currentStreak);
        setMaxStreak(stored.maxStreak);
        setPuzzlesCompleted(stored.puzzlesCompleted);
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      const updatedStreak = stored.lastPlayed === yesterdayStr ? stored.currentStreak + 1 : 1;
      const updatedMax = Math.max(stored.maxStreak, updatedStreak);
      const updatedCompleted = stored.puzzlesCompleted + 1;

      // Save updated data
      const newData = {
        currentStreak: updatedStreak,
        maxStreak: updatedMax,
        puzzlesCompleted: updatedCompleted,
        lastPlayed: today,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

      setCurrentStreak(updatedStreak);
      setMaxStreak(updatedMax);
      setPuzzlesCompleted(updatedCompleted);
    } catch (err) {
      console.error("Failed to load/update streaks:", err);
    }
  };

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

  const StreakStat = ({ label1, label2, value }: { label1: string; label2?: string; value: number }) => (
    <View style={{ alignItems: "center", marginHorizontal: 6, width: 70 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>{value}</Text>
      <Text style={{ fontSize: 13, color: theme.text, textAlign: "center" }}>{label1}</Text>
      {label2 ? (
        <Text style={{ fontSize: 13, color: theme.text, textAlign: "center" }}>{label2}</Text>
      ) : null}
    </View>
  );

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

            <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-around" }}>
              <StreakStat label1="Completed" value={puzzlesCompleted} />
              <StreakStat label1="Current" label2="Streak" value={currentStreak} />
              <StreakStat label1="Max" label2="Streak" value={maxStreak} />
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
