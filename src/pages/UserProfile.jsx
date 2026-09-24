
import {
    useEffect,
    useState
} from "react";

import axios from "axios";


import {
    useNavigate,
    useParams
} from "react-router-dom";


import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";


function UserProfile() {


    const { userId } =
        useParams();
    console.log("userId from URL:", userId);

    const [user, setUser] =
        useState(null);


    const [blogs, setBlogs] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    const navigate = useNavigate();


    const token =
        localStorage.getItem("token");



    const fetchProfile = async () => {

        try {


            const usersResponse =
                await axios.get(
                    "http://localhost:5000/api/users",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );



            const selectedUser =
                usersResponse.data.users.find(
                    (item) =>
                        String(item.id) ===
                        String(userId)
                );


            if (!selectedUser) {

                setError(
                    "User not found"
                );

                return;
            }


            setUser(
                selectedUser
            );



            if (
                selectedUser.followStatus ===
                "accepted"
            ) {

                const blogsResponse =
                    await axios.get(
                        `http://localhost:5000/api/blogs/user/${userId}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                setBlogs(
                    blogsResponse.data.blogs
                );
            }

        } catch (error) {

            // Store backend error.
            setError(
                error.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);
        }
    };


    // Fetch profile when page opens.
    useEffect(() => {

        if (!token) {
            navigate("/");
            return;
        }

        fetchProfile();

    }, [userId]);


    // Send follow request.
    const handleFollow = async () => {

        try {

            await axios.post(
                `http://localhost:5000/api/follow/${userId}`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            // Change status in UI.
            setUser({
                ...user,
                followStatus: "sent"
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to send request"
            );
        }
    };


    return (

        <div className="app-page">

            <Navbar />


            <main className="page-container">

                {loading && (
                    <div className="loading-state">
                        Loading profile...
                    </div>
                )}


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {!loading && user && (

                    <>

                        <div className="profile-header">

                            <div className="profile-avatar">
                                {user.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>


                            <div className="profile-details">

                                <span className="eyebrow">
                                    BLOGIFY MEMBER
                                </span>

                                <h1>
                                    {user.name}
                                </h1>

                                <p>
                                    {user.email}
                                </p>

                            </div>


                            <div className="profile-action">

                                {user.followStatus ===
                                    "none" && (

                                        <button
                                            className="primary-button"
                                            onClick={
                                                handleFollow
                                            }
                                        >
                                            Send Follow Request
                                        </button>

                                    )}


                                {user.followStatus ===
                                    "sent" && (

                                        <span className="status-badge pending large-badge">
                                            Request Sent
                                        </span>

                                    )}


                                {user.followStatus ===
                                    "accepted" && (

                                        <span className="status-badge accepted large-badge">
                                            Following
                                        </span>

                                    )}


                                {user.followStatus ===
                                    "received" && (

                                        <span className="status-badge received large-badge">
                                            Request Received
                                        </span>

                                    )}


                                {user.followStatus ===
                                    "rejected" && (

                                        <button
                                            className="primary-button"
                                            onClick={
                                                handleFollow
                                            }
                                        >
                                            Send Again
                                        </button>

                                    )}

                            </div>

                        </div>


                        {user.followStatus !==
                            "accepted" && (

                                <div className="private-state">

                                    <div className="private-icon">
                                        🔒
                                    </div>

                                    <h2>
                                        This profile is private
                                    </h2>

                                    <p>
                                        You need to be accepted
                                        as a follower to view
                                        this user's blogs.
                                    </p>

                                </div>

                            )}


                        {user.followStatus ===
                            "accepted" && (

                                <section>

                                    <div className="section-heading">

                                        <h2>
                                            {user.name}'s Blogs
                                        </h2>

                                        <span>
                                            {blogs.length}{" "}
                                            {blogs.length === 1
                                                ? "blog"
                                                : "blogs"}
                                        </span>

                                    </div>


                                    {blogs.length === 0 && (

                                        <div className="empty-state">

                                            <div className="empty-icon">
                                                📝
                                            </div>

                                            <h2>
                                                No blogs yet
                                            </h2>

                                            <p>
                                                This user hasn't
                                                published any blogs.
                                            </p>

                                        </div>

                                    )}


                                    {blogs.length > 0 && (

                                        <div className="blog-grid">

                                            {blogs.map(
                                                (blog) => (

                                                    <BlogCard
                                                        key={
                                                            blog._id
                                                        }
                                                        blog={
                                                            blog
                                                        }
                                                    />

                                                )
                                            )}

                                        </div>

                                    )}

                                </section>

                            )}

                    </>
                )}

            </main>

        </div>
    );
}


// Export UserProfile.
export default UserProfile;