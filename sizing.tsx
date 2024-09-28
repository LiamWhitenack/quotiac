import { Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class ScreenSizing {
  screenHeight: number;
  screenWidth: number;
  maxHeight: number;
  maxWidth: number;
  isMobile: boolean;
  keyboardMargin: number;
  keyboardKeyGap: number;
  keyboardKeyWidth: number;
  keyboardHeight: number;
  topBarHeight: number;
  quoteHeight: number;

  constructor() {
    this.screenHeight = screenHeight;
    this.screenWidth = screenWidth;

    this.maxHeight = Math.min(screenHeight, 600);
    this.maxWidth = Math.min(screenWidth, 600);
    this.isMobile = Platform.OS === "ios" || Platform.OS === "android";

    this.keyboardMargin = Math.floor(this.maxWidth * 0.05);
    this.keyboardKeyGap = Math.floor(this.maxWidth * 0.0075);
    this.keyboardKeyWidth = Math.floor(
      (this.maxWidth - this.keyboardMargin * 2 - this.keyboardKeyGap * 18) / 10
    );
    this.keyboardHeight = this.keyboardMargin * 6 + 150;

    this.topBarHeight = 50;
    this.quoteHeight = this.keyboardHeight - this.topBarHeight;
  }
}

const sizing = new ScreenSizing();
export default sizing;
