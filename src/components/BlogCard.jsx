import React from 'react';

const BlogCard = ({ blog, onDelete }) => {
    return (
        <article className="blog-card">


            <div className="blog-image-wrapper">

                <img
                    src={blog.image}
                    alt={blog.heading}
                    className="blog-image"
                />

            </div>



            <div className="blog-content">


                <h2 className="blog-heading">
                    {blog.heading}
                </h2>


                <p className="blog-description">
                    {blog.description}
                </p>



                <div className="blog-footer">


                    <span className="blog-author">
                        By {blog.author?.name}
                    </span>


                    {onDelete && (

                        <button
                            onClick={() =>
                                onDelete(blog._id)
                            }
                            className="delete-button"
                        >
                            Delete
                        </button>

                    )}

                </div>

            </div>

        </article>
    );
}

export default BlogCard;
