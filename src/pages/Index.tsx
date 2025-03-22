
import React from "react";
import { format } from "date-fns";
import { CheckCircle, ClipboardList, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from "@/components/TaskForm";

const Dashboard = () => {
  const { tasks } = useTasks();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);
  const dueTodayTasks = tasks.filter(
    (task) => task.dueDate && format(task.dueDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );
  
  const completionRate = tasks.length > 0
    ? Math.round((completedTasks.length / tasks.length) * 100)
    : 0;

  return (
    <Layout>
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to Taskify</h1>
            <p className="text-muted-foreground">
              Here's an overview of your tasks for today, {format(new Date(), "EEEE, MMMM do")}
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <TaskForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-fade-in delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <p className="text-xs text-muted-foreground">
                Created tasks in your system
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dueTodayTasks.length}</div>
              <p className="text-xs text-muted-foreground">
                Tasks that need your attention today
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks.length}</div>
              <p className="text-xs text-muted-foreground">
                Tasks waiting to be completed
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {completedTasks.length} of {tasks.length} tasks completed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Your Tasks</h2>
        <TaskList tasks={tasks} />
      </div>
    </Layout>
  );
};

export default Dashboard;
