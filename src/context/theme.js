import React from "react";
import {
  CssBaseline,
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

const ThemeContext = React.createContext();
ThemeContext.displayName = "themeCtx";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState("dark");
  const currentTheme = createTheme({ palette: { mode: theme } });

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => React.useContext(ThemeContext);

export { ThemeProvider, useTheme };
