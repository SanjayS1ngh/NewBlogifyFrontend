import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await axios.post("https://newblogifybackend.onrender.com/api/auth/login", {
                email,
                password
            });
            localStorage.setItem(
                "token",
                response.data.token
            )
            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );
            navigate("/dashboard");
        } catch (err) {
            setError(err.response.data.message || "login failed")
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="auth-page">

            <div className="auth-card">


                <div className="auth-logo">
                    Blogify
                </div>

                <h1>
                    Welcome back
                </h1>

                <p className="auth-subtitle">
                    Sign in to continue to Blogify
                </p>



                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form
                    onSubmit={handleLogin}
                    className="auth-form"
                >

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                        placeholder="Enter your email"
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        placeholder="Enter your password"
                        required
                    />


                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </button>

                </form>


                <p className="auth-switch">

                    Don't have an account?

                    <Link to="/register">
                        Create account
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;
