'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { createTask } from '@/lib/api';
import { useState } from 'react';
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

export default function NewTask() {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      console.log('Creating task:', { title: title.trim(), color: selectedColor, completed: false });
      const result = await createTask({ title: title.trim(), color: selectedColor, completed: false });
      console.log('Task created successfully:', result);
      router.push('/');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

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
              {loading ? 'Adding...' : 'Add Task +'}
            </button>
          </form>
        </div>
      </main>

    </div>
  );
}