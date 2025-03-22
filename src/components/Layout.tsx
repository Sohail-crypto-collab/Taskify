import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, CheckSquare, Home, Menu, Plus, Settings, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import TaskForm from "./TaskForm";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: CheckSquare, label: "My Tasks", path: "/tasks" },
  { icon: CalendarDays, label: "Calendar", path: "/calendar" },
  { icon: Tag, label: "Tags", path: "/tags" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const NavLinks = () => (
    <nav className="mt-8 space-y-1 flex-1">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center space-x-3 rounded-lg px-3 py-2 transition-all",
            location.pathname === item.path
              ? "bg-primary/10 text-primary"
              : "hover:bg-secondary text-muted-foreground hover:text-foreground"
          )}
          onClick={() => isMobile && document.getElementById('mobile-menu-close')?.click()}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="fixed left-0 top-0 z-30 h-full w-60 border-r border-border/40 bg-card/80 backdrop-blur-xl">
          <div className="flex h-full flex-col p-4">
            <div className="flex items-center space-x-2 px-2 py-6">
              <div className="h-8 w-8 rounded-full bg-primary/10 p-1">
                <div className="h-full w-full rounded-full bg-primary animate-pulse-subtle"></div>
              </div>
              <h1 className="text-xl font-semibold tracking-tight">Taskify</h1>
            </div>

            <NavLinks />

            <div className="mt-auto">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <TaskForm onSuccess={() => setIsOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile Header & Menu */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-border/40 bg-card/80 backdrop-blur-xl px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 p-0.5">
              <div className="h-full w-full rounded-full bg-primary animate-pulse-subtle"></div>
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Taskify</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Plus className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100vw-32px)] sm:max-w-[500px]">
                <TaskForm onSuccess={() => setIsOpen(false)} />
              </DialogContent>
            </Dialog>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 p-0.5">
                        <div className="h-full w-full rounded-full bg-primary animate-pulse-subtle"></div>
                      </div>
                      <h1 className="text-lg font-semibold tracking-tight">Taskify</h1>
                    </div>
                  </div>
                  
                  <NavLinks />
                  
                  <div className="mt-auto pb-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full justify-start gap-2">
                          <Plus className="h-5 w-5" />
                          Add New Task
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[calc(100vw-32px)] sm:max-w-[500px]">
                        <TaskForm onSuccess={() => document.getElementById('mobile-menu-close')?.click()} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      )}

      {/* Main content */}
      <main className={cn(
        "flex-1", 
        !isMobile && "pl-60",
        isMobile && "pt-14"
      )}>
        <div className="container py-8 px-4 md:px-8">
          <div className="animate-fade-in">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
