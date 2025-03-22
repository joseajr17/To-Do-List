import { Link, Navigate } from "react-router";
import { useContext, useState } from "react";
import { LayoutComponents } from "../LayoutComponents";
import { AuthContext } from "../../context/auth";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [error, setError] = useState("");

    const { signIn, signed } = useContext(AuthContext);

    async function handleSignIn(e) {
        e.preventDefault();

        setError("");

        if (!email) {
            setError("Preencha o e-mail.");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("E-mail inválido.");
            return;
        } else if (!password) {
            setError("Preencha a senha.");
            return;
        }

        const data = { email, password };

        try {
            await signIn(data)
            
            setEmail("");
            setPassword("");


        } catch (signInError) {
            console.error("Erro ao logar:", signInError);
            setError("Credencias inválidas.");
        }
    }

    if (signed) {
        return <Navigate to='/home' />
    } else {
        return (
            <LayoutComponents title="Login" >
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
                        onClick={handleSignIn}
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
                        Entrar
                    </button>

                    <div className='flex text-center justify-center'>
                        {error && <span className="text-red-500 text-sm rounded outline-2 outline-offset-4 bg-transparent pt-2">{error}</span>}
                    </div>
                    <div className="text-center">
                        <span>Não possui conta? </span>
                        <Link
                            to="/register"
                            className="text-blue-500 hover:text-blue-500/50">
                            Criar conta.
                        </Link>
                    </div>
                </form>
            </LayoutComponents>
        );
    }
}


