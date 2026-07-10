import { useState } from "react";
import {
  CaretDown,
  Moon,
  Plus,
  TextIndent,
  TextOutdent,
} from "phosphor-react";

// import kanbanIcon from "../../assets/icons/kanban-icon.png";

import styles from "./sidebar.module.css";
import { placeholderBoards } from "../../data/boards";

type SidebarProps = {
  activeBoardId: string | undefined;
  onSelectBoard: (boardId: string) => void;
};

export function Sidebar({ activeBoardId, onSelectBoard }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [areBoardsOpen, setAreBoardsOpen] = useState(true);

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          {/* <img src={kanbanIcon} alt="" className={styles["logo-icon"]} /> */}
          {isOpen ? <span className={styles["logo-label"]}>Planka</span> : null}
        </div>

        <button
          className={styles["toggle-button"]}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <TextOutdent size={24} color="var(--sidebar-icon-gray)" />
          ) : (
            <TextIndent size={24} color="var(--sidebar-icon-gray)" />
          )}
        </button>
      </div>

      <div className={styles.user}>
        <div className={styles.avatar} aria-hidden="true">
          C
        </div>
        <div className={styles["user-info"]}>
          <span className={styles["user-name"]}>Cristina</span>
          <span className={styles["user-role"]}>Designer</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <button
          className={styles["nav-heading"]}
          onClick={() => setAreBoardsOpen((prev) => !prev)}
          aria-expanded={areBoardsOpen}
        >
          <span>All Boards ({placeholderBoards.length})</span>
          <CaretDown
            weight="bold"
            className={`${styles["nav-heading-caret"]} ${
              areBoardsOpen ? "" : styles.collapsed
            }`}
          />
        </button>

        <div
          className={`${styles["board-list-wrapper"]} ${
            areBoardsOpen ? "" : styles.collapsed
          }`}
        >
          <ul className={styles["board-list"]}>
            {placeholderBoards.map((board) => (
              <li key={board.id}>
                <button
                  className={`${styles["board-item"]} ${
                    board.id === activeBoardId ? styles.active : ""
                  }`}
                  onClick={() => onSelectBoard(board.id)}
                  title={board.name}
                >
                  <span className={styles["board-label"]}>{board.name}</span>
                </button>
              </li>
            ))}

            {/* <li>
              <button
                className={styles["create-board-item"]}
                title="Create New Board"
              >
                <Plus className={styles["board-icon"]} />
                <span className={styles["board-label"]}>Create New Board</span>
              </button>
            </li> */}
          </ul>
        </div>
      </nav>

      <div className={styles.footer}>
        <button
          className={styles["dark-mode-item"]}
          role="switch"
          aria-checked={isDarkMode}
          onClick={() => setIsDarkMode((prev) => !prev)}
          title="Dark Mode"
        >
          <Moon className={styles["board-icon"]} />
          <span className={styles["board-label"]}>Dark Mode</span>
          <span
            className={`${styles.switch} ${isDarkMode ? styles.on : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}
