import { StyleSheet } from "react-native";
import sizing from "./sizing/sizing";

export const createMainWindowStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    topBarContainer: {
      width: sizing.maxWidth,
      height: sizing.topBarHeight,
      flexDirection: "row", // Horizontally align items
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 0,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    topBarIconContainer: {
      width: 50,
      flexDirection: "row", // Horizontally align items
      alignItems: "center", // Vertically center the items
      justifyContent: "flex-end",
    },
    title: {
      fontSize: 24, // Size of the title text
      fontWeight: "bold", // Bold text
      textAlign: "center", // Center the title
      marginHorizontal: 15,
      color: theme === "light" ? "black" : "#F8F8F8",
    },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      // paddingTop: 20,
      backgroundColor: theme === "light" ? "#F3F4F6" : "#121212"
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
  });
