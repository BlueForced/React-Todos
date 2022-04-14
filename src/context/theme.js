import React from "react";
import {
  CssBaseline,
  createTheme,
  ThemeProvider as MuiThemeProvider,
  GlobalStyles,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import DarkBg from "../assets/backgrounds/dark.jpg";
import LightBg from "../assets/backgrounds/light.jpg";

const ThemeContext = React.createContext();
ThemeContext.displayName = "themeCtx";

const lightTheme = {
  dayPickerScroll: {
    thumb: grey[400],
    hover: grey[500],
  },
  list: "#ffffff99",
  backgroundImage: `url(${LightBg})`,
  backgroundColor: "#dddddd",
  textShadow: "",
};

const darkTheme = {
  dayPickerScroll: {
    thumb: "#f3e5f588",
    hover: "#f3e5f577",
  },
  list: "#12121299",
  backgroundImage: `url(${DarkBg})`,
  backgroundColor: "#c962cd",
  textShadow: "1px 1px #00000044",
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("todosTheme") || "dark"
  );
  const currentTheme = createTheme({
    palette: { mode: theme, custom: theme === "dark" ? darkTheme : lightTheme },
  });

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("todosTheme", newTheme);
  };

  return (
    <ThemeContext.Provider value={[theme, handleSetTheme]}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline enableColorScheme />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: currentTheme.palette.custom.backgroundColor,
              backgroundImage: currentTheme.palette.custom.backgroundImage,
            },
            input: {
              textShadow: currentTheme.palette.custom.textShadow,
            },
            ".MuiInputLabel-root, .MuiInputBase-input": {
              textShadow: currentTheme.palette.custom.textShadow,
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => React.useContext(ThemeContext);

export { ThemeProvider, useTheme };
