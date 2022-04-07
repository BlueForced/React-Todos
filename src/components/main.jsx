import React from "react";
import { Box } from "@mui/material";
import TodoAdder from "./todoAdder/todoAdder.jsx";
import TodoList from "./todosList";
import Sorter from "./sorter/sorter";
import { sorterFuncs, sorts } from "./sorter/sorterFuncs.js";
import ClearOptions from "./clearOptions.jsx";

const Main = () => {
  const [todos, setTodos] = React.useState(() => {
    const localTodos = localStorage.getItem("todos");
    return localTodos ? JSON.parse(localTodos) : [];
  });
  const [sortBy, setSortBy] = React.useState(sorts.dateAdded);

  const handleSetTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const sortedTodos = [...todos];
  sortedTodos.sort(sorterFuncs[sortBy]);
  sortedTodos.sort(sorterFuncs.isDone);

  return (
    <Box>
      <TodoAdder addTodo={(todo) => setTodos([todo, ...todos])} />
      {todos.length ? (
        <Sorter setTodos={setTodos} sortBy={sortBy} setSortBy={setSortBy} />
      ) : null}
      <TodoList todos={sortedTodos} setTodos={handleSetTodos} />
      {todos.length ? <ClearOptions setTodos={setTodos} /> : null}
    </Box>
  );
};

export default Main;
