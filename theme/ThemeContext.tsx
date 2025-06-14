import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { lightTheme, darkTheme, Theme } from "./themes";

interface ThemeContextType {
  theme: Theme;
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  mode: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); // Detect system default
  const [mode, setMode] = useState<"light" | "dark">(colorScheme ?? "light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

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