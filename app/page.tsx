"use client"

import { useTasks } from "./hooks/useTasks"
import { AddTask } from "./components/AddTask"
import { TaskList } from "./components/TaskList"

export default function Home() {
  const { tasks, addTask, toggleTaskStatus, deleteTask, updateTask } = useTasks()

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">任务管理器</h1>
      <AddTask onAdd={addTask} />
      <div className="mt-4">
        <TaskList tasks={tasks} onToggle={toggleTaskStatus} onDelete={deleteTask} onUpdate={updateTask} />
      </div>
    </div>
  )
}

