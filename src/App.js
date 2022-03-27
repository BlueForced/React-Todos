import Container from "@mui/material/Container";
import { ThemeProvider } from "./context/theme";

function App() {
  return (
    <ThemeProvider>
      <Container
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
        <div>hi</div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
