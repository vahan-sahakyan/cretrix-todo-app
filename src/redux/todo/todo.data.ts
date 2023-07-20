import { Todo } from "../../types";
import { getCurrentDateFormatted } from "../../utils";

export const mockTodoItems = [
  new Todo("Mark-up the basic layout", getCurrentDateFormatted(), true),
  new Todo("Configure Redux using Toolkit", getCurrentDateFormatted(), true),
  new Todo("Write the CRUD logic", getCurrentDateFormatted(), true),
  new Todo("Improve UI/UX aspect", getCurrentDateFormatted(), true),
  new Todo("Prepare for production", getCurrentDateFormatted(), false),
  new Todo(
    "Send to Mars for Elon Musk (bad joke)",
    getCurrentDateFormatted(),
    false
  ),
];
