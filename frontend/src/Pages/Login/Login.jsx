import React, { useState } from "react";
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { googleAuthProvider, auth } from "../Firebase/firebase";
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;

            // Kullanıcı bilgilerini console'a yazdır
            console.log("Google Sign-In Result: ", result);
            console.log("User Info: ", user);

            // Token ve kullanıcı bilgilerini localStorage'a kaydet
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            // Ana sayfaya yönlendir
            navigate("/home");
        } catch (err) {
            console.log(err.message); // Hata mesajını konsola yazdır
            setError("Google ile giriş yapılamadı. Lütfen tekrar deneyin."); // Kullanıcıya hata mesajı göster
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Backend'e giriş isteği gönder
            const response = await axios.post("http://localhost:3030/stella", {
                username,
                password,
            });

            if (response.status === 200) {
                // Giriş başarılı, ana sayfaya yönlendir
                navigate("/home");
            }
        } catch (err) {
            // Hataları işleme (örneğin, yanlış bilgiler, sunucu sorunları)
            setError(err.response ? err.response.data : "Bir hata oluştu");
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
                /> <br />
                <GoogleButton style={{ width: "100%" }} onClick={handleSignInWithGoogle} /> <br />
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
