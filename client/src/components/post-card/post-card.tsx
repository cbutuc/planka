import styles from "./post-card.module.css";
import { CalendarBlank } from "phosphor-react";

type PostCardProps = {
  title: string;
  description: string;
  createdAt: string;
  isDragging?: boolean;
};

export function PostCard({
  title,
  description,
  createdAt,
  isDragging,
}: PostCardProps) {
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
    >
      <h3>{title}</h3>
      <p className={styles["card-description"]}>{description}</p>
      <div className={styles["card-date"]}>
        <CalendarBlank />
        <span>{date}</span>
      </div>
    </div>
  );
}
