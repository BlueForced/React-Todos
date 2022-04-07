import React from "react";
import {
  CssBaseline,
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

const ThemeContext = React.createContext();
ThemeContext.displayName = "themeCtx";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("todosTheme") || "dark"
  );
  const currentTheme = createTheme({ palette: { mode: theme } });

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("todosTheme", newTheme);
  };

  return (
    <ThemeContext.Provider value={[theme, handleSetTheme]}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => React.useContext(ThemeContext);

export { ThemeProvider, useTheme };
