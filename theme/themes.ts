export const lightTheme = {
  selectedLetter: "blue",
  hint: "green",
  background: "#F3F4F6",
  text: "#000000",
  textInverse: "#F8F8F8",
  surface: "#D3D6DA",
  elevatedSurface: "#F3F4F6",
  border: "#CCC",
  lightBulbBorder: "#000000",
  lightBulbFill: "#FFD700",
  elevatedButton: "black",
  subtext: "#666666",

};

export const darkTheme = {
  selectedLetter: "#448AFF",
  hint: "#8BC34A",
  background: "#121212",
  text: "#F8F8F8",
  textInverse: "#000000",
  surface: "#818384",
  elevatedSurface: "#2C2C2C",
  border: "#313131",
  lightBulbBorder: "#F8F8F8",
  lightBulbFill: "#FFFF00DD",
  elevatedButton: "#818384",
  subtext: "#AAAAAA",
};

export type Theme = typeof lightTheme;
