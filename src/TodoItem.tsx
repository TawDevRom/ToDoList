type TodoItemProps = {
    task: { id: number; title: string; priority: string; done: boolean }
    editingId: number | null
    editingValue: string
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onEdit: (task: any) => void
    onSave: (id: number) => void
    setEditingValue: (val: string) => void
}

export function TodoItem({ task, editingId, editingValue,
    onToggle, onDelete, onEdit, onSave, setEditingValue }: TodoItemProps) {
    return (
        <li className="flex justify-between items-center gap-3 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 mb-0.5">
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggle(task.id)}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
            />

            {editingId === task.id ? (
                <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onSave(task.id);
                    }}
                    className={``}
                />
            ) : (
                <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.title}
                    <span className="ml-2 text-xs text-gray-400">({task.priority})</span>
                </span>
            )}
            {editingId === task.id ? (
                <button onClick={() => onSave(task.id)}>&#x1F5AC;</button>
            ) : (
                <button onClick={() => onEdit(task)} className="inline-block -scale-x-100">✎</button>
            )
            }

            {editingId === task.id ? (
                <div></div>
            ) : (
                <button onClick={() => onDelete(task.id)}>&#128465;</button>
            )
            }
        </li>
    )
}