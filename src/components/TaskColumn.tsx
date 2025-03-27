
import React from 'react';
import { useTasks, TaskStatus } from '@/context/TaskContext';
import TaskItem from './TaskItem';

interface TaskColumnProps {
  status: TaskStatus;
  title: string;
  onDrop: (taskId: string, newStatus: TaskStatus) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ 
  status, 
  title, 
  onDrop, 
  onDragStart 
}) => {
  const { getTasksByStatus } = useTasks();
  const tasks = getTasksByStatus(status);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    
    // Add visual feedback for drag over
    if (e.currentTarget.classList.contains('board-column')) {
      e.currentTarget.classList.add('drag-over');
    }
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    
    // Remove visual feedback when dragging out
    if (e.currentTarget.classList.contains('board-column')) {
      e.currentTarget.classList.remove('drag-over');
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    // Remove visual feedback on drop
    if (e.currentTarget.classList.contains('board-column')) {
      e.currentTarget.classList.remove('drag-over');
    }
    
    const taskId = e.dataTransfer.getData('taskId');
    onDrop(taskId, status);
  };

  return (
    <div
      className="board-column"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className="bg-secondary/80 text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3 min-h-[200px] overflow-auto flex-1">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-full border border-dashed border-muted rounded-md p-4">
            <p className="text-sm text-muted-foreground">No tasks yet</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
