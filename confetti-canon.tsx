import React, { useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";

// type FireConfettiProps = {
//   trigger: boolean;
//   onDone?: () => void;
// };

// export function FireConfetti({ trigger, onDone }: FireConfettiProps) {
//   const [shouldShow, setShouldShow] = useState(trigger);

//   React.useEffect(() => {
//     if (trigger) {
//       setShouldShow(true);
//     }
//   }, [trigger]);

//   if (!shouldShow) return null;

//   return (
//     <ConfettiCannon
//       count={200}
//       origin={{ x: -10, y: 0 }}
//       fadeOut
//       autoStart
//       onAnimationEnd={() => {
//         setShouldShow(false);
//         if (onDone) onDone();
//       }}
//     />
//   );
// }

export function useConfetti() {
  const [fire, setFire] = useState(false);

  const confetti = fire ? (
    <ConfettiCannon
      count={200}
      origin={{ x: -10, y: 0 }}
      fadeOut
      autoStart
      onAnimationEnd={() => setFire(false)}
    />
  ) : null;

  const fireConfetti = () => setFire(true);

  return { confetti, fireConfetti };
}
