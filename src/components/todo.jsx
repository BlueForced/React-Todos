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
import styled from "@emotion/styled";
import useIsMounted from "../hooks/useIsMounted";
import importanceTitles from "./todoAdder/importanceTitles";

const StrikeAnimationTypo = styled(Typography)`
  @keyframes strike {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  @keyframes opacity {
    100% {
      opacity: 50%;
    }
  }

  position: relative;
  animation: opacity 0.5s forwards;

  &::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.palette.text.primary};
    animation-name: strike;
    animation-duration: 0.5s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
`;

const StrikeTypo = styled(Typography)`
  opacity: 50%;
  text-decoration: line-through;
`;

const TimeTypo = styled(Typography)`
  opacity: 60%;
`;

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

  let TypoComponent = null;

  if (dateDone) {
    if (isLastDone) {
      TypoComponent = StrikeAnimationTypo;
      setTimeout(() => {
        isMounted.current && setIsLastDone(false);
      }, 500);
    } else {
      TypoComponent = StrikeTypo;
    }
  } else {
    TypoComponent = Typography;
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
