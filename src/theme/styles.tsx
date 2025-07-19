import { StyleSheet } from "react-native";
import type { Theme } from "@/src/theme/themes";

export const createAppStyles = (theme: Theme) =>
  StyleSheet.create({
    elevatedButton: {
      marginHorizontal: 8,
      backgroundColor: theme.elevatedButton,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 30,
      alignItems: "center",
    },
    elevatedButtonText: {
      color: theme.textInverse,
      fontWeight: "600",
      fontSize: 18,
    },
  });
