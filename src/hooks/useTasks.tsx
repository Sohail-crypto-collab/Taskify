
import React, { createContext, useContext, useEffect, useState } from "react";
import { Priority, Task, TaskFormData } from "../types/task";
import { createTask } from "../utils/taskUtils";
import { toast } from "@/hooks/use-toast";

interface TasksContextProps {
  tasks: Task[];
  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

// Sample initial tasks for demonstration
const initialTasks: Task[] = [
  createTask(
    "Complete project proposal",
    "Draft the initial proposal for the client meeting",
    new Date(Date.now() + 86400000 * 2), // Due in 2 days
    "high",
    ["work", "client"]
  ),
  createTask(
    "Study for exam",
    "Review chapters 5-8 for upcoming midterm",
    new Date(Date.now() + 86400000 * 5), // Due in 5 days
    "medium",
    ["school", "exam"]
  ),
  createTask(
    "Grocery shopping",
    "Buy ingredients for the week",
    new Date(Date.now() + 86400000), // Due tomorrow
    "low",
    ["personal", "shopping"]
  ),
  createTask(
    "Gym workout",
    "30 min cardio and strength training",
    null, // No due date
    "medium",
    ["health", "fitness"]
  ),
];

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Try to load tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        // Convert string dates back to Date objects
        return parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
        }));
      } catch (error) {
        console.error("Failed to parse saved tasks:", error);
        return initialTasks;
      }
    }
    return initialTasks;
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data: TaskFormData) => {
    const newTask = createTask(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.tags
    );
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    toast({
      title: "Task added",
      description: `"${data.title}" has been added to your tasks.`,
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
    toast({
      title: "Task updated",
      description: `The task has been successfully updated.`,
    });
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been removed.`,
        variant: "destructive",
      });
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const newStatus = !task.completed;
      toast({
        title: newStatus ? "Task completed" : "Task reopened",
        description: newStatus
          ? `"${task.title}" marked as complete.`
          : `"${task.title}" marked as incomplete.`,
      });
    }
  };

  const getTask = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        getTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextProps => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
