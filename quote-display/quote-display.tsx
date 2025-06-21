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

  const ConditionalScrollView = ({ children }: { children: ReactNode }) => {
    if (contentHeight > containerHeight) {
      return (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: sizing.keyboardHeight + 10 },
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
      <View style={styles.horizontalContainer}>
        <IconsWithHeight
          state={state}
          updateState={updateState}
          theme={theme}
          onHeightMeasured={(height) => {
            setContentHeight(height);
          }}
        />
      </View>
    </ConditionalScrollView>
  );
};

export default QuoteDisplay;
