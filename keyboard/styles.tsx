import { StyleSheet } from "react-native";
import sizing from "../sizing/sizing";
import type { Theme } from "@/theme/themes";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
  container: {
    flex: 1, // Ensure the main container takes the full height
    justifyContent: "flex-end",
    // alignItems: "flex-end",
    paddingTop: 10,
    width: sizing.maxWidth,
    minHeight: sizing.keyboardHeight,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: sizing.keyboardMargin / 8,
    marginHorizontal: sizing.keyboardMargin / 8,
  },
  key: {
    width: sizing.keyboardKeyWidth, // Each key takes equal space in the row
    height: 55, // Fixed height for keys
    justifyContent: "center",
    alignItems: "center",
    margin: sizing.keyboardKeyGap, // Adjust margin for spacing
    backgroundColor: theme.surface,
    borderRadius: 5,
  },
  iconKey: {
    width: sizing.keyboardKeyWidth, // Each key takes equal space in the row
    height: 55, // Fixed height for keys
    justifyContent: "center",
    alignItems: "center",
    margin: sizing.keyboardKeyGap, // Adjust margin for spacing
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  keyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
  },
  activeKey: {
    backgroundColor: theme.surface,
  },
});
