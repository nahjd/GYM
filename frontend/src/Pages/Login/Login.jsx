import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send login request to backend
            const response = await axios.post("http://localhost:3030/stella", {
                username,
                password,
            });

            if (response.status === 200) {
                // Assuming your backend returns user ID or similar on success
                navigate("/");
            }
        } catch (err) {
            // Handle errors (e.g., incorrect credentials, server issues)
            setError(err.response ? err.response.data : "An error occurred");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                <h2 style={{ textAlign: "center" }}>Login</h2>
                {error && <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>{error}</div>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ marginBottom: "10px", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginBottom: "10px", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
                <button
                    type="submit"
                    style={{ padding: "10px", fontSize: "16px", backgroundColor: "#134074", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
