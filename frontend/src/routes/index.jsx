import { BrowserRouter as Router, Routes, Route } from "react-router";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </Router>
    );
}