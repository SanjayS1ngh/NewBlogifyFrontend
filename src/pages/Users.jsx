// Import React hooks.
import {
    useEffect,
    useState
} from "react";

// Import axios.
import axios from "axios";

// Import navigation.
import {
    useNavigate
} from "react-router-dom";

// Import Navbar.
import Navbar from "../components/Navbar";


// Users page.
function Users() {

    // Store users.
    const [users, setUsers] =
        useState([]);

    // Store loading state.
    const [loading, setLoading] =
        useState(true);

    // Store error.
    const [error, setError] =
        useState("");

    // Navigation.
    const navigate = useNavigate();

    // Get JWT.
    const token =
        localStorage.getItem("token");


    // Fetch users.
    const fetchUsers = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/api/users",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            setUsers(
                response.data.users
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load users"
            );

        } finally {

            setLoading(false);
        }
    };


    // Load users when page opens.
    useEffect(() => {

        if (!token) {
            navigate("/");
            return;
        }

        fetchUsers();

    }, []);


    // Send follow request.
    const handleFollow = async (
        event,
        userId
    ) => {

        // Prevent card click.
        event.stopPropagation();

        try {

            // Send request.
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


            // Update UI.
            setUsers((currentUsers) =>
                currentUsers.map((user) => {

                    if (user.id === userId) {

                        return {
                            ...user,
                            followStatus: "sent"
                        };
                    }

                    return user;
                })
            );

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

                <div className="page-header">

                    <div>

                        <span className="eyebrow">
                            COMMUNITY
                        </span>

                        <h1>
                            Discover People
                        </h1>

                        <p>
                            Connect with other Blogify writers.
                        </p>

                    </div>

                </div>


                {loading && (
                    <div className="loading-state">
                        Finding people...
                    </div>
                )}


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {!loading && (
                    <div className="users-grid">

                        {users.map((user) => (

                            <div
                                key={user.id}
                                className="user-card"
                                onClick={() =>
                                    navigate(
                                        `/users/${user.id}`
                                    )
                                }
                            >

                                <div className="user-avatar">
                                    {user.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>


                                <div className="user-info">

                                    <h3>
                                        {user.name}
                                    </h3>

                                    <p>
                                        {user.email}
                                    </p>

                                </div>


                                {user.followStatus ===
                                    "none" && (

                                        <button
                                            className="follow-button"
                                            onClick={(
                                                event
                                            ) =>
                                                handleFollow(
                                                    event,
                                                    user.id
                                                )
                                            }
                                        >
                                            Follow
                                        </button>

                                    )}


                                {user.followStatus ===
                                    "sent" && (

                                        <span className="status-badge pending">
                                            Request Sent
                                        </span>

                                    )}


                                {user.followStatus ===
                                    "received" && (

                                        <span className="status-badge received">
                                            Request Received
                                        </span>

                                    )}


                                {user.followStatus ===
                                    "accepted" && (

                                        <span className="status-badge accepted">
                                            Following
                                        </span>

                                    )}


                                {user.followStatus ===
                                    "rejected" && (

                                        <button
                                            className="follow-button"
                                            onClick={(
                                                event
                                            ) =>
                                                handleFollow(
                                                    event,
                                                    user.id
                                                )
                                            }
                                        >
                                            Follow Again
                                        </button>

                                    )}

                            </div>

                        ))}

                    </div>
                )}

            </main>

        </div>
    );
}


// Export Users.
export default Users;