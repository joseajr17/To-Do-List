import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Task } from "../Task";
import { TaskForm } from "../TaskForm";

export function TaskList() {

    const [tasks, setTasks] = useState([]);

    
    async function getTasks() {
        const tasksAPI = await api.get('/tasks');
        setTasks(tasksAPI.data);
    }

    // Update Completed Task
    async function onToggle(id) {
        try {
            const tasksAPI = await api.patch(`/tasks/${id}`, {
                completed: !tasks.find(task => task.id === id).completed
            });
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? tasksAPI.data : task
                )
            );
        } catch (e) { 
            console.error("Erro ao atualizar a tarefa:", e);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);


    return (
        <div className="flex flex-col m-2 text-white p-4">
            
            {tasks.map(task => (
                <Task task={task} key={task.id} onToggle={onToggle} getTasks={getTasks} />
            ))}
            <TaskForm getTasks={getTasks} />
        </div>
    );
}