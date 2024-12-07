import { useState, KeyboardEvent } from "react";
import styles from "./task.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash, TbEdit } from "react-icons/tb";

interface TaskProps {
  task: {
    id: string;
    title: string;
    isCompleted: boolean;
  };
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export const Task: React.FC<TaskProps> = ({
  task,
  onDelete,
  onComplete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle.trim());
    } else {
      setEditedTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    } else if (event.key === "Escape") {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      {isEditing ? (
        <input
          className={styles.editInput}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <p className={task.isCompleted ? styles.textCompleted : ""}>{task.title}</p>
      )}

      <div className={styles.actionButtons}>
        <button className={styles.editButton} onClick={() => setIsEditing(true)}>
          <TbEdit size={20} />
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
          <TbTrash size={20} />
        </button>
      </div>
    </div>
  );
};
