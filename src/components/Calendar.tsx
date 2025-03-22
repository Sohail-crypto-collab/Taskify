
import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from "./TaskForm";

interface CalendarProps {
  tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const getTasksForDay = (date: Date) => {
    return tasks.filter(
      (task) => task.dueDate && isSameDay(task.dueDate, date)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="h-8 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before the start of the month */}
        {Array.from({ length: daysInMonth[0].getDay() }).map((_, index) => (
          <div key={`empty-start-${index}`} className="h-28 p-1"></div>
        ))}
        
        {/* Days of the month */}
        {daysInMonth.map((day) => {
          const dayTasks = getTasksForDay(day);
          const hasTask = dayTasks.length > 0;
          
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "h-28 rounded-md border border-border/50 p-1 transition-colors hover:bg-accent/10",
                isToday(day) && "bg-secondary",
                selectedDate && isSameDay(selectedDate, day) && "border-primary bg-primary/10"
              )}
              onClick={() => {
                setSelectedDate(day);
                if (hasTask) {
                  // Don't open dialog if there are no tasks
                  setIsDialogOpen(true);
                }
              }}
            >
              <div className="flex justify-between">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                    isToday(day) && "bg-primary font-medium text-primary-foreground"
                  )}
                >
                  {format(day, "d")}
                </span>
                {hasTask && (
                  <Badge variant="secondary" className="text-xs">
                    {dayTasks.length}
                  </Badge>
                )}
              </div>
              
              <Dialog open={isDialogOpen && selectedDate !== null && isSameDay(selectedDate, day)} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        Tasks for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {dayTasks.length} {dayTasks.length === 1 ? "task" : "tasks"} due on this day.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {dayTasks.map((task) => (
                        <div
                          key={task.id}
                          className={cn(
                            "rounded-md border border-border/50 p-3 transition-colors",
                            task.completed && "bg-secondary/50"
                          )}
                        >
                          <h4 className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {task.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Add Task for This Day
                      </Button>
                    </DialogTrigger>
                  </div>
                </DialogContent>
              </Dialog>
              
              <div className="mt-1 space-y-1">
                {dayTasks.slice(0, 2).map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "truncate rounded px-1 py-0.5 text-xs",
                      task.priority === "high" && "bg-priority-high/10 text-priority-high",
                      task.priority === "medium" && "bg-priority-medium/10 text-priority-medium",
                      task.priority === "low" && "bg-priority-low/10 text-priority-low",
                      task.completed && "line-through opacity-50"
                    )}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <div className="px-1 text-xs text-muted-foreground">
                    +{dayTasks.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Empty cells for days after the end of the month */}
        {Array.from({
          length: 6 - daysInMonth[daysInMonth.length - 1].getDay()
        }).map((_, index) => (
          <div key={`empty-end-${index}`} className="h-28 p-1"></div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
