import CodiacApp from "@/App";
import { ThemeProvider } from "../src/theme/ThemeContext";

export default function Index() {
  return (
    <ThemeProvider>
      <CodiacApp />
    </ThemeProvider>
  );
}
