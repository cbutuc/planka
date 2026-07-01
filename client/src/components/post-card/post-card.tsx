import styles from "./post-card.module.css";
import { CalendarBlank } from "phosphor-react";

type PostCardProps = {
  title: string;
  description: string;
  date: string;
};

export function PostCard({ title, description, date }: PostCardProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p className={styles["card-description"]}>{description}</p>
      <div className={styles["card-date"]}>
        <CalendarBlank />
        <span>{date}</span>
      </div>
    </div>
  );
}
