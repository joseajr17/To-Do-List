import { Link, Navigate } from "react-router";
import { useContext, useState } from "react";
import { LayoutComponents } from "../LayoutComponents";
import { AuthContext } from "../../context/auth";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const { signIn, signed } = useContext(AuthContext);

    async function handleSignIn(e) {
        e.preventDefault();

        const data = {
            email, password,
        };

        await signIn(data);
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
                        type="button"
                        onClick={handleSignIn}
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
                        Entrar
                    </button>

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


