
import React, { useState } from 'react';
import { useTasks, TaskStatus } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import TaskColumn from '@/components/TaskColumn';
import AddTaskDialog from '@/components/AddTaskDialog';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Dashboard = () => {
  const { updateTaskStatus } = useTasks();
  const { user, logout } = useAuth();
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggingTaskId(taskId);
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (taskId: string, newStatus: TaskStatus) => {
    if (draggingTaskId) {
      updateTaskStatus(taskId, newStatus);
      setDraggingTaskId(null);
    }
  };

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as TaskStatus },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as TaskStatus },
    { id: 'completed', title: 'Completed', status: 'completed' as TaskStatus }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">Task Manager</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              Welcome, <span className="font-medium text-foreground">{user?.name}</span>
            </p>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Logged in as <span className="font-medium text-foreground">{user?.name}</span>
                  </p>
                  
                  <Button variant="outline" className="w-full justify-start" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Tasks</h2>
          <AddTaskDialog />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              status={column.status}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
