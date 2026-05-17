import { useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";

type Task = {
  id: number
  title: string
  priority: string
  done: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })


  const [inputValue, setInputValue] = useState('')
  const [priorityValue, setPriorityValue] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState('')

  const handleAdd = () => {
    if (inputValue.trim() === '') return

    const priority = priorityValue.trim() === '' ? 'средний' : priorityValue

    const newTask: Task = {
      id: Date.now(),
      title: inputValue,
      priority: priority,
      done: false
    }

    if (tasks.some((task) => task.title === newTask.title)) {
      alert('Такая задача уже есть')
      return
    }

    setTasks([...tasks, newTask])
    setInputValue('')
    setPriorityValue('')
  }

  const handleDelete = (idToDelete: number) => {
    setTasks(tasks.filter((task) => task.id !== idToDelete))
  }

  const handleToggle = (idToToggle: number) => {
    setTasks(
      tasks.map((task) => task.id === idToToggle ? { ...task, done: !task.done } : task)
    )
  }

  const handleEdit = (task: Task) => {
    setEditingId(task.id)
    setEditingValue(task.title)
  }

  const handleSave = (id: number) => {
    if (editingValue.trim() == '') return
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editingValue } : task
      )
    )
    setEditingId(null)
    setEditingValue('')
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
    return true
  })

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-14">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Мои задачи</h1>
        <div className="flex gap-2">
          <button
           onClick={() => setFilter('all')}
           className="{``}"
           >Все</button>
          <button onClick={() => setFilter('active')}>Активные</button>
          <button onClick={() => setFilter('done')}>Выполнены</button>
        </div>
        <ul>
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              editingId={editingId}
              editingValue={editingValue}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onSave={handleSave}
              setEditingValue={setEditingValue}
            />
          ))}
        </ul>
        <input
          type="text"
          placeholder="Задача"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
        />

        <input
          type="text"
          placeholder="Приоритет"
          value={priorityValue}
          onChange={(e) => setPriorityValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
        />

        <button onClick={handleAdd} className="bg-blue-500">Добавить задачу</button>
      </div>
    </div>
  )
}