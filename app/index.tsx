import QuotiacApp from "@/App";
import { ThemeProvider } from "../theme/ThemeContext";

export default function Index() {
  return (
    <ThemeProvider>
      <QuotiacApp />
    </ThemeProvider>
  );
}
