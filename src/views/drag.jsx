import React, { useState } from 'react';
import { Plus, X, Search, Filter, MoreHorizontal, ArrowUp, Calendar, MessageSquare, Paperclip } from 'lucide-react';

const TaskCard = ({ task, onDelete, onEdit, onDragStart, columnId }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task, columnId)}
      className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-move p-4"
    >
      {/* Header with ticket number and menu */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">
          {task.taskId || 'Task-7'}
        </span>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-32">
              <button
                onClick={() => {
                  onEdit && onEdit(task.id);
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {task.title || 'Lorem Ipsum is simply dummy text of the printing and typeset...'}
      </p>
    </div>
  );
};

// AddTaskForm Component
const AddTaskForm = ({ onAdd, onCancel, value, onChange }) => {
  return (
    <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter task title..."
        className="w-full p-2 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onKeyPress={(e) => {
          if (e.key === 'Enter') onAdd();
        }}
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={onAdd}
          className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// EmptyState Component
const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
        <Plus size={20} className="text-gray-400" />
      </div>
      <p className="text-sm text-gray-500">No tasks yet</p>
      <p className="text-xs text-gray-400 mt-1">Add a task to get started</p>
    </div>
  );
};

// Column Component
const Column = ({ 
  column, 
  dragOverColumn, 
  showAddTask, 
  newTaskInput,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onShowAddTask,
  onAddTask,
  onCancelAddTask,
  onNewTaskInputChange,
  onDeleteTask,
  onDragStart
}) => {
  return (
    <div
      className={`bg-gray-100 rounded-lg p-4 flex flex-col h-full ${
        dragOverColumn === column.id 
          ? 'bg-blue-100 border-2 border-blue-300 border-dashed' 
          : ''
      } transition-all duration-200`}
      onDragOver={onDragOver}
      onDragEnter={(e) => onDragEnter(e, column.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, column.id)}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-700">
            {column.title}
          </h2>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
            {column.tasks?.length || 0}
          </span>
        </div>
        
        <button
          onClick={() => onShowAddTask(column.id)}
          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add Task Form */}
      {showAddTask === column.id && (
        <div className="flex-shrink-0">
          <AddTaskForm
            onAdd={() => onAddTask(column.id)}
            onCancel={onCancelAddTask}
            value={newTaskInput}
            onChange={onNewTaskInputChange}
          />
        </div>
      )}

      {/* Scrollable Tasks Container */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="space-y-3 pr-2">
          {column.tasks && column.tasks.length > 0 ? (
            column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId={column.id}
                onDelete={(taskId) => onDeleteTask(taskId, column.id)}
                onDragStart={onDragStart}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Project Board
      </h1>
      
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Release
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

// Filters Component
const Filters = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg">
        <Search size={16} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search tasks..."
          className="outline-none text-sm bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        <Filter size={16} />
        Quick Filters
      </button>
    </div>
  );
};

// Main TaskManager Component
const TaskManager = () => {
  const [columns, setColumns] = useState({
    todo: { 
      id: 'todo', 
      title: 'To Do', 
      tasks: [] 
    },
    inProgress: { 
      id: 'inProgress', 
      title: 'In Progress', 
      tasks: [] 
    },
    review: { 
      id: 'review', 
      title: 'Review', 
      tasks: [] 
    },
    done: { 
      id: 'done', 
      title: 'Done', 
      tasks: [] 
    }
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [showAddTask, setShowAddTask] = useState(null);

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask({ task, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    const { task, sourceColumn } = draggedTask;
    
    if (sourceColumn === targetColumnId) {
      setDraggedTask(null);
      setDragOverColumn(null);
      return;
    }

    setColumns(prev => {
      const newColumns = { ...prev };
      
      // Remove task from source column
      newColumns[sourceColumn] = {
        ...newColumns[sourceColumn],
        tasks: newColumns[sourceColumn].tasks.filter(t => t.id !== task.id)
      };
      
      // Add task to target column
      newColumns[targetColumnId] = {
        ...newColumns[targetColumnId],
        tasks: [...newColumns[targetColumnId].tasks, task]
      };
      
      return newColumns;
    });

    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const addNewTask = (columnId) => {
    if (!newTaskInput.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskInput,
      tag: 'New Task',
      tagColor: 'bg-gray-100 text-gray-700',
      priority: 'medium',
      votes: 0,
      taskId: `TIS-${Math.floor(Math.random() * 100)}`,
      avatar: '👤',
      dueDate: '2025-06-30',
      comments: 0,
      attachments: 0
    };

    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask]
      }
    }));

    setNewTaskInput('');
    setShowAddTask(null);
  };

  const deleteTask = (taskId, columnId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter(task => task.id !== taskId)
      }
    }));
  };

  const handleCancelAddTask = () => {
    setShowAddTask(null);
    setNewTaskInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header />
      <Filters />
      
      {/* Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-240px)]">
        {Object.values(columns).map((column) => (
          <Column
            key={column.id}
            column={column}
            dragOverColumn={dragOverColumn}
            showAddTask={showAddTask}
            newTaskInput={newTaskInput}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onShowAddTask={setShowAddTask}
            onAddTask={addNewTask}
            onCancelAddTask={handleCancelAddTask}
            onNewTaskInputChange={setNewTaskInput}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;