import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import React, { useRef } from "react";
import { View, Text } from "react-native";
import getIcons from "./get-icons";
import styles from "./styles";
import GameState from "@/state/state";

export function useViewShotShare(state: GameState) {
  const viewShotRef = useRef<ViewShot>(null);

  const ViewShotComponent = () => (
    <ViewShot
      ref={viewShotRef}
      options={{ format: "png", quality: 1 }}
      style={{
        position: "absolute",
        top: -9999,
        left: -9999,
        backgroundColor: "white",
        padding: 20,
        width: 300,
        borderRadius: 8,
      }}
    >
      <View style={styles.shareHorizontalContainer}>
        <View style={styles.shareVerticalContainer}>{getIcons(state)}</View>
      </View>
      <Text
        style={{
          marginTop: 10,
          textAlign: "center",
          color: "black",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Go to https://codiac.expo.app to play!
      </Text>
    </ViewShot>
  );

  async function handleShare() {
    // @ts-ignore
    const uri = await viewShotRef.current?.capture?.({
      format: "png",
      quality: 1,
    });

    if (!uri) throw new Error("Failed to capture image");

    await Sharing.shareAsync(uri);
  }

  return { ViewShotComponent, handleShare };
}
