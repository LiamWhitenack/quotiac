import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme, Theme, nflTheme } from "./themes";
import { todayString } from "../utils";

interface ThemeContextType {
  theme: Theme;
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  mode: "light",
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = Appearance.getColorScheme(); // Detect system default
  const [mode, setMode] = useState<"light" | "dark">(colorScheme ?? "light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  let theme: Theme;

  if (todayString() == "20250904" || todayString() == "20260201") {
    theme = nflTheme;
  } else if (mode === "light") {
    theme = lightTheme;
  } else {
    theme = darkTheme
  }

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) setMode(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
