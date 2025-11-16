import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
  Linking,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import InstructionsModal from "./help-menu/help-modal";
import { Theme } from "../theme/themes";
import { createAppStyles } from "../theme/styles";
import { explorePuzzles } from "@/app/landing-page";

interface HelpModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  startNewGame: (date: string) => void;
}

export default function HelpModal({
  modalVisible,
  setModalVisible,
  startNewGame,
}: HelpModalProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const appStyles = createAppStyles(theme);

  const [isMounted, setIsMounted] = useState(modalVisible);

  useEffect(() => {
    if (modalVisible) {
      setIsMounted(true);   // mount immediately when opening
    }

    // If closing, wait for fade animation to finish
    if (!modalVisible) {
      const timeout = setTimeout(() => {
        setIsMounted(false); // unmount after fade completes
      }, 250); // matches fade timing

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  const [instructionsVisible, setInstructionsVisible] = useState(false);

  const [showExploreModal, setShowExploreModal] = useState(false);

  const menuItems = [
    {
      label: "How to Play",
      onPress: () => {
        setModalVisible(false);
        setInstructionsVisible(true);
      },
    },
    {
      label: "Add a Quote",
      onPress: () => {
        Linking.openURL(
          "https://docs.google.com/forms/d/1wBT2wKb1gx_ZzfkJPblgAGsZ38VV_UfxbWXEFmVcPL0/"
        );
        setModalVisible(false);
      },
    },
    {
      label: "Suggestions",
      onPress: () => {
        Linking.openURL(
          "https://docs.google.com/forms/d/1kchnuu5kwrTfz8Kuc5djRuAwbJpSdilYFv-VHBYyt8Q/"
        );
        setModalVisible(false);
      },
    },
  ];

  // 🔥 NEW: do not render the modal if unmounted
  if (!isMounted) return (
    <>
      <InstructionsModal
        isVisible={instructionsVisible}
        onClose={() => setInstructionsVisible(false)}
      />
      {explorePuzzles(showExploreModal, setShowExploreModal, startNewGame)}
    </>
  );

  return (
    <>
      {/* Your original menu modal (unchanged except visible={true}) */}
      <Modal
        visible={true}   // 🔥 stays true while mounted
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.fullscreenOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalCard}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.buttonsContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={item.onPress}
                  style={[appStyles.elevatedButton, styles.buttonSpacing]}
                >
                  <Text style={appStyles.elevatedButtonText}>{item.label}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                key={"explore"}
                onPress={() => setShowExploreModal(true)}
                style={[appStyles.invertedElevatedButton, styles.buttonSpacing]}
              >
                <Text style={appStyles.invertedElevatedButtonText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Other modals unchanged */}
      <InstructionsModal
        isVisible={instructionsVisible}
        onClose={() => setInstructionsVisible(false)}
      />
      {explorePuzzles(showExploreModal, setShowExploreModal, startNewGame)}
    </>
  );
}


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    fullscreenOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalCard: {
      backgroundColor: theme.modalBackground,
      borderRadius: 12,
      padding: 24,
      width: "90%",
      maxWidth: 300,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
    buttonsContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
    buttonSpacing: {
      marginVertical: 6,
    },
  });
