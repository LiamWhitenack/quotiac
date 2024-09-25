import { StyleSheet } from "react-native";
export const mainWindowStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    alignContent: "flex-start",
    marginBottom: 20,
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
  emptyIconContainer: {
    margin: 10,
    alignItems: "center",
  },
});
