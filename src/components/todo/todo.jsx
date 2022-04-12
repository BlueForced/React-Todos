import React from "react";
import {
  ListItem,
  Typography,
  Box,
  IconButton as MuiIconButton,
  Tooltip,
  Chip,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { DateTime } from "luxon";
import useIsMounted from "../../hooks/useIsMounted";
import importanceTitles from "../todoAdder/importanceTitles";
import { StrikeAnimationTypo, StrikeTypo, TimeTypo } from "./styled";

let IconButton = ({ children, ...props }, ref) => {
  return (
    <MuiIconButton {...props} sx={{ mr: 1 }} ref={ref}>
      {children}
    </MuiIconButton>
  );
};

IconButton = React.forwardRef(IconButton);

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
      DateTime.fromISO(todo.dateDue).toLocaleString(DateTime.TIME_SIMPLE),
      todo.dateDone &&
        DateTime.fromISO(todo.dateDone).toLocaleString(DateTime.TIME_SIMPLE),
    ],
    [todo]
  );
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingText, setEditingText] = React.useState(todo.text);

  const [isLastDone, setIsLastDone] = React.useState(false);
  const isMounted = useIsMounted();

  const setTodo = (changes) => {
    const newTodo = { ...todo, ...changes };
    const newTodos = [...todos];
    newTodos[todos.indexOf(todo)] = newTodo;
    setTodos(newTodos);
  };

  const handleDone = () => {
    setIsLastDone(true);
    setTodo({ dateDone: DateTime.now().toUTC().toISO() });
  };

  const handleUndo = () => {
    setTodo({ dateDone: null });
  };

  const handleEdit = () => {
    setIsEditing(false);
    setTodo({ text: editingText });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditingText(todo.text);
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
        overflowWrap: "anywhere",
        wordBreak: "normal",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexGrow: 1,
          mr: 1,
        }}
      >
        {!isEditing ? (
          <TypoComponent>{todo.text}</TypoComponent>
        ) : (
          <TextField
            fullWidth
            multiline
            autoFocus
            variant="standard"
            label="New Text"
            value={editingText}
            onChange={(e) => {
              const val = e.target.value;
              val.at(-1) !== "\n" ? setEditingText(val) : handleEdit();
            }}
            inputRef={(input) => input && input.setSelectionRange(-1, -1)}
          />
        )}
        <TimeTypo variant="caption">Date Due: {dateDue}</TimeTypo>
        {dateDone && (
          <TimeTypo variant="caption">Date Done: {dateDone}</TimeTypo>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {!isEditing ? (
          <>
            <Chip
              label={todo.importance}
              sx={{
                mr: 3,
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
              <>
                <ButtonTooltip title="Finish">
                  <IconButton onClick={handleDone}>
                    <CheckIcon color="success" />
                  </IconButton>
                </ButtonTooltip>
                <ButtonTooltip title="Edit">
                  <IconButton onClick={() => setIsEditing(true)}>
                    <EditIcon />
                  </IconButton>
                </ButtonTooltip>
              </>
            ) : (
              <ButtonTooltip title="Undo">
                <IconButton onClick={handleUndo}>
                  <ReplayIcon />
                </IconButton>
              </ButtonTooltip>
            )}
            <ButtonTooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon color={dateDone ? "success" : "error"} />
              </IconButton>
            </ButtonTooltip>
          </>
        ) : (
          <>
            <>
              <ButtonTooltip title="Cancel Editing">
                <IconButton onClick={handleEditCancel}>
                  <CloseIcon color="error" />
                </IconButton>
              </ButtonTooltip>
              <ButtonTooltip title="Save">
                <IconButton onClick={handleEdit}>
                  <SaveIcon color="success" />
                </IconButton>
              </ButtonTooltip>
            </>
          </>
        )}
      </Box>
    </ListItem>
  );
};

export default Todo;
