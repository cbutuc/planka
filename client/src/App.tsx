import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Board } from "./pages/board";
// import { TaskDetails } from "./pages/task-details";
// import { PageNotFound } from "./pages/page-not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Board />} />
        <Route path="board" element={<Board />} />
        {/* <Route path="task/:id" element={<TaskDetails />} />
        <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
