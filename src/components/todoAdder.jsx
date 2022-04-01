import React from "react";
import { TextField, Button } from "@mui/material";
import { DateTime } from "luxon";
import styled from "@emotion/styled";

const StyledForm = styled.form`
  display: flex;
`;

const timeFormat = "yyyy-MM-dd'T'hh:mm";

const TodoAdder = ({ addTodo }) => {
  const [todoText, setTodoText] = React.useState("");
  const [todoDate, setTodoDate] = React.useState(() =>
    DateTime.now().plus({ hours: 1 }).toFormat("yyyy-MM-dd'T'hh:mm")
  );

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({
          text: todoText,
          date: DateTime.fromFormat(todoDate, timeFormat).toUTC().toString(),
          id: Math.random().toString(),
          isDone: false,
        });
      }}
    >
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
        onChange={(e) => setTodoText(e.target.value)}
      />
      <Button variant="contained" color="info" sx={{ ml: 1 }} type="submit">
        Add Todo
      </Button>
    </StyledForm>
  );
};

export default TodoAdder;
