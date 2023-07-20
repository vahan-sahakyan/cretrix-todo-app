import "./App.scss";
import { Route, Routes, useParams } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import ByDateTodosPage from "./components/ByDateTodosPage/ByDateTodosPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:date" element={<ByDateTodosPage />} />
      </Routes>
    </div>
  );
}
export default App;
