
import {
    useState
} from "react";


import axios from "axios";


import {
    useNavigate
} from "react-router-dom";


import Navbar from "../components/Navbar";


function CreateBlog() {

    const [heading, setHeading] =
        useState("");


    const [description, setDescription] =
        useState("");


    const [image, setImage] =
        useState(null);


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    const navigate = useNavigate();


    const token =
        localStorage.getItem("token");


    const handleImageChange = (
        event
    ) => {

        const selectedFile =
            event.target.files[0];


        setImage(selectedFile);
    };


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();
        setError("");


        if (!image) {

            setError(
                "Please select an image"
            );

            return;
        }


        const formData =
            new FormData();

        formData.append(
            "heading",
            heading
        );



        formData.append(
            "description",
            description
        );


        formData.append(
            "image",
            image
        );


        setLoading(true);

        try {

            await axios.post(
                "http://localhost:5000/api/blogs",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            navigate("/dashboard");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to create blog"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="app-page">

            <Navbar />


            <main className="page-container">

                <div className="create-blog-container">

                    <div className="page-header">

                        <div>

                            <span className="eyebrow">
                                CREATE
                            </span>

                            <h1>
                                Write a new blog
                            </h1>

                            <p>
                                Turn your ideas into
                                something worth sharing.
                            </p>

                        </div>

                    </div>


                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}


                    <form
                        className="blog-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>
                                Blog Heading
                            </label>

                            <input
                                type="text"
                                value={heading}
                                onChange={(
                                    event
                                ) =>
                                    setHeading(
                                        event.target.value
                                    )
                                }
                                placeholder="Give your blog a title"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(
                                    event
                                ) =>
                                    setDescription(
                                        event.target.value
                                    )
                                }
                                placeholder="Write your story..."
                                rows="8"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Cover Image
                            </label>

                            <div className="file-upload">

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={
                                        handleImageChange
                                    }
                                    required
                                />

                                <div className="file-upload-text">

                                    {image
                                        ? image.name
                                        : "Choose an image"}

                                </div>

                            </div>

                            <small>
                                JPG, PNG, JPEG or WEBP.
                                Maximum 5MB.
                            </small>

                        </div>


                        <div className="form-actions">

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() =>
                                    navigate(
                                        "/dashboard"
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="primary-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Publishing..."
                                    : "Publish Blog"}
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CreateBlog;