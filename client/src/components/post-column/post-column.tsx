import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, DotsThreeVertical } from "phosphor-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./post-column.module.css";

import { PostCard } from "../post-card/post-card";
import { DroppableArea } from "../droppable-area";
import { SortableItem } from "../sortable-item";
import type { Task } from "../../data/tasks";
import { Menu } from "../menu/menu";

type PostColumnProps = {
  children: ReactNode;
  status: Task["status"];
  tasks: Task[];
  deleteColumn: (status: string) => void;
  // editColumnTitle: (id: string) => void;
};

export function PostColumn({
  children,
  status,
  tasks,
  deleteColumn,
  // editColumnTitle,
}: PostColumnProps) {
  console.log("status", status);
  const [title, setTitle] = useState(children);
  console.log("title", title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        isEditingTitle &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setIsEditingTitle(false);
      }

      if (isMenuOpen && menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditingTitle, isMenuOpen]);

  const filteredTasks = tasks.filter((task) => task.status === status);

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => {
      deleteColumn(status);
    }, 300);
  };

  const handleEdit = () => {
    setIsEditingTitle(true);
    setIsMenuOpen(false);
    // editColumnTitle(status);
  };

  return (
    <DroppableArea
      id={status}
      className={`${styles.column} ${styles[status]} ${isRemoving ? styles.removing : ""}`}
    >
      <div className={styles["column-header"]}>
        <div className={styles["title-count"]}>
          {isEditingTitle ? (
            <input
              ref={inputRef}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setIsEditingTitle(false);
              }}
              className={`${styles.input} ${styles[status]}`}
              autoFocus
            />
          ) : (
            <h3>{title}</h3>
          )}

          <div className={`${styles.badge} ${styles[status]}`}>
            <span>{filteredTasks.length}</span>
          </div>
        </div>

        <div ref={menuRef} className={styles["menu-button-wrapper"]}>
          <button
            className={styles["menu-button"]}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <DotsThreeVertical />
          </button>
          <Menu
            isOpen={isMenuOpen}
            deleteColumn={handleDelete}
            editColumn={handleEdit}
          />
        </div>
      </div>

      <ul className={styles["cards-container"]}>
        <SortableContext
          //an array of unique IDs of the sortable items
          items={filteredTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTasks.map((task) => (
            <SortableItem key={task.id} id={task.id}>
              <PostCard
                title={task.title}
                description={task.description}
                date={task.date}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </ul>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className={styles["new-task-button"]}
      >
        <Plus className={`${styles.icon} ${showForm ? styles.open : ""}`} />
        <p>New task</p>
      </button>
    </DroppableArea>
  );
}
