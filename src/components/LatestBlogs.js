import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:3035/api/v1/user/blogs", {
                    headers: { api_key: "123456789" },
                });
                const result = res.data?.data || [];

                setBlogs(result);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <section id="latest-blog" className="pb-4">
            <div className="container-lg">
                <div className="row">
                    <div className="section-header d-flex align-items-center justify-content-between my-4">
                        <h2 className="section-title">Our Recent Blog</h2>
                        <a href="/blogs" className="btn btn-primary">View All</a>
                    </div>
                </div>
                <div className="row">
                    {blogs.length > 0 ? (
                        blogs.slice(0, 3).map((blog) => (
                            <div className="col-md-4" key={blog.id}>
                                <article className="post-item card border-0 shadow-sm p-3">
                                    <div className="image-holder zoom-effect">
                                        <a href={`/blogs/${blog.id}`}>
                                            <img
                                                src={blog.media || "/assets/images/default-blog.jpg"}
                                                alt={blog.title}
                                                className="card-img-top"
                                            />
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                            <div className="meta-date">
                                                <svg width="16" height="16"><use href="#calendar" /></svg>
                                                {new Date(blog.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="meta-categories">
                                                <svg width="16" height="16"><use href="#category" /></svg>
                                                {blog.category || "general"}
                                            </div>
                                        </div>
                                        <div className="post-header">
                                            <h3 className="post-title">
                                                <a href={`/blogs/${blog.id}`} className="text-decoration-none">
                                                    {blog.title}
                                                </a>
                                            </h3>
                                            <p>{blog.description.slice(0, 120)}...</p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5 fw-semibold fs-5">No blogs available.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;
