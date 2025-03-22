
import React from "react";
import { format } from "date-fns";
import { Check, Clock, Edit, MoreVertical, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/task";
import { priorityToColor, priorityToLabel } from "@/utils/taskUtils";
import { useTasks } from "@/hooks/useTasks";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from "./TaskForm";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTasks();
  const [isOpen, setIsOpen] = React.useState(false);

  const dueDateDisplay = task.dueDate ? (
    <div className="flex items-center text-sm text-muted-foreground">
      <Clock className="mr-1 h-3.5 w-3.5" />
      {format(task.dueDate, "MMM d, yyyy")}
    </div>
  ) : null;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/50 bg-card p-4 shadow-sm transition-all hover:border-border",
        task.completed && "bg-secondary/50"
      )}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => toggleTaskCompletion(task.id)}
          className="mt-0.5 h-5 w-5 rounded-full"
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <h3
              className={cn(
                "font-medium leading-tight",
                task.completed && "text-muted-foreground line-through"
              )}
            >
              {task.title}
            </h3>

            <div className="flex items-center">
              <Badge
                variant="outline"
                className={cn(
                  "ml-2 text-xs font-normal",
                  priorityToColor(task.priority)
                )}
              >
                {priorityToLabel(task.priority)}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <TaskForm 
                        task={task} 
                        onSuccess={() => setIsOpen(false)} 
                      />
                    </DialogContent>
                  </Dialog>

                  <DropdownMenuItem onClick={() => toggleTaskCompletion(task.id)}>
                    <Check className="mr-2 h-4 w-4" />
                    {task.completed ? "Mark incomplete" : "Mark complete"}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive" 
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {task.description && (
            <p
              className={cn(
                "text-sm text-muted-foreground",
                task.completed && "line-through opacity-70"
              )}
            >
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {dueDateDisplay}

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
