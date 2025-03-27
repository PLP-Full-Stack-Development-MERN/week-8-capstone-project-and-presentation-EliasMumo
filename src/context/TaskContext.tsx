
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";
import { useAuth } from './AuthContext';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  userId: string;
  createdAt: string;
};

type TaskContextType = {
  tasks: Task[];
  createTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  isLoading: boolean;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Load tasks from localStorage
      const storedTasks = localStorage.getItem(`tasks-${user.id}`);
      
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Create sample tasks for new users
        const sampleTasks = [
          {
            id: '1',
            title: 'Welcome to Task Manager',
            description: 'This is a sample task. You can create, edit, and delete tasks.',
            priority: 'medium' as TaskPriority,
            status: 'todo' as TaskStatus,
            dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
            userId: user.id,
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Try dragging tasks',
            description: 'You can drag and drop tasks between columns to change their status.',
            priority: 'low' as TaskPriority,
            status: 'in-progress' as TaskStatus,
            dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // day after tomorrow
            userId: user.id,
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Set task priorities',
            description: 'Tasks can have different priority levels: Low, Medium, or High.',
            priority: 'high' as TaskPriority,
            status: 'completed' as TaskStatus,
            dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
            userId: user.id,
            createdAt: new Date().toISOString()
          }
        ];
        
        setTasks(sampleTasks);
        localStorage.setItem(`tasks-${user.id}`, JSON.stringify(sampleTasks));
      }
    }
    
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    if (user && tasks.length > 0) {
      localStorage.setItem(`tasks-${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const createTask = (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [...prev, newTask]);
    toast.success("Task created successfully");
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    toast.success("Task updated successfully");
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast.success("Task deleted successfully");
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        createTask, 
        updateTask, 
        deleteTask, 
        updateTaskStatus, 
        getTasksByStatus, 
        isLoading 
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  
  return context;
};
