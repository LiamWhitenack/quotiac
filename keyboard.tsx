import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import sizing from "./sizing";

const LetterKeyboardDisplay: React.FC = ({}) => {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.split("").map((letter) => (
            <TouchableOpacity key={letter} style={styles.key}>
              <Text style={styles.keyText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1, // Ensure the main container takes the full height
    justifyContent: "flex-end",
    // alignItems: "flex-end",
    paddingTop: 50,
    backgroundColor: "#F3F4F6",
    maxWidth: sizing.maxWidth,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: sizing.keyboardMargin,
    marginHorizontal: sizing.keyboardMargin,
  },
  key: {
    width: sizing.keyboardKeyWidth, // Each key takes equal space in the row
    height: 50, // Fixed height for keys
    justifyContent: "center",
    alignItems: "center",
    margin: sizing.keyboardKeyGap, // Adjust margin for spacing
    backgroundColor: "#D3D6DA",
    borderRadius: 5,
  },
  keyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activeKey: {
    backgroundColor: "#D3D6DA",
  },
  disabledKey: {
    backgroundColor: "#787C7E",
  },
});

export default LetterKeyboardDisplay;
