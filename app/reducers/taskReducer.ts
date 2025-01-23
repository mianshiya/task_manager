import type { Task, TaskAction } from "../types/task"

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: Date.now().toString(),
          title: action.payload,
          completed: false,
          createTime: Date.now(),
        },
      ]
    case "TOGGLE_TASK":
      return state.map((task) => (task.id === action.payload ? { ...task, completed: !task.completed } : task))
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload)
    case "EDIT_TASK":
      return state.map((task) => (task.id === action.payload.id ? { ...task, title: action.payload.title } : task))
    default:
      return state
  }
}

