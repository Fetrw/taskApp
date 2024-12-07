import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { FetchedTask } from "./types/FetchedTask";

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

const LOCAL_STORAGE_KEY = "todo:tasks";
const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadSavedTasks = useCallback(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const setTasksAndSave = (newTasks: TaskProps[]) => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  const fetchTasksFromAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: FetchedTask[] = await response.json();
      const fetchedTasks: TaskProps[] = data
        .slice(0, 10)
        .map(({ id, title, completed }) => ({
          id: id.toString(),
          title,
          isCompleted: completed,
        }));

      setTasksAndSave(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = useCallback(
    (taskTitle: string) => {
      const newTask: TaskProps = {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
      };
      setTasksAndSave([...tasks, newTask]);
    },
    [tasks]
  );

  const deleteTaskById = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  };

  const editTaskById = (taskId: string, newTitle: string) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasksAndSave(newTasks);
  };

  const toggleTaskCompletedById = (taskId: string) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasksAndSave(newTasks);
  };

  useEffect(() => {
    loadSavedTasks();
  }, [loadSavedTasks]);

  return (
    <>
      <Header
        handleAddTask={addTask}
        fetchTasksFromAPI={fetchTasksFromAPI}
        loading={loading}
      />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onEdit={editTaskById}
      />
    </>
  );
};
