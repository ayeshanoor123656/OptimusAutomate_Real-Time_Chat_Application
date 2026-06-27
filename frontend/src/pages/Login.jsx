import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        try {
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("email", email);
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid email or password.");
        }
    }

    function handleKey(e) {
        if (e.key === "Enter") login();
    }

    return (
        <div className="login-container">
            <div className="auth-card">
                <div className="brand-mark">💬</div>
                <h1>Welcome back</h1>

                <div className="field-group">
                    <label className="field-label">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKey}
                    />
                </div>

                <div className="field-group">
                    <label className="field-label">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKey}
                    />
                </div>

                <button onClick={login}>Sign in</button>

                <p>
                    Don't have an account?
                    <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;