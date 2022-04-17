import React from "react";
import {
  TextField,
  Button,
  Slider,
  Box,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { DateTime } from "luxon";
import styled from "@emotion/styled";
import importanceTitles from "./importanceTitles";

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-valueLabel": {
    background: theme.palette.mode === "dark" ? "black" : "#ededed",
  },
}));

const timeFormat = "yyyy-MM-dd'T'HH:mm";

const date = (plus = {}) => DateTime.now().plus(plus).toFormat(timeFormat);

const TodoAdder = ({ addTodo }) => {
  const [todoText, setTodoText] = React.useState("");
  const [todoDate, setTodoDate] = React.useState(() => date({ hours: 1 }));
  const [importance, setImportance] = React.useState(2);
  const [minDate, maxDate] = React.useMemo(
    () => [date(), date({ years: 1 })],
    []
  );
  const { isMobile } = useTheme();

  const handleSubmit = () => {
    addTodo({
      text: todoText.trim(),
      dateDue: DateTime.fromFormat(todoDate, timeFormat).toISO(),
      id: Math.random().toString(),
      dateDone: null,
      importance,
      dateAdded: DateTime.now().toISO(),
    });
    setTodoText("");
    setImportance(2);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          ml: +isMobile,
          mr: +isMobile,
          mt: +isMobile,
        }}
      >
        <TextField
          id="datetime-local"
          label="Due Time"
          type="datetime-local"
          required
          sx={{
            width: isMobile ? undefined : 250,
            mr: +!isMobile,
            mt: isMobile ? 2 : 0,
            order: 0,
          }}
          value={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
          inputProps={{
            min: minDate,
            max: maxDate,
          }}
          fullWidth={isMobile}
        />
        <TextField
          variant="outlined"
          placeholder="Todo's text..."
          required
          multiline
          value={todoText}
          onChange={(e) => {
            const val = e.target.value;
            val.at(-1) !== "\n" ? setTodoText(val) : handleSubmit(todoText);
          }}
          fullWidth={isMobile}
          sx={{
            order: isMobile ? -1 : 0,
          }}
        />
        <Button
          variant="contained"
          sx={{ ml: +!isMobile, mt: +isMobile }}
          type="submit"
          fullWidth={isMobile}
        >
          Add Todo
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          mr: 5,
          ml: isMobile ? 2 : 5,
          mt: 1,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ mr: 2, textShadow: ({ palette }) => palette.custom.textShadow }}
        >
          Importance:
        </Typography>
        <StyledSlider
          value={importance}
          onChange={(e, val) => setImportance(val)}
          valueLabelDisplay="auto"
          marks
          min={0}
          max={5}
          size="small"
          valueLabelFormat={(x) => {
            const title = importanceTitles[x];
            return (
              <Typography
                variant="body2"
                sx={{
                  color: ({ palette }) => palette[title.color][title.colorType],
                }}
              >
                {title.title}
              </Typography>
            );
          }}
        />
      </Box>
      <Divider sx={{ mt: 2 }} />
    </form>
  );
};

export default TodoAdder;
