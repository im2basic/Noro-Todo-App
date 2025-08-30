interface TaskSummaryProps {
  totalTasks: number;
  completedTasks: number;
}

export default function TaskSummary({ totalTasks, completedTasks }: TaskSummaryProps) {
  return (
    <section className="flex justify-between items-center max-w-md mx-auto mt-8 rounded-lg px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-blue-400">Tasks</span>
        <span className="text-sm text-gray-300">{totalTasks}</span>
      </div>
      <div className="w-px h-6"></div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-purple-400">Completed</span>
        <span className="text-sm text-gray-300">{completedTasks}</span>
      </div>
    </section>
  );
}