import { useState } from "react";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");

    return (
        <div className="max-w-sm mx-auto my-auto p-8 w-1/2 bg-white shadow-lg rounded-xl text-black font-sans">
            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
            <form className="space-y-4">
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
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline focus:outline-sky-500"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={e => setShowPassword(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="showPassword" className="text-sm text-gray-600">
                        Mostrar senha
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer">Entrar
                </button>

                <div className="text-center">
                    <span>Não possui conta? </span>
                    <a href="#" className="text-blue-500 hover:text-blue-500/50">Criar conta.</a>
                </div>

            </form>
        </div>
    );
}


