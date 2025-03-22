import { useRef, useState } from 'react';
import plus from '../../assets/plus.png';
import { api } from '../../services/api';
import { AuthContext } from '../../context/auth';


export function TaskForm({ getTasks }) {
    const inputText = useRef();
    const [error, setError] = useState("");
    // const { user } = useContext(AuthContext);

    async function createTask() {

        if (inputText.current.value !== "") {
            try {
                const token = localStorage.getItem("@Auth:token");

                await api.post('/tasks', {
                    text: inputText.current.value
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                getTasks();
                inputText.current.value = "";
                setError("");
            } catch (error) {
                console.error("Erro ao criar tarefa:", error);
                setError("Erro ao criar tarefa. Tente novamente.");
            }
        } else {
            setError("O campo não pode ser vazio. Corrija❗")
        }

    }

    return (
        <form className="flex flex-col bg-gray-700 m-1 rounded-lg ring ring-gray-900/5 mb-5 pt-1">
            <div className='flex items-center justify-between pl-1'>
                <button type="button" className=" bg-transparent hover:bg-sky-700 cursor-pointer rounded-full  flex items-center justify-center w-8 h-8 " onClick={createTask}>
                    <img src={plus} alt="+" className="w-5 h-5"></img>
                </button>
                <input key='inputA' placeholder="Adicionar uma nova tarefa" className="rounded ml-2 w-full min-h-full" ref={inputText} required />
            </div>
            <div className='flex text-center justify-center pt-2'>
                {error && <span className="text-red-500 text-sm rounded w-1/3 bg-transparent border-red-500">{error}</span>}
            </div>
        </form>

    );
}