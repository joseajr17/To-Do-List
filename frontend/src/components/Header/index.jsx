import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import userIcon from '../../assets/userIcon.svg'

export function Header() {
    const { user, logout } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    function handleLogout(e) {
        e.preventDefault();

        logout();
    }

    return (
        <header>
            <div className="bg-gray-700 flex justify-between items-center" >
                <nav className="md:flex space-x-1 text-2xl font-bold w-auto min-h-auto">
                    <a href="#" className="py-7 px-2 hover:bg-slate-950 hover:shadow-xl transition-all text-2xl ">To-Do-List</a>
                </nav>

                <div className="m-3 relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-gray-800/50 hover:outline-sky-700 outline-3 outline-offset-3 cursor-pointer rounded-full flex items-center justify-center w-12 h-12 "
                    >
                        <img src={userIcon} alt="+" className="w-6 h-6"></img>
                    </button>
                    {isOpen && (
                        <div className="flex flex-col absolute right-full bg-white text-black border border-gray-300 py-1 shadow-md rounded text-md min-w-3xs">
                            <span className="px-3 py-2 font-medium text-gray-900 bg-gray-100">Usuário: {user ? user.name : ""}</span>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 hover:bg-slate-950 hover:text-white text-left w-full cursor-pointer"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </header>

    );
}