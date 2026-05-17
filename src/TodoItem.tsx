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
        <li>
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggle(task.id)}
            />

            {editingId === task.id ? (
                <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onSave(task.id);
                    }}
                />
            ) : (
                <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                    {task.title} ({task.priority})
                </span>
            )}

            {editingId === task.id ? (
                <button onClick={() => onSave(task.id)}>Сохранить</button>
            ) : (
                <button onClick={() => onEdit(task)}>Редактировать</button>
            )
            }

            {editingId === task.id ? (
                <div></div>
            ) : (
                <button onClick={() => onDelete(task.id)}>x</button>
            )
            }

        </li>
    )
}