import React from "react";
import { Box, Button } from "@mui/material";
import TodoAdder from "./todoAdder/todoAdder.jsx";
import TodoList from "./todosList";
import Sorter from "./sorter/sorter";
import { sorterFuncs, sorts } from "./sorter/sorterFuncs.js";
import ClearOptions from "./clearOptions.jsx";
import { useTheme } from "../context/theme";

const Main = () => {
  const [todos, setTodos] = React.useState(() => {
    const localTodos = localStorage.getItem("todos");
    return localTodos ? JSON.parse(localTodos) : [];
  });
  const [sortBy, setSortBy] = React.useState(sorts.dateAdded);
  const [theme, setTheme] = useTheme();

  const handleChangeTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const sortedTodos = [...todos];
  sortedTodos.sort(sorterFuncs[sortBy]);
  sortedTodos.sort(sorterFuncs.isDone);

  return (
    <Box sx={{ maxWidth: "605px" }}>
      <TodoAdder addTodo={(todo) => handleChangeTodos([todo, ...todos])} />
      {todos.length ? <Sorter sortBy={sortBy} setSortBy={setSortBy} /> : null}
      <TodoList todos={sortedTodos} setTodos={handleChangeTodos} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Button
          variant="outlined"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "light" : "dark"} Theme
        </Button>
        {todos.length ? (
          <ClearOptions todos={todos} setTodos={handleChangeTodos} />
        ) : null}
      </Box>
    </Box>
  );
};

export default Main;
