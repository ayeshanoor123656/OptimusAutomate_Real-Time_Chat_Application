import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function register() {
        try {
            await api.post("/auth/register", { username, email, password });
            navigate("/login");
        } catch {
            alert("Registration failed. Please try again.");
        }
    }

    return (
        <div className="login-container">
            <div className="auth-card">
                <div className="brand-mark">✨</div>
                <h1>Create account</h1>

                <div className="field-group">
                    <label className="field-label">Username</label>
                    <input
                        placeholder="Pick a username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="field-group">
                    <label className="field-label">Email</label>
                    <input
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="field-group">
                    <label className="field-label">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={register}>Create account</button>

                <p>
                    Already have an account?
                    <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;