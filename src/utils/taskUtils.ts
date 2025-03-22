
import { Priority, Task } from "../types/task";

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const createTask = (
  title: string,
  description: string = "",
  dueDate: Date | null = null,
  priority: Priority = "medium",
  tags: string[] = []
): Task => {
  return {
    id: generateId(),
    title,
    description,
    dueDate,
    completed: false,
    priority,
    createdAt: new Date(),
    tags,
  };
};

export const priorityToLabel = (priority: Priority): string => {
  switch (priority) {
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "high":
      return "High";
    default:
      return "Unknown";
  }
};

export const priorityToColor = (priority: Priority): string => {
  switch (priority) {
    case "low":
      return "text-priority-low bg-priority-low/10 border-priority-low/20";
    case "medium":
      return "text-priority-medium bg-priority-medium/10 border-priority-medium/20";
    case "high":
      return "text-priority-high bg-priority-high/10 border-priority-high/20";
    default:
      return "text-muted-foreground bg-muted border-muted-foreground/20";
  }
};

export const filterTasks = (
  tasks: Task[],
  filters: {
    status?: "all" | "completed" | "pending";
    priority?: Priority | "all";
    searchTerm?: string;
  }
): Task[] => {
  return tasks.filter((task) => {
    // Filter by status
    if (filters.status === "completed" && !task.completed) return false;
    if (filters.status === "pending" && task.completed) return false;

    // Filter by priority
    if (filters.priority && filters.priority !== "all" && task.priority !== filters.priority)
      return false;

    // Filter by search term
    if (
      filters.searchTerm &&
      !task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !task.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    )
      return false;

    return true;
  });
};

export const sortTasks = (
  tasks: Task[],
  sortBy: "dueDate" | "priority" | "createdAt" | "title" = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
): Task[] => {
  return [...tasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return sortOrder === "asc" ? 1 : -1;
      if (!b.dueDate) return sortOrder === "asc" ? -1 : 1;
      return sortOrder === "asc"
        ? a.dueDate.getTime() - b.dueDate.getTime()
        : b.dueDate.getTime() - a.dueDate.getTime();
    }

    if (sortBy === "priority") {
      const priorityValues = { low: 1, medium: 2, high: 3 };
      return sortOrder === "asc"
        ? priorityValues[a.priority] - priorityValues[b.priority]
        : priorityValues[b.priority] - priorityValues[a.priority];
    }

    if (sortBy === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }

    // Default sort by createdAt
    return sortOrder === "asc"
      ? a.createdAt.getTime() - b.createdAt.getTime()
      : b.createdAt.getTime() - a.createdAt.getTime();
  });
};
