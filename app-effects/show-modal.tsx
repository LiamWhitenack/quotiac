import GameState from "@/state/state";
import { useEffect, useRef } from "react";

function useOnCompleteModal(
  state: GameState,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setPuzzleDetailsModalDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
  const hasShownModal = useRef(false);

  useEffect(() => {
    if (state.solved && !hasShownModal.current) {
      hasShownModal.current = true;
      const timeout = setTimeout(() => {
        setModalVisible(true);
        setPuzzleDetailsModalDisabled(false);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (!state.solved) {
      // reset the flag when puzzle is unsolved again (optional, depending on your app logic)
      hasShownModal.current = false;
      setModalVisible(false);
    }
  }); // Only re-run when solved status changes
}

function usePuzzleDetailsModal(
  state: GameState,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {});
}

export { useOnCompleteModal, usePuzzleDetailsModal };
