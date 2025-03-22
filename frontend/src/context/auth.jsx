import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { Navigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadingStoreData();
    }, []);

    async function loadingStoreData() {
        const storageUser = localStorage.getItem("@Auth:user");
        const storageToken = localStorage.getItem("@Auth:token");

        if (storageUser && storageToken) {
            setUser(JSON.parse(storageUser));
        }
    }

    async function signIn({ email, password }) {
        try {
            const response = await api.post('/auth', { email, password });

            if (response.data.error) {
                alert(response.data.error);
            } else {
                setUser(response.data.user);

                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;

                localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));

                localStorage.setItem("@Auth:token", response.data.token);
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    function logout() {
        setUser(null); 
        localStorage.removeItem("@Auth:user"); 
        localStorage.removeItem("@Auth:token"); 
        delete api.defaults.headers.common["Authorization"];
        return <Navigate to="/" />
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signed: !!user,
                signIn,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
