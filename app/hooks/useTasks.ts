import { useReducer, useEffect } from "react"
import { Task, TaskAction } from "../types/task"
import { taskReducer } from "../reducers/taskReducer"

export function useTasks() {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const storedTasks = localStorage.getItem("tasks")
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title: string) => {
    dispatch({ type: "ADD_TASK", payload: title })
  }

  const toggleTaskStatus = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: id })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id })
  }

  const updateTask = (id: string, title: string) => {
    dispatch({ type: "EDIT_TASK", payload: { id, title } })
  }

  return { tasks, addTask, toggleTaskStatus, deleteTask, updateTask }
}

