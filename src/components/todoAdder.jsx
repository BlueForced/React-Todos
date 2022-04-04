import React from "react";
import { TextField, Button, Slider, Box, Typography } from "@mui/material";
import { DateTime } from "luxon";
import styled from "@emotion/styled";

const timeFormat = "yyyy-MM-dd'T'hh:mm";
const importanceTitles = [
  { title: "0: Not at all Important", color: "success", colorType: "light" },
  { title: "1: Slightly Important", color: "success", colorType: "main" },
  { title: "2: Fairly Important", color: "primary", colorType: "main" },
  { title: "3: Very Important", color: "warning", colorType: "main" },
  { title: "4: Mandatory", color: "warning", colorType: "dark" },
  { title: "5: Critical", color: "error", colorType: "dark" },
];

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-valueLabel": {
    background: theme.palette.mode === "dark" ? "black" : "#ededed",
  },
}));

const TodoAdder = ({ addTodo }) => {
  const [todoText, setTodoText] = React.useState("");
  const [todoDate, setTodoDate] = React.useState(() =>
    DateTime.now().plus({ hours: 1 }).toFormat("yyyy-MM-dd'T'hh:mm")
  );
  const [importance, setImportance] = React.useState(2);

  const handleSubmit = () => {
    addTodo({
      text: todoText,
      date: DateTime.fromFormat(todoDate, timeFormat).toUTC().toString(),
      id: Math.random().toString(),
      dateDone: null,
      importance,
    });
    setTodoText("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Box sx={{ display: "flex" }}>
        <TextField
          id="datetime-local"
          label="Due time"
          type="datetime-local"
          sx={{ width: 250, mr: 1 }}
          value={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
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
        />
        <Button variant="contained" sx={{ ml: 1 }} type="submit">
          Add Todo
        </Button>
      </Box>
      <Box sx={{ display: "flex", mr: 5, mt: 1 }}>
        <Typography sx={{ mr: 2 }}>Importance:</Typography>
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
    </form>
  );
};

export default TodoAdder;
