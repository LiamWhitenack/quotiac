import React, { ReactNode, useRef, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { createStyles } from "./styles";
import GameState from "@/src/state";
import { useTheme } from "@/src/theme/ThemeContext";
import sizing from "@/src/sizing/sizing";
import { IconsWithHeight } from "./get-icons";

interface QuoteDisplayProps {
  state: GameState;
  updateState: () => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ state, updateState }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const containerHeight =
    sizing.screenHeight - sizing.topBarHeight - sizing.keyboardHeight;

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollOffsetRef = useRef(0);

  const canScroll = (state.quoteHeight * sizing.quoteSafeAreaCoefficient) > containerHeight;

  // Save scroll position on scroll 
  // @ts-ignore
  const onScroll = (event) => {
    console.log(event)
    scrollOffsetRef.current = event.nativeEvent.contentOffset.y;
  };

  // Restore scroll position when switching back to ScrollView or on rerender
  useEffect(() => {
    if (canScroll && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: scrollOffsetRef.current,
        animated: false,
      });
    }
  }, [canScroll, state]); // Also run when canScroll or state changes

  // Conditional rendering of ScrollView or plain View
  const ConditionalScrollView = ({ children }: { children: ReactNode }) => {
    if (canScroll) {
      return (
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingBottom: sizing.keyboardHeight + 10,
              paddingTop: sizing.iconSize,
            },
          ]}
          showsVerticalScrollIndicator={false}
          scrollIndicatorInsets={{ bottom: sizing.keyboardHeight }}
          onScroll={onScroll}
          scrollEventThrottle={16}
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
