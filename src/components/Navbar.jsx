import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const user =
        JSON.parse(
            localStorage.getItem("user")
        );
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <nav className="navbar">


            <Link
                to="/dashboard"
                className="navbar-logo"
            >
                Blogify
            </Link>



            <div className="navbar-links">

                <Link
                    to="/dashboard"
                    className="navbar-link"
                >
                    Dashboard
                </Link>

                <Link
                    to="/users"
                    className="navbar-link"
                >
                    Users
                </Link>

                <Link
                    to="/follow-requests"
                    className="navbar-link"
                >
                    Follow Requests
                </Link>

                <Link
                    to="/create-blog"
                    className="navbar-create"
                >
                    + Create Blog
                </Link>

            </div>



            <div className="navbar-right">


                <span className="navbar-user">
                    Hi, {user?.name}
                </span>



                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;
