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
  const containerHeight =
    sizing.screenHeight - sizing.topBarHeight - sizing.keyboardHeight;

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
          scrollIndicatorInsets={{ bottom: sizing.keyboardHeight }}
        >
          {children}
        </ScrollView>
      );
    } else {
      return (
        <View style={{ alignContent: "flex-start", flexDirection: "column" }}>
          <View
            style={[
              styles.verticalContainer,
              {
                height: containerHeight,
              },
            ]}
          >
            {children}
          </View>
        </View>
      );
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
