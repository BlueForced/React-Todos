import Box from "@mui/material/Box";
import { ThemeProvider } from "./context/theme";
import { KeyboardOpenProvider } from "./context/keyboardOpen";
import Main from "./components/main";
import Footer from "./components/footer";

function App() {
  return (
    <ThemeProvider>
      <KeyboardOpenProvider>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            flexDirection: "column",
            justifyContent: ({ isMobile }) =>
              isMobile ? "flexStart" : "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            overflow: ({ isMobileLandscape }) =>
              isMobileLandscape ? "scroll" : "hidden",
          }}
        >
          <Main />
        </Box>
        <Footer />
      </KeyboardOpenProvider>
    </ThemeProvider>
  );
}

export default App;
