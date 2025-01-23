import { useState } from "react"
import type { Task } from "../types/task"
import { TaskItem } from "./TaskItem"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, title: string) => void
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <div className="space-y-4">
      <Select onValueChange={(value: "all" | "active" | "completed") => setFilter(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="筛选任务" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部任务</SelectItem>
          <SelectItem value="active">未完成</SelectItem>
          <SelectItem value="completed">已完成</SelectItem>
        </SelectContent>
      </Select>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  )
}

