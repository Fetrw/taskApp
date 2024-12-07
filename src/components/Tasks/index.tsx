import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { Task } from "../Task";
import { Pagination } from "../Pagination";
import styles from "./tasks.module.css";

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface TasksProps {
  tasks: TaskProps[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export const Tasks: React.FC<TasksProps> = ({
  tasks,
  onDelete,
  onComplete,
  onEdit,
}) => {
  const [tasksPerPage, setTasksPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page") || "1", 10);
    if (page && page >= 1 && page <= Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage(page);
    }
  }, [location.search, tasks.length, tasksPerPage]);

  const tasksQuantity = useMemo(() => tasks.length, [tasks]);
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.isCompleted).length,
    [tasks]
  );
  const totalPages = useMemo(
    () => Math.ceil(tasksQuantity / tasksPerPage),
    [tasksQuantity, tasksPerPage]
  );
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

  const handleTasksPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTasksPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Created tasks</p>
          <span>{tasksQuantity}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>
            {completedTasks} of {tasksQuantity}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {currentTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {!!tasks.length && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={goToPage}
          onItemsPerPageChange={handleTasksPerPageChange}
          itemsPerPage={tasksPerPage}
        />
      )}
    </section>
  );
};
