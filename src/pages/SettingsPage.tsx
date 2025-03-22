
import React from "react";
import { Save, User } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Profile Settings</span>
              </CardTitle>
              <CardDescription>
                Manage your personal information and profile preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Student & Developer" />
                </div>

                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Task Due Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when tasks are due soon
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Task Completion Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your task status changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Daily Summary</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of your pending tasks
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Compact Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Display more tasks at once with a compact view
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Auto-archive Completed Tasks</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically archive tasks after completion
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Sound Effects</p>
                  <p className="text-sm text-muted-foreground">
                    Play sounds for important actions
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>Information about the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <div>
                  <p className="font-medium">Version</p>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end items-center mt-8">
          <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/15 border border-green-500/20">
            Creator
          </Badge>
          <span className="ml-2 text-sm">Muhammad Sohail Rehman</span>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
