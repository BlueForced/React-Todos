import { Box, Button } from "@mui/material";

const ClearOptions = ({ todos, setTodos }) => {
  const handleClearDone = () => {
    setTodos(todos.filter((todo) => !todo.dateDone));
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row-reverse", mt: 1 }}>
      <Button
        variant="contained"
        sx={{ ml: 1 }}
        color="success"
        onClick={handleClearDone}
      >
        Clear Done
      </Button>
      <Button variant="contained" color="error" onClick={handleClearAll}>
        Clear All
      </Button>
    </Box>
  );
};

export default ClearOptions;
