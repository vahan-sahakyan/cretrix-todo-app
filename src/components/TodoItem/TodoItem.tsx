import { FormEvent, SyntheticEvent, useRef, useState } from "react";
import { Todo } from "../../types";
import {
  deleteTodo,
  toggleTodoStatus,
  updateTodo,
} from "../../redux/todo/todo.slice";
import { dispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

function TodoItem(todo: Todo & { currentDateLength: number }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [localText, setLocalText] = useState(todo.text);

  const handleSave = () => {
    dispatch(updateTodo({ text: localText, id: todo.id }));
    setEditing(!editing);
  };
  const handleDelete = () => {
    dispatch(deleteTodo({ id: todo.id }));
    if (todo.currentDateLength < 2) navigate("/");
  };
  const handleToggleCheck = () => {
    dispatch(toggleTodoStatus({ id: todo.id }));
  };

  const handleCancel = () => {
    editInputRef.current?.blur();
    setLocalText(todo.text);
    setEditing(false);
  };

  const editInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <figure key={todo.id}>
      <header>
        {!editing && (
          <div className="s-checkbox">
            <input
              id={"checkboxLabel"}
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleCheck}
            />
            <label htmlFor="checkboxLabel"></label>
          </div>
        )}
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleSave();
            editInputRef.current?.blur();
          }}
        >
          <input
            onKeyDown={(e: SyntheticEvent & { key: string }) => {
              if (e.key === "Escape") handleCancel();
            }}
            ref={editInputRef}
            readOnly={!editing}
            type="text"
            value={localText}
            style={{
              outline: "none",
              ...(todo.completed
                ? { textDecorationLine: "line-through", color: "#888" }
                : {}),
            }}
            onChange={(e) => setLocalText(e.currentTarget.value)}
          />
        </form>
      </header>
      <aside
        className="no-select"
        style={{
          display: "flex",
          flexDirection: editing ? "row-reverse" : "row",
        }}
      >
        {editing ? (
          <p className="btn-cancel" onClick={handleCancel}>
            Cancel
          </p>
        ) : (
          <p
            className="btn-edit"
            onClick={() => {
              editInputRef.current?.focus();
              setLocalText(todo.text);
              setEditing(!editing);
            }}
          >
            Edit
          </p>
        )}
        {editing ? (
          <p className="btn-save" onClick={handleSave}>
            Save
          </p>
        ) : (
          <p className="btn-delete" onClick={handleDelete}>
            Delete
          </p>
        )}
      </aside>
    </figure>
  );
}
export default TodoItem;
