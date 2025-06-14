import { StyleSheet } from "react-native";
import sizing from "../sizing/sizing";

export const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
  container: {
    flex: 1, // Ensure the main container takes the full height
    justifyContent: "flex-end",
    // alignItems: "flex-end",
    paddingTop: 50,
    maxWidth: sizing.maxWidth,
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
    backgroundColor: theme === "light" ? "#D3D6DA" : "#818384",
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
    color: theme === "light" ? "black" : "#F8F8F8",
  },
  activeKey: {
    backgroundColor: theme === "light" ? "#D3D6DA" : "#818384",
  },
});
