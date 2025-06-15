export const lightTheme = {
  primary: "blue",
  secondary: "green",
  background: "#F3F4F6",
  text: "#000000",
  surface: "#D3D6DA",
  elevatedSurface: "#F3F4F6",
  border: "#CCC",
  lightBulbBorder: "#000000",
  lightBulbFill: "#FFD700",
  elevatedButton: "black"
};

export const darkTheme = {
  primary: "#448AFF",
  secondary: "#8BC34A",
  background: "#121212",
  text: "#F8F8F8",
  surface: "#818384",
  elevatedSurface: "#2C2C2C",
  border: "#313131",
  lightBulbBorder: "#F8F8F8",
  lightBulbFill: "#FFFF00DD",
  elevatedButton: "#818384"
};

export type Theme = typeof lightTheme;
