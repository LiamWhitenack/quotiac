import React, { useState } from "react";
import { ScrollView, View, LayoutChangeEvent } from "react-native";
import { createStyles } from "./styles";
// import sizing from "../sizing/sizing";
import getIcons from "./get-icons";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";

interface QuoteDisplayProps {
  state: GameState;
  updateState: () => void;
  onOverflowChange?: (isOverflowing: boolean) => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ state, updateState, onOverflowChange }) => {
  // ((sizing.quoteHeight * sizing.screenWidth) / quote.length) ** 0.5;
  // const numberOfIconsInColumn = sizing.quoteHeight / sizing.iconSize;
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  // Used to track the height of the container when initially rendered
  const handleLayout = (e: LayoutChangeEvent) => {
    const newHeight = e.nativeEvent.layout.height;
    setContainerHeight(newHeight);
    maybeNotifyOverflow(newHeight, contentHeight);
  };

  // Used to track the height of the content when it changes
  const handleContentSizeChange = (w: number, h: number) => {
    setContentHeight(h);
    maybeNotifyOverflow(containerHeight, h);
  };

  // Notify the parent component if the content overflows the container
  const maybeNotifyOverflow = (container: number, content: number) => {
    if (onOverflowChange) {
      onOverflowChange(content > container);
    }
  };
  return (
    <ScrollView 
      scrollEnabled={contentHeight > containerHeight}
      contentContainerStyle={styles.scrollContainer}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
    >
      <View style={styles.verticalContainer}>
        <View style={styles.horizontalContainer}>
          {getIcons(state, updateState, theme)}
        </View>
      </View>
    </ScrollView>
  );
};

export default QuoteDisplay;
