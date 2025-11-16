import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import React, { useRef, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Share,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GameState from "@/src/state";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "@/src/theme/ThemeContext";
import CustomIonicons from "@/src/custom-icons";
import { createStyles } from "./styles";
import { createAppStyles } from "../theme/styles";
import SolvingLockAnimation from "../icon/solving-animation";
import { explorePuzzles } from "@/app/landing-page";

type PuzzleCompleteModalProps = {
  state: GameState;
  visible: boolean;
  startNewGame: (date: string) => void;
  onClose: () => void;
};

const STORAGE_KEY = "streaks";

const PuzzleCompleteModal: React.FC<PuzzleCompleteModalProps> = ({
  state,
  visible,
  startNewGame,
  onClose,
}) => {
  const viewShotRef = useRef<ViewShot>(null);
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const appStyles = createAppStyles(theme);

  const [isMounted, setIsMounted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [puzzlesCompleted, setPuzzlesCompleted] = useState(0);

  const [showExploreModal, setShowExploreModal] = useState(false);

  const originalEmojis = ["\u{1F632}", "\u{1F601}", "\u{1F642}", "\u{1F60C}", "\u{1F636}"];
  const hintEmoji = "\u{1F4A1}";
  const numHintsUsed = state.givenHintLetters.length;

  const modifiedEmojiArray = [
    ...Array(Math.min(numHintsUsed, originalEmojis.length)).fill(hintEmoji),
    ...originalEmojis.slice(Math.min(numHintsUsed, originalEmojis.length)),
  ];

  const emojiString = modifiedEmojiArray.join(" ");

  // Sync mounting state for fade-in / fade-out
  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      loadAndUpdateStreaks();
    } else {
      setIsMounted(false);
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

      if (data) stored = JSON.parse(data);

      if (stored.lastPlayed === today) {
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
      const today = new Date();
      const formattedDate = `${String(today.getMonth() + 1).padStart(2, "0")}/${String(
        today.getDate()
      ).padStart(2, "0")}/${today.getFullYear()}`;
      const shareableString = `${emojiString} - ${formattedDate}\nquotiac.io`;

      try {
        await Share.share({
          message: shareableString,
          title: "Quotiac",
        });
        return;
      } catch {
        await Clipboard.setStringAsync(shareableString);
      }

      alert("Copied results to clipboard!");
    } catch (err) {
      alert("Failed to share or copy to clipboard. Please try again.");
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
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMounted}
        onRequestClose={onClose}
        onDismiss={() => {
          if (!visible) onClose();
        }}
      >
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

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-around",
                }}
              >
                <StreakStat label1="Completed" value={puzzlesCompleted} />
                <StreakStat label1="Current" label2="Streak" value={currentStreak} />
                <StreakStat label1="Max" label2="Streak" value={maxStreak} />
              </View>
            </View>

            <View style={{ height: 20 }} />

            <TouchableOpacity
              style={[appStyles.elevatedButton, { width: "80%" }]}
              onPress={handleShare}
            >
              <Text style={appStyles.elevatedButtonText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[appStyles.invertedElevatedButton, { width: "80%" }]}
              onPress={() => {
                onClose();
                setTimeout(() => {
                  setShowExploreModal(true);
                }, 250);
              }}
            >
              <Text style={appStyles.invertedElevatedButtonText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {explorePuzzles(showExploreModal, setShowExploreModal, startNewGame)}
    </>
  );
};

export default PuzzleCompleteModal;
