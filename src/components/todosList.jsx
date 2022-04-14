import { List, Paper, Typography } from "@mui/material";
import Todo from "./todo/todo";

const TodosList = ({ todos, setTodos }) => {
  return (
    <Paper
      sx={{
        mt: 1,
        pb: 1,
        minHeight: "15vh",
        maxHeight: "35vh",
        overflowY: "overlay",
        display: "flex",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
        backgroundColor: (theme) => theme.palette.custom.list,
      }}
      elevation={1}
      square
    >
      {todos.length ? (
        <List disablePadding sx={{ flexGrow: 1 }}>
          {todos.map((todo) => (
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
