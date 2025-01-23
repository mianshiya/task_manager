import { useState } from "react"
import type { Task } from "../types/task"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Trash, Check, X } from "lucide-react"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, title: string) => void
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  const handleUpdate = () => {
    onUpdate(task.id, editedTitle)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center space-x-2 p-2 border rounded">
      <Checkbox checked={task.completed} onCheckedChange={() => onToggle(task.id)} />
      {isEditing ? (
        <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="flex-grow" />
      ) : (
        <span className={`flex-grow ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</span>
      )}
      {isEditing ? (
        <>
          <Button size="icon" onClick={handleUpdate}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Button size="icon" variant="outline" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="destructive" onClick={() => onDelete(task.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}

