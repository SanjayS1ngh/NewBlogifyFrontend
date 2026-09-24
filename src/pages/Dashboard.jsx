import React from 'react';
import {
    useEffect,
    useState
} from "react";


import axios from "axios";


import {
    useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");

    const navigate = useNavigate();


    const token =
        localStorage.getItem("token");
    const fetchBlogs = async () => {
        try {
            const response = await axios.get("https://newblogifybackend.onrender.com/api/blogs/my", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.blogs) {
                setBlogs(response.data.blogs)
            }
        } catch (err) {
            setError(err.response.data.message || "failed to load blogs")
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        fetchBlogs();
    }, [])
    const handleDelete = async (blogId) => {


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this blog?"
            );

        if (!confirmed) {
            return;
        }
        try {
            await axios.delete(`https://newblogifybackend.onrender.com/api/blogs/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setBlogs(
                blogs.filter((blog) => blog._id !== blogId)
            );

        } catch (error) {
            setError("Failed to delete blog");
        }
    }

    return (
        <div className="app-page">

            <Navbar />


            <main className="page-container">

                <div className="page-header">

                    <div>
                        <span className="eyebrow">
                            YOUR SPACE
                        </span>

                        <h1>
                            My Blogs
                        </h1>

                        <p>
                            Your thoughts, stories and ideas.
                        </p>
                    </div>


                    <button
                        className="primary-button small-button"
                        onClick={() =>
                            navigate("/create-blog")
                        }
                    >
                        + New Blog
                    </button>

                </div>


                {loading && (
                    <div className="loading-state">
                        Loading your blogs...
                    </div>
                )}


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {!loading &&
                    blogs.length === 0 && (

                        <div className="empty-state">

                            <div className="empty-icon">
                                ✍️
                            </div>

                            <h2>
                                No blogs yet
                            </h2>

                            <p>
                                Create your first blog
                                and share your thoughts.
                            </p>

                            <button
                                className="primary-button"
                                onClick={() =>
                                    navigate(
                                        "/create-blog"
                                    )
                                }
                            >
                                Create Your First Blog
                            </button>

                        </div>
                    )}


                {!loading &&
                    blogs.length > 0 && (

                        <div className="blog-grid">

                            {blogs.map((blog) => (

                                <BlogCard
                                    key={blog._id}
                                    blog={blog}
                                    onDelete={
                                        handleDelete
                                    }
                                />

                            ))}

                        </div>
                    )}

            </main>

        </div>
    );
}

export default Dashboard;
