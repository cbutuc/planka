import styles from "./create-task-form.module.css";
import type { Task } from "../../data/tasks";

type CreateTaskFormProps = {
  status: Task["status"];
  onCancel: () => void;
  onSave: () => void;
};

export function CreateTaskForm({
  status,
  onCancel,
  onSave,
}: CreateTaskFormProps) {
  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="Title"
        className={`${styles.input} ${styles[status]}`}
      />
      <textarea
        placeholder="Description (optional)"
        rows={3}
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
        <button type="button" className={styles.saveButton} onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  );
}
