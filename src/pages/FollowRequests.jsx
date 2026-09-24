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
const FollowRequests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const fetchRequests = async () => {
        try {

            const response =
                await axios.get(
                    "https://newblogifybackend.onrender.com/api/follow/requests",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );
            setRequests(response.data.requests);

        } catch (err) {
            setError(err.response?.data?.message || "Error fetching requests");
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        fetchRequests();
    }, []);
    const handleAccept = async (requestId) => {
        try {
            await axios.put("https://newblogifybackend.onrender.com/api/follow/accept/" + requestId, {}, {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            })
            setRequests(requests.filter(req => req._id !== requestId));
        } catch (err) {
            setError(err.response?.data?.message || "Error accepting request");
        }
    }
    const handleReject = async (requestId) => {
        try {
            await axios.put(
                `https://newblogifybackend.onrender.com/api/follow/reject/${requestId}`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
            setRequests(requests.filter(req => req._id != requestId));

        } catch (err) {
            setError(err.response?.data?.message || "Error rejecting request");
        }
    }

    return (
        <div className="app-page">

            <Navbar />


            <main className="page-container">

                <div className="page-header">

                    <div>

                        <span className="eyebrow">
                            CONNECTIONS
                        </span>

                        <h1>
                            Follow Requests
                        </h1>

                        <p>
                            Manage people who want to
                            follow your blogs.
                        </p>

                    </div>

                </div>


                {loading && (
                    <div className="loading-state">
                        Loading requests...
                    </div>
                )}


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {!loading &&
                    requests.length === 0 && (

                        <div className="empty-state">

                            <div className="empty-icon">
                                👋
                            </div>

                            <h2>
                                No pending requests
                            </h2>

                            <p>
                                New follow requests will
                                appear here.
                            </p>

                        </div>
                    )}


                {!loading &&
                    requests.length > 0 && (

                        <div className="requests-list">

                            {requests.map(
                                (request) => (

                                    <div
                                        key={
                                            request._id
                                        }
                                        className="request-card"
                                    >

                                        <div className="user-avatar">
                                            {request.sender?.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>


                                        <div className="request-info">

                                            <h3>
                                                {
                                                    request
                                                        .sender
                                                        ?.name
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    request
                                                        .sender
                                                        ?.email
                                                }
                                            </p>

                                        </div>


                                        <div className="request-actions">

                                            <button
                                                className="accept-button"
                                                onClick={() =>
                                                    handleAccept(
                                                        request._id
                                                    )
                                                }
                                            >
                                                Accept
                                            </button>


                                            <button
                                                className="reject-button"
                                                onClick={() =>
                                                    handleReject(
                                                        request._id
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    </div>

                                ))}

                        </div>
                    )}

            </main>

        </div>
    );
}

export default FollowRequests;
