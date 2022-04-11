import React from "react";
import { Box, Button } from "@mui/material";
import TodoAdder from "./todoAdder/todoAdder.jsx";
import TodoList from "./todosList";
import Sorter from "./sorter/sorter";
import { sorterFuncs, sorts } from "./sorter/sorterFuncs.js";
import ClearOptions from "./clearOptions.jsx";
import DayPicker from "./dayPicker";
import { useTheme } from "../context/theme";
import { DateTime } from "luxon";

const groupBy = (list, keyGetter) => {
  const out = {};
  list.forEach((x) => {
    const key = keyGetter(x);
    out[key] = [...(out[key] || []), x];
  });
  return out;
};

const Main = () => {
  // get a working groupBy function
  const [todos, setTodos] = React.useState(() => {
    const localTodos = localStorage.getItem("todos");
    if (!localTodos || !Object.keys(JSON.parse(localTodos)).length) return {};

    const timeTodos = groupBy(
      JSON.parse(localTodos).map((todo) => ({
        ...todo,
        dateDue: DateTime.fromISO(todo.dateDue).toLocal().toISO(),
        dateAdded: DateTime.fromISO(todo.dateAdded).toLocal().toISO(),
      })),
      (todo) => DateTime.fromISO(todo.dateDue).toLocal().toISO().slice(0, 10)
    );

    const finalTodos = {};
    Object.keys(timeTodos).forEach((key) => {
      finalTodos[key] = { todos: timeTodos[key], id: Math.random().toString() };
    });
    return finalTodos;
  });

  const getLatestTodosTab = (todosArg) =>
    Object.keys(todosArg).reduce((a, b) => (a > b ? a : b));

  const [todosTab, setTodosTab] = React.useState(
    () => localStorage.getItem("todosTab") || getLatestTodosTab(todos)
  );
  const [sortBy, setSortBy] = React.useState(sorts.dateAdded);
  const [theme, setTheme] = useTheme();

  const renewListener = (newTodos) => {
    window.onbeforeunload = () => {
      const todosArr = [];
      Object.keys(newTodos).map((key) =>
        todosArr.push(
          ...newTodos[key].todos.map((todo) => ({
            ...todo,
            dateDue: DateTime.fromISO(todo.dateDue).toUTC().toISO(),
            dateAdded: DateTime.fromISO(todo.dateAdded).toUTC().toISO(),
          }))
        )
      );
      localStorage.setItem("todos", JSON.stringify(todosArr));
    };
  };

  const handleSetTodosTab = (tab) => {
    setTodosTab(tab);
    localStorage.setItem("todosTab", tab);
  };

  const applyNewTodos = (newTodos) => {
    setTodos(newTodos);
    renewListener(newTodos);
  };

  const handleChangeTodos = (newTodos) => {
    const newTodosObj = {
      ...todos,
    };

    if (newTodos.length) {
      newTodosObj[todosTab] = { ...todos[todosTab], todos: newTodos };
    } else {
      delete newTodosObj[todosTab];
      const tab = getLatestTodosTab(newTodosObj);
      setTodosTab(tab);
      localStorage.setItem("todosTab", tab);
    }

    applyNewTodos(newTodosObj);
  };

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
    renewListener(newTodos);
  };

  // pass a different todos change handler to ClearOptions

  const sortedTodos = [...(todos[todosTab]?.todos || [])];
  sortedTodos.sort(sorterFuncs[sortBy]);
  sortedTodos.sort(sorterFuncs.isDone);

  const sortedDays = Object.keys(todos);
  sortedDays.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

  return (
    <Box sx={{ maxWidth: "605px" }}>
      <TodoAdder addTodo={hanldeAddTodo} />
      {Object.keys(todos).length ? (
        <>
          <DayPicker
            days={sortedDays}
            day={todosTab}
            setDay={handleSetTodosTab}
          />
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
            setTodosTab={handleSetTodosTab}
            todos={todos}
            setTodos={applyNewTodos}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default Main;
