import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { mockTodoItems } from "./todo.data";
import { Todo } from "../../types";

interface ITodoState {
  todos: Todo[];
}

const initialState: ITodoState = {
  todos: mockTodoItems,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    /**
     * ADD
     */
    addTodo(
      state,
      { payload: { text, date } }: PayloadAction<Pick<Todo, "text" | "date">>
    ) {
      state.todos.push(new Todo(text, date));
    },

    /**
     * DELETE
     */
    deleteTodo(state, { payload: { id } }: PayloadAction<{ id: string }>) {
      state.todos = state.todos.filter((item) => item.id !== id);
    },

    /**
     * UPDATE TEXT
     */
    updateTodo(
      state,
      { payload: { id, text } }: PayloadAction<Pick<Todo, "text" | "id">>
    ) {
      state.todos = state.todos.map((item) => {
        return item.id === id
          ? new Todo(text, item.date, item.completed, item.id)
          : item;
      });
    },

    /**
     * TOGGLE COMPLETED
     */
    toggleTodoStatus(
      state,
      { payload: { id } }: PayloadAction<Pick<Todo, "id">>
    ) {
      state.todos = state.todos.map((item) => {
        return item.id === id
          ? new Todo(item.text, item.date, !item.completed, item.id)
          : item;
      });
    },
  },
});

export const {
  //
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodoStatus,
} = todoSlice.actions;
