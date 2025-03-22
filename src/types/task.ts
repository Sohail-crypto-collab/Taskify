
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  tags: string[];
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date | null;
  priority: Priority;
  tags: string[];
}
