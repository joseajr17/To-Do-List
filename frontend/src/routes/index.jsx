import { BrowserRouter as Router, Routes, Route } from "react-router";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { Home } from "../components/Home";
import { PrivateRoutes } from "./privateRoutes";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/home" element={<PrivateRoutes />} >
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
}