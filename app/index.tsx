import CodiacApp from "@/App";
import { ThemeProvider } from "../theme/ThemeContext";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <ThemeProvider>
      <CodiacApp />
    </ThemeProvider>
  );
}
