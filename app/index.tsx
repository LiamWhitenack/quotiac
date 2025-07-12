import CodiacApp from "@/App";
import { ThemeProvider } from "../theme/ThemeContext";

export default function Index() {
  return (
    <ThemeProvider>
      <CodiacApp />
    </ThemeProvider>
  );
}
