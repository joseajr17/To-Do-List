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

    useEffect(() => {
        getTasks();
    }, []);


    return (
        <div className="flex flex-col m-2 text-white pt-4">
            <TaskForm />
            {tasks.map(task => (
                <Task task={task} key={task.id} />
            ))}
        </div>
    );
}