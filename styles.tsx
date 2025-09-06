import { StyleSheet } from "react-native";
import sizing from "@/src/sizing/sizing";
import type { Theme } from "@/src/theme/themes";

export const createMainWindowStyles = (theme: Theme) =>
  StyleSheet.create({
    topBarContainer: {
      width: sizing.maxWidth,
      height: sizing.topBarHeight,
      flexDirection: "row", // Horizontally align items
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    topBarIconContainer: {
      width: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginRight: 20,
      paddingHorizontal: 10,
      flexShrink: 1,  // <-- allow shrinking
    },
    title: {
      fontSize: 24, // Size of the title text
      fontWeight: "bold", // Bold text
      textAlign: "center", // Center the title
      marginHorizontal: 15,
      color: theme.text,
    },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    attemptsContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      marginVertical: 5,
    },
    letterBox: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      borderRadius: 5,
    },
    letter: {
      fontSize: 24,
      fontWeight: "bold",
    },
    correctLetter: {
      backgroundColor: "#6AAA64",
    },
    presentLetter: {
      backgroundColor: "#C9B458",
    },
    absentLetter: {
      backgroundColor: "#787C7E",
    },
    currentGuess: {
      marginVertical: 20,
      flexDirection: "row",
    },
    currentGuessText: {
      fontSize: 24,
      fontWeight: "bold",
    },
    iconContainer: {
      margin: 10,
      alignItems: "center",
    },
    keyboardBlurOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: sizing.keyboardHeight, // match your GameKeyboard height
      zIndex: 5,
    },
    loadingScreen: { 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: theme.background, 
    }
  });
