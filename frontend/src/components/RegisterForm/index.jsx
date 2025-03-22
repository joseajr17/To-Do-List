import { Link } from "react-router";
import { useState } from "react";
import { LayoutComponents } from "../LayoutComponents";

import { api } from "../../services/api";

export function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");

    async function createUser(e) {
        e.preventDefault();

        if (!name) {
            setError("Preencha o nome.");
            return;
        } else if (name.length < 3) {
            setError("O nome deve ter pelo menos 3 caracteres.");
            return;
        } else if (!email) {
            setError("Preencha o e-mail.");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("E-mail inválido.");
            return;
        } else if (!password) {
            setError("Preencha a senha.");
            return;
        } else if (password.length < 5) {
            setError("A senha deve ter pelo menos 5 caracteres.");
            return;
        }

        const data = { name, email, password };

        try {
            await api.post('/users', data);

            setAlert("Cadastro realizado com sucesso!");
            setName("");
            setEmail("");
            setPassword("");
            setError("");

            setTimeout(() => {
                setAlert("");
            }, 2500);
        } catch (e) {
            console.error("Erro ao cadastrar usuário:", e);
            setError("Já existe um usuário com esse Email!");
        }
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
                        minLength={3}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline focus:outline-sky-500"
                    />
                </div>

                <div>
                    <label className="block font-medium">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline focus:outline-sky-500"
                    />
                </div>

                <div>
                    <label className="block font-medium">Senha</label>
                    <input
                        type="text"
                        value={password}
                        minLength={5}
                        required
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline focus:outline-sky-500"
                    />
                </div>

                <button
                    type="submit"
                    onClick={createUser}
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
                    Cadastre-se
                </button>

                <div className='flex text-center justify-center'>
                    {(!error && alert) && <span className="text-green-500 text-sm rounded outline-2 outline-offset-4 bg-transparent pt-2">{alert}</span>}
                    {(!alert && error) && <span className="text-red-500 text-sm rounded outline-2 outline-offset-4 bg-transparent pt-2">{error}</span>}
                </div>

                <div className="text-center">
                    <Link
                        to="/"
                        className="text-blue-500 hover:text-blue-500/50">
                        Já tem uma conta?
                    </Link>
                </div>
            </form>
        </LayoutComponents>
    );
}