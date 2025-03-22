import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, Outlet } from "react-router"

export function PrivateRoutes() {
    const { signed } = useContext(AuthContext);

    return signed ? <Outlet /> : <Navigate to='/' />
}