import { useState } from "react";
import styles from "./create-task-form.module.css";
import type { Task } from "../../data/tasks";

type CreateTaskFormProps = {
  status: Task["status"];
  onCancel: () => void;
  onSave: (data: { title: string; description: string }) => void;
};

export function CreateTaskForm({
  status,
  onCancel,
  onSave,
}: CreateTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${styles.input} ${styles[status]}`}
      />
      <textarea
        placeholder="Description (optional)"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`${styles.textarea} ${styles[status]}`}
      />
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className={styles.saveButton}
          disabled={!title.trim()}
          onClick={() => {
            if (!title.trim()) return;
            onSave({ title, description });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
