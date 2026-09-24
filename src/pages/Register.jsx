
import {
    useState
} from "react";


import axios from "axios";


import {
    Link,
    useNavigate
} from "react-router-dom";


function Register() {


    const [name, setName] =
        useState("");


    const [email, setEmail] =
        useState("");


    const [password, setPassword] =
        useState("");


    const [error, setError] =
        useState("");


    const [success, setSuccess] =
        useState("");


    const [loading, setLoading] =
        useState(false);


    const navigate = useNavigate();



    const handleRegister = async (event) => {


        event.preventDefault();

        setError("");
        setSuccess("");


        setLoading(true);

        try {

            await axios.post(
                "https://newblogifybackend.onrender.com/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );



            setSuccess(
                "Registration successful. Redirecting..."
            );



            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {


            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {


            setLoading(false);
        }
    };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    Blogify
                </div>

                <h1>
                    Create your account
                </h1>

                <p className="auth-subtitle">
                    Start sharing your thoughts
                </p>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}


                <form
                    onSubmit={handleRegister}
                    className="auth-form"
                >

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value
                            )
                        }
                        placeholder="Enter your name"
                        required
                    />


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
                        placeholder="Create a password"
                        required
                    />


                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Account"}
                    </button>

                </form>


                <p className="auth-switch">

                    Already have an account?

                    <Link to="/">
                        Sign in
                    </Link>

                </p>

            </div>

        </div>
    );
}



export default Register;