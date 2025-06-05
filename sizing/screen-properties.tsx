import { Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const isMobile = Platform.OS === "ios" || Platform.OS === "android";

export { screenWidth, screenHeight, isMobile };
