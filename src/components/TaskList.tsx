
import React, { useState } from "react";
import { Check, Flame, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Priority, Task } from "@/types/task";
import { filterTasks, sortTasks } from "@/utils/taskUtils";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "createdAt" | "title">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredTasks = filterTasks(tasks, {
    status: statusFilter,
    priority: priorityFilter,
    searchTerm,
  });

  const sortedTasks = sortTasks(filteredTasks, sortBy, sortOrder);

  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="w-full pl-9 md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter & Sort</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Priority</h4>
                  <Select
                    value={priorityFilter}
                    onValueChange={(value) => setPriorityFilter(value as Priority | "all")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Sort By</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={sortBy}
                      onValueChange={(value) =>
                        setSortBy(value as "dueDate" | "priority" | "createdAt" | "title")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dueDate">Due Date</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="createdAt">Date Created</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={sortOrder}
                      onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setStatusFilter(value as "all" | "pending" | "completed")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center justify-center gap-2">
            All
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">{tasks.length}</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center justify-center gap-2">
            <Flame className="h-4 w-4" />
            Pending
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">{pendingCount}</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center justify-center gap-2">
            <Check className="h-4 w-4" />
            Completed
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">{completedCount}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderTaskList(sortedTasks)}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          {renderTaskList(sortedTasks)}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          {renderTaskList(sortedTasks)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

function renderTaskList(tasks: Task[]) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-secondary p-3">
          <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
        </div>
        <h3 className="mt-4 text-xl font-medium">No tasks found</h3>
        <p className="mt-2 text-center text-muted-foreground">
          Try adjusting your filters or creating a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
