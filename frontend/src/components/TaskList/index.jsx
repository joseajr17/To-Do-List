import { Task } from "../Task";
import { TaskForm } from "../TaskForm";

export function TaskList() {
    return (
        <div className="flex flex-col m-2 text-white pt-4">
                <TaskForm />
                <Task />
                <Task />
        </div>
    );
}