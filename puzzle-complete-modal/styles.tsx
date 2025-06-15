import sizing from "@/sizing/sizing";
import { Modal, Platform, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: sizing.maxWidth * 0.8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 0, // or adjust to match your container padding
    paddingBottom: 25,
  },
  shareHorizontalContainer: {
    width: sizing.maxWidth * 0.7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  shareVerticalContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  shareMessage: {
    marginTop: 10,
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  resultsText: {
    fontSize: 24, // bigger for clearer emoji
    lineHeight: 32, // add vertical breathing room
    marginBottom: 24,
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Apple Color Emoji",
      android: "Noto Color Emoji",
      default: "Segoe UI Emoji",
    }),
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)", // 👈 this is what darkens the background
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
