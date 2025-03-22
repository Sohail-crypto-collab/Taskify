
import React, { useMemo } from "react";
import { Tag } from "lucide-react";
import Layout from "@/components/Layout";
import { useTasks } from "@/hooks/useTasks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskItem from "@/components/TaskItem";

const TagsPage = () => {
  const { tasks } = useTasks();

  const tagGroups = useMemo(() => {
    const tags = new Map<string, number>();
    
    tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        tags.set(tag, (tags.get(tag) || 0) + 1);
      });
    });
    
    return Array.from(tags.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({
        name: tag,
        count,
        tasks: tasks.filter((task) => task.tags.includes(tag)),
      }));
  }, [tasks]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground">
            Organize and filter your tasks by tags
          </p>
        </div>

        {tagGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
            <Tag className="h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-medium">No tags found</h2>
            <p className="mt-2 text-muted-foreground">
              Add tags to your tasks to organize them better.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="flex flex-wrap gap-2">
              {tagGroups.map(({ name, count }) => (
                <Badge key={name} variant="secondary" className="text-sm px-3 py-1">
                  #{name} ({count})
                </Badge>
              ))}
            </div>

            {tagGroups.map(({ name, tasks }) => (
              <Card key={name} className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    <span>#{name}</span>
                  </CardTitle>
                  <CardDescription>
                    {tasks.length} {tasks.length === 1 ? "task" : "tasks"} with this tag
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {tasks.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TagsPage;
