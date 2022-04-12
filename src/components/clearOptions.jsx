import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";

const ClearButton = ({ children, color, onClearTab, onClearAll, mr }) => {
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        variant="contained"
        color={color}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={mr ? { mr: 1 } : null}
      >
        {children}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onClearTab();
          }}
        >
          Only this Tab
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onClearAll();
          }}
        >
          All Tabs
        </MenuItem>
      </Menu>
    </>
  );
};

/*
      <Button variant="contained" color="error" onClick={handleClearAll}>
        Clear All
      </Button>
      <Button
        variant="contained"
        sx={{ ml: 1 }}
        color="success"
        onClick={handleClearDone}
      >
        Clear Done
      </Button>
*/

const ClearOptions = ({ todosTab, todos, setTodos }) => {
  const handleClearTabDone = () =>
    setTodos({
      ...todos,
      [todosTab]: {
        ...todos[todosTab],
        todos: todos[todosTab].todos.filter((todo) => !todo.dateDone),
      },
    });

  const handleClearAllDone = () => {
    const newTodos = { ...todos };
    Object.keys(todos).forEach((key) => {
      const newTodosTab = {
        ...todos[key],
        todos: todos[key].todos.filter((todo) => !todo.dateDone),
      };
      newTodos[key] = newTodosTab.todos.length ? newTodosTab : undefined;
      if (newTodosTab.todos.length) {
        newTodos[key] = newTodosTab;
      } else {
        delete newTodos[key];
      }
    });
    setTodos(newTodos);
  };

  const handleClearTab = () => {
    const newTodos = { ...todos };
    delete newTodos[todosTab];
    setTodos(newTodos);
  };

  const handleClearAll = () => setTodos({});

  return (
    <Box>
      <ClearButton
        color="error"
        onClearAll={handleClearAll}
        onClearTab={handleClearTab}
        mr
      >
        Clear All
      </ClearButton>
      <ClearButton
        color="success"
        onClearAll={handleClearAllDone}
        onClearTab={handleClearTabDone}
      >
        Clear Done
      </ClearButton>
    </Box>
  );
};

export default ClearOptions;
