import Box from "@mui/material/Box";
import { ThemeProvider } from "./context/theme";
import Main from "./components/main";
import Footer from "./components/footer";

function App() {
  return (
    <ThemeProvider>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Main />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
