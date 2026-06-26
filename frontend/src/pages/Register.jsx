import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";
function Register() {

    const navigate = useNavigate();

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function register(){

        try{

            await api.post("/auth/register",{

                username,
                email,
                password

            });

            alert("Registration Successful!");

            navigate("/");

        }

        catch{

            alert("Registration Failed");

        }

    }

    return(

        <div className="login-container">

            <h1>Create Account</h1>

            <input
                placeholder="Username"
                onChange={(e)=>setUsername(e.target.value)}
            />

            <input
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={register}>

                Register

            </button>

            <p>

                Already have an account?

                <Link to="/">

                    Login

                </Link>

            </p>

        </div>

    );

}

export default Register;