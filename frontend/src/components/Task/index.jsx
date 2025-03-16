import trash from '../../assets/trash.png';
import { api } from '../../services/api';

export function Task({ task, onToggle, getTasks }) {

    async function deleteTask(id) {
            await api.delete(`/tasks/${id}`);
            getTasks();
        }

    if (!task) {
        return (
            <p>Erro</p>
        );
    }
    else {
        return (
            <div className="flex items-center justify-between bg-gray-700 p-3 m-1 rounded-lg ring ring-gray-900/5" >
                <div className="flex gap-2">
                    <input type="checkbox" checked={ task.completed } onChange={() => onToggle(task.id)}></input>
                    <span className={task.completed ? "line-through" : ""}> {task.text}</span>
                </div>
                <button className="bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer" onClick={() => deleteTask(task.id)}>
                    <img src={trash} alt="+" className="w-6 h-6 m-1"></img>
                </button>
            </div>
        );
    }
}

