
import React, { useState } from 'react';
import { useTasks, Task, TaskStatus } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, Trash2, ArrowRight } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDragStart }) => {
  const { deleteTask } = useTasks();
  const [showDetails, setShowDetails] = useState(false);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-priority-low text-white';
      case 'medium':
        return 'bg-priority-medium text-white';
      case 'high':
        return 'bg-priority-high text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const isOverdue = (dateString: string | null) => {
    if (!dateString) return false;
    
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Reset time part for accurate date comparison
    today.setHours(0, 0, 0, 0);
    
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <div
      className="task-card animate-fade-in cursor-move"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-medium truncate flex-1">{task.title}</h3>
        <Badge className={`${getPriorityColor(task.priority)} capitalize`}>
          {task.priority}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span className={isOverdue(task.dueDate) ? 'text-destructive font-medium' : ''}>
            {formatDate(task.dueDate)}
          </span>
        </div>
        
        <div className="flex space-x-1">
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{task.title}</span>
                  <Badge className={`${getPriorityColor(task.priority)} capitalize`}>
                    {task.priority}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {task.description || "No description provided"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Due Date</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span className={isOverdue(task.dueDate) ? 'text-destructive font-medium' : ''}>
                      {formatDate(task.dueDate)}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {task.status.replace('-', ' ')}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Created</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(task.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => {
                    deleteTask(task.id);
                    setShowDetails(false);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
