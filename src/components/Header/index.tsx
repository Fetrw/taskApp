import todoLogo from "../../assets/todoLogo.svg";
import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsCloudDownload } from "react-icons/bs";
import { useState, FormEvent, ChangeEvent } from "react";

interface HeaderProps {
  handleAddTask: (title: string) => void;
  fetchTasksFromAPI: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  handleAddTask,
  fetchTasksFromAPI,
  loading,
}) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      handleAddTask(title.trim());
      setTitle("");
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="Todo Logo" />
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          placeholder="Add a new task"
          type="text"
          onChange={onChangeTitle}
          value={title}
        />
        <button type="submit">
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>

      <button
        className={styles.fetchButton}
        onClick={fetchTasksFromAPI}
        disabled={loading}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            <BsCloudDownload size={20} /> Fetch Tasks
          </>
        )}
      </button>
    </header>
  );
};
