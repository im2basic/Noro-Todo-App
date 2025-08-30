
'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { getTasks, updateTask } from '@/lib/api';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const colors = [
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#eab308', // yellow-500
  '#22c55e', // green-500
  '#3b82f6', // blue-500
  '#6366f1', // indigo-500
  '#a855f7', // purple-500
  '#ec4899', // pink-500
  '#d97706', // amber-600
];

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

export default function UpdateTask({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const router = useRouter();
  const taskId = parseInt(params.id);

  const fetchTask = useCallback(async () => {
    try {
      const tasks = await getTasks();
      const task = tasks.find((t: Task) => t.id === taskId);
      
      if (task) {
        setTitle(task.title);
        setSelectedColor(task.color);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      router.push('/');
    } finally {
      setFetchLoading(false);
    }
  }, [taskId, router]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      console.log('Updating task:', { title: title.trim(), color: selectedColor });
      const result = await updateTask(taskId, { title: title.trim(), color: selectedColor });
      console.log('Task updated successfully:', result);
      router.push('/');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen text-white bg-gray-900 flex items-center justify-center">
        <div>Loading task...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <section className="bg-black pb-2">
        <Header />
      </section>

      <main className="bg-gray-900 min-h-screen pt-8 px-6">
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-2">
              <span>←</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-blue-400 text-sm mb-2">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Brush your teeth"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-blue-400 text-sm mb-4">Color</label>
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-3 rounded-lg font-semibold transition"
            >
              {loading ? 'Updating...' : 'Update Task'}
            </button>
          </form>
        </div>
      </main>

    </div>
  );
}
