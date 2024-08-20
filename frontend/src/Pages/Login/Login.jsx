import React, { useState } from "react";
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { googleAuthProvider, auth } from "../Firebase/firebase";
import { signInWithPopup } from 'firebase/auth';
import "./Login.scss"
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;


            console.log("Google Sign-In Result: ", result);
            console.log("User Info: ", user);


            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            navigate("/home");
        } catch (err) {
            console.log(err.message);
            setError("Google ile giriş yapılamadı. Lütfen tekrar deneyin.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("http://localhost:3030/stella", {
                username,
                password,
            });

            if (response.status === 200) {


                navigate("/home");
            }
        } catch (err) {

            setError(err.response ? err.response.data : "Bir hata oluştu");
        }
    };

    return (
        <div className="always">
            <section>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className="signin">
                    <div className="content">
                        <h2>Sign In</h2>
                        <div className="form">
                            <div className="inputBox">
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <i>Username</i>
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i>Password</i>
                            </div>
                            {/* <div class="links">  <a href=""><Link to="/register">Sign up</Link></a>

                        </div> */}
                            <div className="google">

                                <SiFacebook style={{ color: "#1198F6", backgroundColor: "white", borderRadius: '50%' }} />
                                <FcGoogle onClick={handleSignInWithGoogle} />
                                <div className="back">
                                    <FaLinkedin style={{ color: "#1198F6", }} />

                                </div>
                            </div>
                            <div className="inputBox">
                                <input
                                    type="submit"
                                    value="Login"
                                    onClick={handleLogin}
                                />
                            </div>
                        </div>




                    </div>

                </div>

            </section >
        </div >
    );
};

export default Login;
