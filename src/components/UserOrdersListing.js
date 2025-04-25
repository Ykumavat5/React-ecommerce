import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './hooks/ButtonStyles.css';
import { Link } from 'react-router-dom';

const UserOrdersListing = () => {
    const [blogs, setBlogs] = useState([]);
    const [expandedBlogs, setExpandedBlogs] = useState({});

    const fetchBlogs = useCallback(async () => {
        const token = localStorage.getItem("token_organic");

        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/blogs", {
                headers: {
                    api_key: "123456789",
                    token,
                },
            });

            const result = res.data?.data;
            setBlogs(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setBlogs([]);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const toggleExpanded = (id) => {
        setExpandedBlogs(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <section className="pb-5">
            <div className="container-lg" style={{ minHeight: "80vh" }}>
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className="mb-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">
                                        <i className="bi bi-house-door-fill"></i> Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    View Blogs
                                </li>
                            </ol>
                        </nav>
                        <div className="section-header d-flex flex-wrap justify-content-between my-4">
                            <h2 className="section-title">Blogs</h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="product-item h-100 d-flex flex-column border rounded shadow-sm p-3">
                                    <figure className="mb-3">
                                        <Link to={`/blog/${blog.id}`} title={blog.title}>
                                            <img
                                                src={blog.media}
                                                alt={blog.title}
                                                className="tab-image w-100"
                                                style={{ height: "200px", objectFit: "cover", borderRadius: "4px" }}
                                            />
                                        </Link>
                                    </figure>
                                    <div className="d-flex flex-column text-center flex-grow-1">
                                        <h3 className="fs-6 fw-semibold product-title mb-2"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                lineHeight: "1.3em",
                                                height: "2.6em"
                                            }}
                                        >
                                            {blog.title}
                                        </h3>
                                    </div>

                                    <div className="mt-2 text-start">
                                        {blog.description && (
                                            <>
                                                {!expandedBlogs[blog.id] ? (
                                                    <>
                                                        <p className="text-muted mb-1" style={{ minHeight: "70px" }}>
                                                            {blog.description.split(" ").slice(0, 30).join(" ")}...
                                                        </p>
                                                        {blog.description.split(" ").length > 30 && (
                                                            <button
                                                                onClick={() => toggleExpanded(blog.id)}
                                                                className="btn btn-link btn-sm px-0 text-decoration-none"
                                                                style={{ color: "#0d6efd", marginLeft: "5px" }}
                                                            >
                                                                Read More
                                                            </button>

                                                        )}
                                                    </>
                                                ) : (
                                                    <div
                                                        className="text-muted border p-3 rounded"
                                                        style={{
                                                            maxHeight: "200px",
                                                            overflowY: "auto",
                                                            backgroundColor: "#f9f9f9",
                                                            whiteSpace: "pre-wrap"
                                                        }}
                                                    >
                                                        <p>{blog.description}</p>
                                                        <button
                                                            onClick={() => toggleExpanded(blog.id)}
                                                            className="btn btn-link btn-sm px-0 text-decoration-none"
                                                            style={{ color: "#0d6efd", marginTop: "5px" }}
                                                        >
                                                            Show Less
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5 fw-semibold fs-5 w-100">No blogs available.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserOrdersListing;
