import { Pen, Trash } from "phosphor-react";

import styles from "./menu.module.css";

type MenuProps = {
  isOpen: boolean;
  deleteColumn: () => void;
  editColumn: () => void;
};

export function Menu({ isOpen, deleteColumn, editColumn }: MenuProps) {
  return (
    <div className={`${styles["menu-container"]} ${isOpen ? styles.open : ""}`}>
      <button onClick={editColumn} className={styles.item}>
        <Pen />
        <span>Edit</span>
      </button>
      <button
        onClick={deleteColumn}
        className={`${styles.item} ${styles.danger}`}
      >
        <Trash />
        <span>Delete</span>
      </button>
    </div>
  );
}
