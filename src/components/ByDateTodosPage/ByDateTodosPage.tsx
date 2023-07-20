import "./ByDateTodosPage.scss";
import { useAppSelector } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import RightArrow from "../../assets/right.svg";
import TodoItem from "../TodoItem/TodoItem";
import { useMount, useUnMount } from "../../hooks";
import { useCallback, useEffect } from "react";

function ByDateTodosPage() {
  const navigate = useNavigate();
  const { date } = useParams();
  const todosByDate = useAppSelector((state) =>
    state.todo.todos.filter((item) => item.date === date)
  );
  const updateTitle = useCallback(() => {
    document.title = `Todos - ${date as string} (${todosByDate.length})`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todosByDate]);

  useEffect(() => {
    updateTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todosByDate]);

  useMount(() => {
    updateTitle();
  });

  useUnMount(() => {
    document.title = "Todos - All Dates";
  });

  return (
    <main className="date-todos-page">
      <header>
        <button onClick={() => navigate("/")}>
          <img
            style={{ transform: "rotate(180deg)" }}
            src={RightArrow}
            alt=">"
          />
          Go Back
        </button>
        <h1 className="no-select">
          {date} ({todosByDate.length})
        </h1>
      </header>

      <section>
        {todosByDate.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...{
                ...todo,
                currentDateLength: todosByDate.length,
              }}
            />
          );
        })}
      </section>
    </main>
  );
}
export default ByDateTodosPage;
