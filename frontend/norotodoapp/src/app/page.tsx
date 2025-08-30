'use client';

import TaskSummary from '@/components/TaskSummary';
import Header from '@/components/Header';
import ActionButton from '@/components/ActionButton';
import EmptyState from '@/components/EmptyState';
import { getTasks, deleteTask, updateTask } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId: number, completed: boolean) => {
    try {
      await updateTask(taskId, { completed });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    const confirmed = window.confirm(`Are you sure you want to delete "${task?.title}"?`);
    
    if (!confirmed) return;

    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskDoubleClick = (taskId: number) => {
    router.push(`/tasks/${taskId}`);
  };

  const completedTasks = tasks.filter(task => task.completed).length;

  if (loading) {
    return (
      <div className="min-h-screen text-white bg-gray-900 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <section className="bg-black pb-2 relative">
        <Header />
        <ActionButton href="/tasks/new">Create Task +</ActionButton>
      </section>

      <main className="bg-gray-900 min-h-screen pt-8">
        <TaskSummary totalTasks={tasks.length} completedTasks={completedTasks} />
        
        {tasks.length === 0 ? (
          <EmptyState 
            title="You don't have any tasks registered yet."
            description="Create tasks and organize your to-do items"
          />
        ) : (
          <div className="max-w-md mx-auto mt-8 space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-colors"
                onDoubleClick={() => handleTaskDoubleClick(task.id)}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={(e) => handleToggleTask(task.id, e.target.checked)}
                    className="w-5 h-5"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.id);
                  }}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}



