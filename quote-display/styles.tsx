import { StyleSheet } from "react-native";
import sizing from "@/sizing/sizing";

const styles = StyleSheet.create({
  iconStyle: {
    color: "black",
  },
  spaceIconStyle: {
    color: "transparent",
  },
  verticalContainer: {
    flex: 5,
    flexDirection: "column",
    alignContent: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  horizontalContainer: {
    maxWidth: sizing.maxWidth - 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  quote: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default styles;
