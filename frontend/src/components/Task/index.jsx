import trash from '../../assets/trash.png';

export function Task() {
    return (
        <div className="flex items-center justify-between bg-gray-700 p-3 m-1 rounded-lg ring ring-gray-900/5">
            <div className="flex gap-2">
                <input type="checkbox"></input>
                <span>Nome da Task</span>
            </div>
            <button className="bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer">
                <img src={trash} alt="+" class="w-6 h-6 m-1"></img>
            </button>
        </div>
    );
}

