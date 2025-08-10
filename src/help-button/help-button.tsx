import React, { useState } from "react";
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

interface HelpModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function HelpModal({
  modalVisible,
  setModalVisible,
}: HelpModalProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const appStyles = createAppStyles(theme);

  // New state to control InstructionsModal visibility
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  const menuItems = [
    {
      label: "How to Play",
      onPress: () => {
        setModalVisible(false);          // Close this menu modal
        setInstructionsVisible(true);   // Show InstructionsModal
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
    {
      label: "Play",
      onPress: () => {
        setModalVisible(false);
      },
    },
  ];

  return (
    <>
      {/* Your original menu modal */}
      <Modal
        visible={modalVisible}
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
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <InstructionsModal
        isVisible={instructionsVisible}
        onClose={() => setInstructionsVisible(false)}
      />
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
