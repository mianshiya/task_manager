
## 回答重点

开发一个任务记录网站，我们需要实现以下核心功能：

### 1）基础功能设计

任务的增删改查：支持添加新任务、删除已完成任务、修改任务内容和标记任务状态。

任务列表展示：展示所有任务，并支持按照完成状态进行筛选。

数据持久化：使用 localStorage 或者后端服务存储任务数据，保证刷新页面后数据不丢失。

### 2）技术选型

前端框架：使用 React 18 + TypeScript。

状态管理：使用 React 内置的 useState 和 useReducer 管理组件状态。

样式方案：使用 Tailwind CSS 实现响应式布局。

### 3）项目结构

src/
  components/
    TaskForm.tsx    // 任务表单组件
    TaskList.tsx    // 任务列表组件
    TaskItem.tsx    // 任务项组件
  hooks/
    useTasks.ts     // 任务相关的状态管理
  types/
    task.ts         // TypeScript 类型定义
  App.tsx
  main.tsx

## 扩展知识

### 1）状态管理实现

使用 useReducer 管理任务状态：

```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createTime: number;
}

type TaskAction = 
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'EDIT_TASK'; payload: { id: string; title: string } };

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, {
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
        createTime: Date.now()
      }];
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    // ... 其他 case
  }
}
```

### 2）数据持久化

使用自定义 Hook 封装 localStorage 操作：

```typescript
function useTasks() {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, dispatch };
}
```

### 3）性能优化

1. 使用 React.memo 优化任务项渲染：
对于任务列表中的每个任务项，使用 memo 包裹以避免不必要的重渲染。

2. 使用 useCallback 优化事件处理函数：
对于频繁使用的事件处理函数，使用 useCallback 进行缓存。

3. 使用 useMemo 优化计算属性：
对于需要复杂计算的数据，使用 useMemo 缓存计算结果。

### 4）相关文档


1）状态管理相关：
<https://zh-hans.react.dev/reference/react/useState>
<https://zh-hans.react.dev/reference/react/useReducer>

2）性能优化相关：
<https://zh-hans.react.dev/reference/react/memo>
<https://zh-hans.react.dev/reference/react/useMemo>
<https://zh-hans.react.dev/reference/react/useCallback>

3）副作用处理：
<https://zh-hans.react.dev/reference/react/useEffect>

任务记录网站虽然功能相对简单，但通过合理的组件拆分、状态管理和性能优化，可以很好地展示 React 的核心特性和最佳实践。在实际开发中，还可以根据需求添加更多功能，比如任务分类、任务优先级、截止日期等。
