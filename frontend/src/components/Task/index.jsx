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
            <div className="flex items-center justify-between bg-gray-700 m-1 rounded-lg ring ring-gray-900/5 hover:" >
                <div className="flex gap-2 w-full hover:backdrop-brightness-120 h-full rounded p-3" onClick={() => onToggle(task.id)}>
                    <input type="checkbox" checked={ task.completed } onChange={() => onToggle(task.id)}></input>
                    <span className={task.completed ? "line-through" : ""}> {task.text}</span>
                </div>
                <button className="bg-transparent text-white rounded hover:bg-red-500 cursor-pointer ml-5 mr-2" onClick={() => deleteTask(task.id)}>
                    <img src={trash} alt="+" className="w-6 h-6 m-1"></img>
                </button>
            </div>
        );
    }
}

