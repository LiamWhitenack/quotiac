import React, { ReactNode, useRef, useEffect, useState } from "react";
import { ScrollView, View, Animated, Easing, } from "react-native";
import { createStyles } from "./styles";
import GameState from "@/src/state";
import { useTheme } from "@/src/theme/ThemeContext";
import sizing from "@/src/sizing/sizing";
import { IconsWithHeight } from "./get-icons";
import SolvingLockAnimation from "../icon/solving-animation";
interface QuoteDisplayProps {
  state: GameState;
  updateState: () => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ state, updateState }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [startAnimation, setStartAnimation] = useState(false);
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

  const lockAnimationDuration = 3000;

  // crossfade animation value
  const fadeAnim = useRef(new Animated.Value(0)).current; // 0 = lock, 1 = congrats

  // Restore scroll position when switching back to ScrollView or on rerender
  useEffect(() => {
    if (canScroll && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: scrollOffsetRef.current,
        animated: false,
      });
    }


    if (state.solved) {
      console.log("solved?")
      fadeAnim.setValue(0);

      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setStartAnimation(true);

          // continue with the rest of the sequence
          Animated.sequence([
            Animated.delay(lockAnimationDuration),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ]).start();
        }
      });

    }
  }, [canScroll, state]);

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

  return (<>
    < Animated.View
      style={{
        opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
        marginBottom: sizing.keyboardHeight,
        marginTop: sizing.topBarHeight * 3,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }
      }
    >
      <SolvingLockAnimation duration={lockAnimationDuration} start={startAnimation} height={242} />
    </Animated.View >


    <Animated.View
      style={{
        opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
      }}
    >
      <ConditionalScrollView>
        <IconsWithHeight
          containerHeight={containerHeight}
          state={state}
          updateState={updateState}
          theme={theme}
        />
      </ConditionalScrollView>
    </Animated.View>
  </>
  );
};

export default QuoteDisplay;
