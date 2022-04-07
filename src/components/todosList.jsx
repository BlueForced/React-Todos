import { List, Paper, Typography } from "@mui/material";
import Todo from "./todo";

const TodosList = ({ todos, setTodos }) => {
  return (
    <Paper
      sx={{
        mt: 1,
        pb: 1,
        minHeight: "15vh",
        maxHeight: "35vh",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
      }}
      elevation={1}
      square
    >
      {todos.length ? (
        <List disablePadding sx={{ flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <Todo todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
          ))}
        </List>
      ) : (
        <Typography variant="h5" component="label" sx={{ mt: 6 }}>
          No Todos to Display
        </Typography>
      )}
    </Paper>
  );
};

export default TodosList;