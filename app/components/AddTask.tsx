import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AddTaskProps {
  onAdd: (title: string) => void
}

export function AddTask({ onAdd }: AddTaskProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="添加新任务..."
        className="flex-grow"
      />
      <Button type="submit">添加</Button>
    </form>
  )
}

