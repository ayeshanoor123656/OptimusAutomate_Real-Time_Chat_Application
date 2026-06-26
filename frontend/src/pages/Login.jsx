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

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            // Save email temporarily
            localStorage.setItem(
                "email",
                email
            );

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Email or Password");

        }

    }

    return (

        <div className="login-container">

            <h1>Chat Application</h1>

            <input
                type="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={login}>

                Login

            </button>

            <p>

                Don't have an account?

                <Link to="/register">

                    Register

                </Link>

            </p>

        </div>

    );

}

export default Login;