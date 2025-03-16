import { useRef } from 'react';
import plus from '../../assets/plus.png';
import { api } from '../../services/api'

export function TaskForm({ getTasks }) {
    const inputText = useRef();

    async function createTask() {
        await api.post('/tasks', {
            text: inputText.current.value
        });
        getTasks();
        
    }
    

    return (
        <form className="flex items-center justify-between bg-gray-700 m-1 rounded-lg ring ring-gray-900/5 mb-5 p-2">
            <button type="button" className=" bg-white hover:bg-sky-700 cursor-pointer px-2 py-2 rounded-full  flex items-center justify-center w-12 h-12" onClick={createTask}>
                <img src={plus} alt="+" className="w-6 h-6"></img>
            </button>
            <input placeholder="Adicionar uma nova tarefa" className="rounded ml-2 w-full" ref={inputText}/>
        </form>

    );
}