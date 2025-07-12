import { StyleSheet } from "react-native";
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
      flexDirection: "column",
      justifyContent: "center",
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
