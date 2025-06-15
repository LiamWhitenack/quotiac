import { Platform } from "react-native";
import { screenWidth, screenHeight, isMobile } from "./screen-properties"

class Sizing {
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
    iconSize: number;

    constructor() {
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;

        this.maxHeight = Math.min(screenHeight, 600);
        this.maxWidth = Math.min(screenWidth, 600);
        this.isMobile = isMobile;

        this.keyboardMargin = Math.floor(this.maxWidth * 0.05);
        this.keyboardKeyGap = Math.floor(this.maxWidth * 0.0075);
        this.keyboardKeyWidth = Math.floor(
            (this.maxWidth - this.keyboardMargin * 2 - this.keyboardKeyGap * 18) / 10
        );
        this.keyboardHeight = this.keyboardMargin * 6 + 150;

        this.topBarHeight = 50;
        this.quoteHeight = this.keyboardHeight - this.topBarHeight;

        this.iconSize = 32;
    }

    isMobileWeb(navigator: Navigator) {
        if (Platform.OS !== "web") return false;
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    };
}

const sizing = new Sizing();
export default sizing;
