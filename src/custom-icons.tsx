import { createIconSet } from "@expo/vector-icons";
import ioniconGlyphMap from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json";

const CustomIonicons = createIconSet(
  ioniconGlyphMap,
  "Ionicons",
  require("../assets/fonts/Ionicons.ttf")
);

export default CustomIonicons;
