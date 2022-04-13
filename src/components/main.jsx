import React from "react";
import { Box, Button } from "@mui/material";
import TodoAdder from "./todoAdder/todoAdder.jsx";
import TodoList from "./todosList";
import Sorter from "./sorter/sorter";
import { sorterFuncs, sorts } from "./sorter/sorterFuncs.js";
import ClearOptions from "./clearOptions.jsx";
import DayPicker from "./dayPicker/dayPicker";
import { useTheme } from "../context/theme";
import { DateTime } from "luxon";

const getLatestTab = (todosArg) => {
  const keys = Object.keys(todosArg);
  return keys.length
    ? Object.keys(todosArg).reduce((a, b) => (a > b ? a : b))
    : undefined;
};

const localDate = (date) => DateTime.fromISO(date).toLocal().toISO();

const Main = () => {
  const [todos, setTodos] = React.useState(() => {
    const out = {};
    const localTodos = localStorage.getItem("todos");
    if (!localTodos || !Object.keys(JSON.parse(localTodos)).length) return out;

    JSON.parse(localTodos)
      .map((todo) => ({
        ...todo,
        dateDue: localDate(todo.dateDue),
        dateAdded: localDate(todo.dateAdded),
      }))
      .forEach((todo) => {
        const key = localDate(todo.dateDue).slice(0, 10);
        out[key] = {
          id: out[key]?.id || Math.random().toString(),
          todos: [...(out[key]?.todos || []), todo],
        };
      });

    return out;
  });

  const [todosTab, setTodosTab] = React.useState(
    () => localStorage.getItem("todosTab") || getLatestTab(todos)
  );
  const [sortBy, setSortBy] = React.useState(sorts.dateAdded);
  const [theme, setTheme] = useTheme();

  React.useEffect(() => {
    window.onbeforeunload = () => {
      const todosArr = [];
      Object.keys(todos).map((key) =>
        todosArr.push(
          ...todos[key].todos.map((todo) => ({
            ...todo,
            dateDue: DateTime.fromISO(todo.dateDue).toUTC().toISO(),
            dateAdded: DateTime.fromISO(todo.dateAdded).toUTC().toISO(),
          }))
        )
      );
      localStorage.setItem("todos", JSON.stringify(todosArr));
    };
  }, [todos]);

  React.useLayoutEffect(() => {
    if (Object.keys(todos).length && !todos[todosTab]?.todos?.length) {
      const newTodos = { ...todos };
      delete newTodos[todosTab];
      setTodos(newTodos);
      setTodosTab(getLatestTab(newTodos));
    }
  }, [todos, todosTab]);

  React.useEffect(() => {
    localStorage.setItem("todosTab", todosTab);
  }, [todosTab]);

  const handleChangeTodos = (newTodos) =>
    setTodos({
      ...todos,
      [todosTab]: { ...todos[todosTab], todos: newTodos },
    });

  const hanldeAddTodo = (newTodo) => {
    const todoDay = newTodo.dateDue.slice(0, 10);

    const newTodos = {
      ...todos,
      [todoDay]: {
        id: todos[todoDay]?.id || Math.random().toString(),
        todos: [newTodo, ...(todos[todoDay]?.todos || [])],
      },
    };

    if (todosTab !== todoDay) {
      setTodosTab(todoDay);
    }
    setTodos(newTodos);
  };

  const sortedTodos = [...(todos[todosTab]?.todos || [])];
  sortedTodos.sort(sorterFuncs[sortBy]);

  const sortedDays = Object.keys(todos);
  sortedDays.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

  return (
    <Box sx={{ maxWidth: "605px" }}>
      <TodoAdder addTodo={hanldeAddTodo} />
      {Object.keys(todos).length ? (
        <>
          <DayPicker days={sortedDays} day={todosTab} setDay={setTodosTab} />
          <Sorter sortBy={sortBy} setSortBy={setSortBy} />
        </>
      ) : null}
      <TodoList todos={sortedTodos} setTodos={handleChangeTodos} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Button
          variant="outlined"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "light" : "dark"} Theme
        </Button>
        {Object.keys(todos).length ? (
          <ClearOptions
            todosTab={todosTab}
            setTodosTab={setTodosTab}
            todos={todos}
            setTodos={setTodos}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default Main;
