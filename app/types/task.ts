export interface Task {
  id: string
  title: string
  completed: boolean
  createTime: number
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "EDIT_TASK"; payload: { id: string; title: string } }

