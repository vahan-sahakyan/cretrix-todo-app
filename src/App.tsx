import "./App.scss";
import { Route, Routes } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import ByDateTodosPage from "./components/ByDateTodosPage/ByDateTodosPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/cretrix-todo-app/" element={<MainPage />} />
        <Route path="/cretrix-todo-app/:date" element={<ByDateTodosPage />} />
      </Routes>
    </div>
  );
}
export default App;
