import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";

const ClearButton = ({
  children,
  color,
  onClearTab,
  onClearAll,
  mr,
  withOptions,
}) => {
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        variant="contained"
        color={color}
        onClick={(e) =>
          withOptions ? setAnchorEl(e.currentTarget) : onClearTab()
        }
        sx={mr ? { mr: 1 } : null}
      >
        {children}
      </Button>
      {withOptions && (
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
      )}
    </>
  );
};

const ClearOptions = ({ todosTab, todos, setTodos }) => {
  const filterDone = (key) => ({
    ...todos[key],
    todos: todos[key].todos.filter((todo) => !todo.dateDone),
  });

  const handleClearTabDone = () =>
    setTodos({
      ...todos,
      [todosTab]: filterDone(todosTab),
    });

  const handleClearAllDone = () => {
    const newTodos = { ...todos };
    Object.keys(todos).forEach((key) => {
      const newTodosTab = filterDone(key);

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

  const withOptions = Object.keys(todos).length > 1;

  return (
    <Box>
      <ClearButton
        withOptions={withOptions}
        color="error"
        onClearAll={handleClearAll}
        onClearTab={handleClearTab}
        mr
      >
        Clear All
      </ClearButton>
      <ClearButton
        withOptions={withOptions}
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
