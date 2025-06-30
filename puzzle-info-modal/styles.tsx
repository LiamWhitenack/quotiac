import sizing from "@/sizing/sizing";
import { Modal, Platform, StyleSheet } from "react-native";
import type { Theme } from "@/theme/themes";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.elevatedSurface,
      borderRadius: 16,
      padding: 24,
      width: sizing.maxWidth * 0.8,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 0, // or adjust to match your container padding
      paddingBottom: 25,
    },
    resultsHorizontalContainer: {
      width: sizing.maxWidth * 0.7,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    resultsVerticalContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    hiddenShareHorizontalContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    hiddenShareVerticalContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },

    shareMessage: {
      marginTop: 10,
      textAlign: "center",
      color: "black",
      fontSize: 12,
      fontWeight: "600",
    },

    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    modalTitlePlusContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
    },
    modalTitlePlus: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.text,
    },

    resultsText: {
      fontSize: 24, // bigger for clearer emoji
      lineHeight: 32, // add vertical breathing room
      marginBottom: 24,
      textAlign: "center",
      fontFamily: Platform.select({
        ios: "Apple Color Emoji",
        android: "Noto Color Emoji",
        default: "Segoe UI Emoji",
      }),
    },
    modalButton: {
      // flex: 1,
      height: sizing.topBarHeight * 0.7,
      // transform: [{ scale: 1.5 }],
      marginHorizontal: 8,
      backgroundColor: theme.elevatedButton,
      justifyContent: "center",
      borderRadius: 30,
      alignItems: "center",
    },
    disabledModalButton: {
      height: sizing.topBarHeight * 0.7,
      marginHorizontal: 8,
      borderColor: theme.elevatedButton, // set border color
      borderWidth: 2, // set border width
      justifyContent: "center",
      borderRadius: 30,
      alignItems: "center",
    },
    puzzleInfoHeader: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 16,
    },
    puzzleInfoText: {
      color: theme.text,
      fontSize: 16,
    },
    modalButtonText: {
      color: theme.textInverse,
      fontWeight: "bold",
      fontSize: 14,
      paddingHorizontal: 16,
    },
    modalButtonDisabledText: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 14,
      paddingHorizontal: 16,
    },
    closeButton: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    closeButtonText: {
      fontSize: 16,
      color: "#007AFF",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0)",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonContainer: {
      position: "absolute",
      top: 16,
      right: 16,
      zIndex: 10, // ensures it overlays other elements
    },
    modalQuote: {
      fontSize: 18,
      fontStyle: "italic",
      color: theme.text,
      textAlign: "center",
      marginBottom: 12,
    },

    modalSubType: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.subtext,
      marginBottom: 16,
    },
  });
