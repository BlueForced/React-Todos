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

  const handleSubmit = () => {
    addTodo({
      text: todoText,
      date: DateTime.fromFormat(todoDate, timeFormat).toUTC().toString(),
      id: Math.random().toString(),
      dateDone: null,
    });
    setTodoText("");
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
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
        onChange={(e) => {
          const val = e.target.value;
          val.at(-1) !== "\n" ? setTodoText(val) : handleSubmit(todoText);
        }}
      />
      <Button variant="contained" sx={{ ml: 1 }} type="submit">
        Add Todo
      </Button>
    </StyledForm>
  );
};

export default TodoAdder;
