import { StyleSheet } from "react-native";
import type { Theme } from "@/src/theme/themes";

export const createAppStyles = (theme: Theme) =>
  StyleSheet.create({
    elevatedButton: {
      flex: 1,
      marginHorizontal: 8,
      backgroundColor: theme.elevatedButton,
      paddingVertical: 12,
      borderRadius: 30,
      alignItems: "center",
    },
    elevatedButtonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 18,
    },
  });
