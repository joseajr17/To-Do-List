import { Link } from "react-router";
import { useState } from "react";
import { LayoutComponents } from "../LayoutComponents";

import { api } from "../../services/api";

export function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function createUser(e) {
        e.preventDefault();
        const data = {
            name, email, password,
        };

        await api.post('/users', data);
    }

    return (
        <LayoutComponents title="Criar conta">
            <form className="space-y-4">

                <div>
                    <label className="block font-medium">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline focus:outline-sky-500"
                    />
                </div>

                <div>
                    <label className="block font-medium">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline focus:outline-sky-500"
                    />
                </div>

                <div>
                    <label className="block font-medium">Senha</label>
                    <input
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline focus:outline-sky-500"
                    />
                </div>

                <button
                    type="button"
                    onClick={createUser}
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
                    Cadastre-se
                </button>

                <div className="text-center">
                    <Link
                        to="/login"
                        className="text-blue-500 hover:text-blue-500/50">
                        Já tem uma conta?
                    </Link>
                </div>
            </form>
        </LayoutComponents>
    );
}