
import React from "react";
import Layout from "@/components/Layout";
import Calendar from "@/components/Calendar";
import { useTasks } from "@/hooks/useTasks";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from "@/components/TaskForm";
import { useIsMobile } from "@/hooks/use-mobile";

const CalendarPage = () => {
  const { tasks } = useTasks();
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Visualize your task schedule and manage due dates
            </p>
          </div>
          
          {!isMobile && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="self-start sm:self-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <TaskForm onSuccess={() => setIsOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Calendar tasks={tasks} />
      </div>
    </Layout>
  );
};

export default CalendarPage;
