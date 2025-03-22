import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Task } from "../Task";
import { TaskForm } from "../TaskForm";

export function TaskList() {

    const [tasks, setTasks] = useState([]);


    async function getTasks() {
        try {
            const token = localStorage.getItem("@Auth:token");
            const tasksAPI = await api.get('/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(tasksAPI.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    }

    // Update Completed Task
    async function onToggle(id) {
        try {
            const tasksAPI = await api.patch(`/tasks/${id}`, {
                completed: !tasks.find(task => task.id === id).completed
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("@Auth:token")}` // Inclui o token no cabeçalho
                    }
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
        <section className="flex flex-col m-2 text-white p-4 h-full">

            {tasks.map(task => (
                <Task task={task} key={task.id} onToggle={onToggle} getTasks={getTasks} />
            ))}
            <TaskForm getTasks={getTasks} />


        </section>
    );
}