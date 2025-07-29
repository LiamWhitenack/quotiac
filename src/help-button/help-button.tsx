import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import CustomIonicons from "@/src/custom-icons"; // Replace with actual import
import { useTheme } from "../theme/ThemeContext";
import InstructionsModal from "./help-menu/help-modal";

export default function HelpDropdownButton() {
  const { theme } = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    {
      label: "How to Play",
      onPress: () => {
        setModalVisible(true);
      },
    },
    { label: "Feedback", onPress: () => { } },
    { label: "Report a Bug", onPress: () => { } },
    { label: "Questions?", onPress: () => { } },
  ];

  return (
    <View style={{ position: "relative" }}>
      {/* Modal */}
      <InstructionsModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Help Button */}
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
        <View style={{ width: 32, height: 32 }}>
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

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                item.onPress();
                setDropdownVisible(false);
              }}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: "#eee" },
              ]}
            >
              <Text style={styles.menuText}>{item.label}</Text>
              <CustomIonicons
                name="arrow-forward-outline"
                size={16}
                color="#000"
              />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    zIndex: 999,
    elevation: 5,
    width: 180,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 14,
    color: "#000",
  },
});
