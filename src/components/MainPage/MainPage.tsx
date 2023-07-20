import { FormEvent, useCallback, useEffect, useState } from "react";
import { dispatch, useAppSelector } from "../../redux/store";
import { Todo } from "../../types";
import { getCurrentDateFormatted } from "../../utils";
import { addTodo } from "../../redux/todo/todo.slice";
import { Link } from "react-router-dom";
import RightArrow from "../../assets/right.svg";

import "./MainPage.scss";
import { useMount } from "../../hooks";

type TGroup = Record<string, { todos: Todo[] }>;

function MainPage() {
  const [text, setText] = useState("");
  const [date, setDate] = useState(getCurrentDateFormatted());
  const todos = useAppSelector((state) => state.todo.todos);
  const [groups, setGroups] = useState<TGroup>({});

  const groupify = useCallback(() => {
    setGroups((_prev) =>
      todos.reduce((groups, todo) => {
        const groupKey = todo.date;
        if (!(groupKey in groups)) {
          groups[groupKey] = {
            todos: [],
          };
        }
        groups[groupKey].todos.push(todo);
        return groups;
      }, {} as TGroup)
    );
  }, [todos]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addTodo({ date, text }));
  };

  useMount(() => {
    groupify();
  });

  useEffect(() => {
    console.log(todos);
    console.log(groups);
    groupify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, text, todos]);
  return (
    <main className="main-page">
      <h1 className="no-select">To do list</h1>
      <section>
        <h3>New Task</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
          <input
            placeholder="Type Here"
            type="text"
            required
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
          <button type="submit">Add</button>
        </form>
      </section>
      <section>
        <h3 className="no-select">Dates</h3>
        {Object.entries(groups).map(([groupKey, { todos }]) => {
          console.log({ groupKey, todos });

          return (
            <article key={groupKey}>
              <Link to={`${groupKey}`}>
                <div
                  style={{
                    padding: "12px 16px",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    {groupKey} ({todos.length})
                  </p>
                  <img src={RightArrow} />
                </div>
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
export default MainPage;
