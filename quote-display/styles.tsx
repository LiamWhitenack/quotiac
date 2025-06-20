import { StyleSheet } from "react-native";
import sizing from "@/sizing/sizing";
import type { Theme } from "@/theme/themes";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    iconStyle: {
      color: theme.text,
    },
    spaceIconStyle: {
      color: "transparent",
    },
    // TODO: Add a container to make the icon spaces larger
    verticalContainer: {
      flex: 5,
      flexDirection: "column",
      alignContent: "center",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingTop: 10,
      paddingBottom: 10,
      flexShrink: 1,
      alignItems: "center",
    },
    horizontalContainer: {
      maxWidth: sizing.maxWidth - 20,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 30,
      flexShrink: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    quote: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
    },
  });
