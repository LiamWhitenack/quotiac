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
import CustomIonicons from "@/src/custom-icons";
import { useTheme } from "../theme/ThemeContext";
import InstructionsModal from "./help-menu/help-modal";
import { Theme } from "../theme/themes";
import { createAppStyles } from "../theme/styles";

export default function HelpDropdownButton() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const appStyles = createAppStyles(theme);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    {
      label: "How to Play",
      onPress: () => {
        setModalVisible(true);
      },
    },
    {
      label: "Suggest a Quote",
      onPress: () => {
        Linking.openURL(
          "https://docs.google.com/forms/d/1wBT2wKb1gx_ZzfkJPblgAGsZ38VV_UfxbWXEFmVcPL0/edit"
        );
      },
    },
    {
      label: "Play",
      onPress: () => {
        setDropdownVisible(false);
      },
    },

  ];

  return (
    <View style={{ position: "relative" }}>
      {/* Help Button */}
      <TouchableOpacity onPress={() => setDropdownVisible(true)}>
        <View style={{ width: 32, height: 32, marginRight: 15 }}>
          <CustomIonicons
            name="ellipse-outline"
            size={32}
            color={theme.text}
            style={StyleSheet.absoluteFill}
          />
          <CustomIonicons
            name="help-outline"
            size={20}
            color={theme.text}
            style={{
              position: "absolute",
              top: 6,
              left: 6,
            }}
          />
        </View>
      </TouchableOpacity>

      {/* Fullscreen Modal Dropdown */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.fullscreenOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.buttonsContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    item.onPress();
                    setDropdownVisible(false);
                  }}
                  style={[appStyles.elevatedButton, styles.buttonSpacing]}
                >
                  <Text style={appStyles.elevatedButtonText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Instructions Modal */}
      <InstructionsModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
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
    closeButton: {
      alignSelf: "flex-end",
      padding: 4,
    },
    elevatedButton: {
      backgroundColor: theme.elevatedButton,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    menuText: {
      fontSize: 16,
      color: theme.textInverse,
    },
    buttonsContainer: {
      // Use vertical stacking with some spacing around or between
      flexDirection: "column",
      justifyContent: "space-between",
      // Or: justifyContent: "center",
      // paddingVertical: 10,
    },

    buttonSpacing: {
      marginVertical: 6, // space above and below each button
    },
  });
