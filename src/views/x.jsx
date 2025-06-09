import React, { useState } from 'react';
import './kanban.css'; // Import your CSS styles for the Kanban board

// Task Card Component
const TaskCard = ({ task, onTaskClick, onMenuClick, onDragStart, onDragEnd }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart && onDragStart(task);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    onDragEnd && onDragEnd(task);
  };

  return (
    <div 
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onTaskClick && onTaskClick(task)}
    >
      <div className="task-header">
        <h3 className="task-title">
          {task.title}
        </h3>
        <button 
          className="task-menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick && onMenuClick(task);
          }}
        >
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
      <p className="task-description">
        {task.description}
      </p>
      <span className="task-id">
        {task.id}
      </span>
    </div>
  );
};

// Column Component
const KanbanColumn = ({ column, onTaskClick, onMenuClick, onTaskDrop, onColumnMenuClick, onDragStart, onDragEnd }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const taskData = JSON.parse(e.dataTransfer.getData('text/plain'));
      onTaskDrop && onTaskDrop(taskData, column.id);
    } catch (error) {
      console.error('Error parsing dropped task data:', error);
    }
  };

  return (
    <div 
      className={`kanban-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="column-header">
        <div className="column-header-left">
          <h2 className="column-title">
            {column.title}
          </h2>
          <span className="column-count">
            {column.tasks?.length || 0}
          </span>
        </div>
        <button 
          className="column-menu-btn"
          onClick={() => onColumnMenuClick && onColumnMenuClick(column)}
        >
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>

      {/* Tasks */}
      <div className="tasks-container">
        {column.tasks?.length > 0 ? (
          column.tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onTaskClick={onTaskClick}
              onMenuClick={onMenuClick}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        ) : (
          <div className="empty-column">
            <p className="empty-column-text">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Header Component
const KanbanHeader = ({ title, onAddTask, onSettingsClick }) => {
  return (
    <div className="kanban-header">
      <div className="kanban-header-left">
        <h1 className="kanban-title">{title}</h1>
        <button 
          className="settings-btn"
          onClick={onSettingsClick}
        >
          <svg className="icon icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      <button 
        className="add-todo-btn"
        onClick={onAddTask}
      >
        Add todo
      </button>
    </div>
  );
};

// Main Reusable Kanban Board Component
const KanbanBoard = ({ 
  title = "Kanban Board",
  columns = [],
  onTaskClick,
  onTaskMenuClick,
  onColumnMenuClick,
  onAddTask,
  onSettingsClick,
  onTaskMove,
  className = ""
}) => {
  const [boardColumns, setBoardColumns] = useState(columns);

  const handleTaskDrop = (task, targetColumnId) => {
    // Find source column
    const sourceColumnIndex = boardColumns.findIndex(col => 
      col.tasks?.some(t => t.id === task.id)
    );
    
    if (sourceColumnIndex === -1) return;

    const sourceColumn = boardColumns[sourceColumnIndex];
    const targetColumnIndex = boardColumns.findIndex(col => col.id === targetColumnId);

    if (targetColumnIndex === -1 || sourceColumnIndex === targetColumnIndex) return;

    // Create new columns array
    const newColumns = [...boardColumns];
    
    // Remove task from source column
    newColumns[sourceColumnIndex] = {
      ...sourceColumn,
      tasks: sourceColumn.tasks.filter(t => t.id !== task.id)
    };
    
    // Add task to target column
    const targetColumn = newColumns[targetColumnIndex];
    newColumns[targetColumnIndex] = {
      ...targetColumn,
      tasks: [...(targetColumn.tasks || []), task]
    };
    
    setBoardColumns(newColumns);
    
    // Call callback if provided
    onTaskMove && onTaskMove(task, sourceColumn.id, targetColumnId);
  };

  React.useEffect(() => {
    setBoardColumns(columns);
  }, [columns]);

  return (
    <>
      <div className={`kanban-board ${className}`}>
        <KanbanHeader 
          title={title}
          onAddTask={onAddTask}
          onSettingsClick={onSettingsClick}
        />

        <div className="kanban-columns">
          {boardColumns.map((column, index) => (
            <KanbanColumn 
              key={column.id || index}
              column={column}
              onTaskClick={onTaskClick}
              onMenuClick={onTaskMenuClick}
              onTaskDrop={handleTaskDrop}
              onColumnMenuClick={onColumnMenuClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// Example usage with sample data
const App = () => {
  const [columns, setColumns] = useState([
    {
      id: 'requested',
      title: 'REQUESTED',
      tasks: [
        {
          id: 'Task-8',
          title: 'Measure Weather',
          description: 'Lorem Ipsum is simply dummy text of the printing and typeset...'
        },
        {
          id: 'Task-3',
          title: 'Assemble Artifact',
          description: 'Lorem Ipsum is simply dummy text of the printing and typeset...'
        }
      ]
    },
    {
      id: 'todo',
      title: 'TO DO',
      tasks: [
        {
          id: 'Task-4',
          title: 'Buy Beverage',
          description: 'Lorem Ipsum is simply dummy text of the printing and typeset...'
        }
      ]
    },
    {
      id: 'progress',
      title: 'IN PROGRESS',
      tasks: [
        {
          id: 'Task-2',
          title: 'Align Telescope',
          description: 'Lorem Ipsum is simply dummy text of the printing and typeset...'
        },
        {
          id: 'Task-5',
          title: 'Sort Samples',
          description: 'Lorem Ipsum is simply dummy text of the printing and typeset...'
        },
        {
          id: 'Task-9',
          title: 'Chart Course',
          description: 'Lorem Ipsum is simply dummy text of the printing and typeset...'
        }
      ]
    },
    {
      id: 'done',
      title: 'DONE',
      tasks: [
        {
          id: 'Task-1',
          title: 'Align Engine Output',
          description: 'Lorem Ipsum is simply dummy text of the printing and typeset...'
        },
        {
          id: 'Task-7',
          title: 'Process Data',
          description: 'Lorem Ipsum is simply dummy text of the printing and typeset...'
        }
      ]
    }
  ]);

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
  };

  const handleTaskMenuClick = (task) => {
    console.log('Task menu clicked:', task);
  };

  const handleColumnMenuClick = (column) => {
    console.log('Column menu clicked:', column);
  };

  const handleAddTask = () => {
    console.log('Add task clicked');
    // You can implement a modal or form here
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    // Toggle theme or open settings modal
  };

  const handleTaskMove = (task, sourceColumnId, targetColumnId) => {
    console.log(`Task ${task.id} moved from ${sourceColumnId} to ${targetColumnId}`);
  };

  return (
    <KanbanBoard
      title="Mission Control Dashboard"
      columns={columns}
      onTaskClick={handleTaskClick}
      onTaskMenuClick={handleTaskMenuClick}
      onColumnMenuClick={handleColumnMenuClick}
      onAddTask={handleAddTask}
      onSettingsClick={handleSettingsClick}
      onTaskMove={handleTaskMove}
    />
  );
};

export default App;