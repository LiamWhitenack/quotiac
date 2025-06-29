import GameState from "@/state/state";
import { useEffect } from "react";
import { Animated } from "react-native";

function useOnCompleteModal(
  state: GameState,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    if (state.solved) {
      const timeout = setTimeout(() => {
        setModalVisible(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setModalVisible(false);
    }
  }, [setModalVisible, state.solved]);
}

function usePuzzleDetailsModal(
  state: GameState,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {});
}

export { useOnCompleteModal, usePuzzleDetailsModal };
