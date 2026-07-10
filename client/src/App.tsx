import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import styles from "./App.module.css";
import { Board } from "./pages/board";
import { Sidebar } from "./components/sidebar/sidebar";
import { placeholderBoards } from "./data/boards";
// import { TaskDetails } from "./pages/task-details";
// import { PageNotFound } from "./pages/page-not-found";

function App() {
  const [activeBoardId, setActiveBoardId] = useState(placeholderBoards[0]?.id);
  const activeBoard = placeholderBoards.find(
    (board) => board.id === activeBoardId
  );

  return (
    <BrowserRouter>
      <div className={styles.shell}>
        <Sidebar activeBoardId={activeBoardId} onSelectBoard={setActiveBoardId} />
        <main className={styles.main}>
          <Routes>
            <Route index element={<Board title={activeBoard?.name} />} />
            <Route path="board" element={<Board title={activeBoard?.name} />} />
            {/* <Route path="task/:id" element={<TaskDetails />} />
            <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
