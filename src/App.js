import Box from "@mui/material/Box";
import { ThemeProvider } from "./context/theme";
import TodoAdder from "./components/todoAdder";

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
        <TodoAdder />
      </Box>
    </ThemeProvider>
  );
}

export default App;
