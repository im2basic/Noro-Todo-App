"use client";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import { updateTask, deleteTask } from "@/lib/api";

export default function TaskCard({ task }: { task: Task }) {
	const router = useRouter();

	const toggleComplete = async () => {
		await updateTask(task.id, { completed: !task.completed });
		router.refresh();
	};

	const handleDelete = async () => {
		if (confirm("Delete this task?")) {
			await deleteTask(task.id);
			router.refresh();
		}
	};

	return (
        <div
        className="flex justify-between items-center border p-3 rounded-md shadow cursor-pointer"
        onClick={() => router.push(`/tasks/${task.id}`)}
		>
            <h1>HELLO11111</h1>
			<div>
				<h3
					className={`font-bold ${task.completed ? "line-through" : ""}`}
					style={{ color: task.color }}
				>
					{task.title}
				</h3>
			</div>
			<div className="flex gap-2">
				<input
					type="checkbox"
					checked={task.completed}
					onChange={toggleComplete}
					onClick={e => e.stopPropagation()}
				/>
				<button
					onClick={e => {
						e.stopPropagation();
						handleDelete();
					}}
					className="text-red-500"
				>
					🗑
				</button>
			</div>
		</div>
	);
}
