import React from "react";
import {
  ListItem,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import { DateTime } from "luxon";
import useIsMounted from "../../hooks/useIsMounted";
import importanceTitles from "../todoAdder/importanceTitles";
import { StrikeAnimationTypo, StrikeTypo, TimeTypo } from "./styled";

const ButtonTooltip = ({ children, ...props }) => {
  return (
    <Tooltip
      disableInteractive
      PopperProps={{ disablePortal: true }}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

const Todo = ({ todo, todos, setTodos }) => {
  const [dateDue, dateDone] = React.useMemo(
    () => [
      DateTime.fromISO(todo.dateDue)
        .toLocal()
        .toLocaleString(DateTime.DATETIME_SHORT),
      todo.dateDone &&
        DateTime.fromISO(todo.dateDone)
          .toLocal()
          .toLocaleString(DateTime.DATETIME_SHORT),
    ],
    [todo]
  );

  const [isLastDone, setIsLastDone] = React.useState(false);
  const isMounted = useIsMounted();

  const handleDone = () => {
    setIsLastDone(true);
    const newTodo = { ...todo, dateDone: DateTime.now().toUTC().toString() };
    const newTodos = [...todos];
    newTodos[todos.indexOf(todo)] = newTodo;
    setTodos(newTodos);
  };

  const handleUndo = () => {
    const newTodo = { ...todo, dateDone: null };
    const newTodos = [...todos];
    newTodos[todos.indexOf(todo)] = newTodo;
    setTodos(newTodos);
  };

  const handleDelete = () =>
    setTodos(todos.filter((filterTodo) => filterTodo.id !== todo.id));

  let TypoComponent = Typography;

  if (dateDone) {
    if (isLastDone) {
      TypoComponent = StrikeAnimationTypo;
      setTimeout(() => {
        isMounted.current && setIsLastDone(false);
      }, 1000);
    } else {
      TypoComponent = StrikeTypo;
    }
  }

  return (
    <ListItem
      divider
      sx={{
        display: "flex",
        justifyContent: "space-between",
        overflowWrap: "break-word",
        wordBreak: "break-all",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <TypoComponent sx={{ mr: 1 }}>{todo.text}</TypoComponent>
        <TimeTypo variant="caption">Date Due: {dateDue}</TimeTypo>
        {dateDone && (
          <TimeTypo variant="caption">Date Done: {dateDone}</TimeTypo>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Chip
          label={todo.importance}
          sx={{
            mr: 2,
            backgroundColor: ({ palette }) =>
              !dateDone
                ? palette[importanceTitles[todo.importance].color][
                    importanceTitles[todo.importance].colorType
                  ]
                : palette.grey[600],
            color: ({ palette }) =>
              palette.mode === "dark" ? "black" : "white",
          }}
        />
        {!dateDone ? (
          <ButtonTooltip title="Finish">
            <IconButton sx={{ mr: 1 }} onClick={handleDone}>
              <CheckIcon color="success" />
            </IconButton>
          </ButtonTooltip>
        ) : (
          <ButtonTooltip title="Undo">
            <IconButton sx={{ mr: 1 }} onClick={handleUndo}>
              <ReplayIcon />
            </IconButton>
          </ButtonTooltip>
        )}
        <ButtonTooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon color={dateDone ? "success" : "error"} />
          </IconButton>
        </ButtonTooltip>
      </Box>
    </ListItem>
  );
};

export default Todo;
