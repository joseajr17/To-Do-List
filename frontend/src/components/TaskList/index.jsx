import { Task } from "../Task";
export function TaskList() {
    return (
        <div className="flex flex-col m-2 text-white pt-4">
                <Task />
                <Task />
        </div>
    );
}