import React, { ReactNode, useState } from "react";
import { ScrollView, View, LayoutChangeEvent } from "react-native";
import { createStyles } from "./styles";
// import sizing from "../sizing/sizing";
import GameState from "@/state/state";
import { useTheme } from "@/theme/ThemeContext";
import sizing from "@/sizing/sizing";
import { IconsWithHeight } from "./get-icons";

interface QuoteDisplayProps {
  state: GameState;
  updateState: () => void;
  onOverflowChange?: (isOverflowing: boolean) => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
  state,
  updateState,
  onOverflowChange,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [containerHeight, setContainerHeight] = useState(
    sizing.screenHeight - sizing.topBarHeight - sizing.keyboardHeight
  );
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

  const ConditionalScrollView = ({ children }: { children: ReactNode }) => {
    if (state.quoteHeight > containerHeight) {
      return (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingBottom: sizing.keyboardHeight + 10,
              paddingTop: sizing.iconSize,
            },
          ]}
          showsVerticalScrollIndicator={false}
          onLayout={handleLayout}
          onContentSizeChange={handleContentSizeChange}
          scrollIndicatorInsets={{ bottom: sizing.keyboardHeight }}
        >
          {children}
        </ScrollView>
      );
    } else {
      return <View style={styles.verticalContainer}>{children}</View>;
    }
  };

  return (
    <ConditionalScrollView>
      <IconsWithHeight
        containerHeight={containerHeight}
        state={state}
        updateState={updateState}
        theme={theme}
      />
    </ConditionalScrollView>
  );
};

export default QuoteDisplay;
