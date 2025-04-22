import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const token = localStorage.getItem("token_organic");

            try {
                const res = await axios.get(`http://localhost:3035/api/v1/user/product/${productId}`, {
                    headers: {
                        api_key: "123456789",
                        token,
                    },
                });
                setProduct(res.data.data); // adjust based on your API response
            } catch (err) {
                setError('Error loading product. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct(); // Call the function
    }, [productId]); // Only run again when productId changes

    if (loading) return <div className="text-center my-5">Loading product...</div>;
    if (error) return <div className="text-danger text-center my-5">{error}</div>;
    if (!product) return <div className="text-center my-5">Product not found.</div>;

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-12">
                    <img
                        src={product.media || 'https://via.placeholder.com/400x400'}
                        alt={product.title}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-12">
                    <h2 className="fs-6 fw-normal product-title "
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: "1.2em",
                            height: "2.4em",
                        }}
                    >{product.title}</h2>

                    <div className="d-flex justify-content-center align-items-center gap-2">
                        {product?.discounted_price ? (
                            <del>$ {product?.price}</del>
                        ) : (
                            <span className="text-dark fw-semibold">${product?.price}</span>
                        )}
                        <span className="text-dark fw-semibold">{product?.discounted_price ? "$" + product?.discounted_price : ""}</span>
                        <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                            {product?.discount_percentage ? product?.discount_percentage + "% off" : ""}
                        </span>
                    </div>

                    <p className="text-muted">{product.description}</p>
                    <div>
                        <span className="rating">
                            {Array.from({ length: Math.floor(product.avg_ratings || 0) }).map((_, i) => (
                                <svg key={`full-${i}`} width="18" height="18" className="text-warning">
                                    <use href="#star-full" />
                                </svg>
                            ))}
                            {product.avg_ratings % 1 >= 0.5 && (
                                <svg key="half" width="18" height="18" className="text-warning">
                                    <use href="#star-half" />
                                </svg>
                            )}
                            {Array.from({ length: 5 - Math.ceil(product.avg_ratings || 0) }).map((_, i) => (
                                <svg key={`empty-${i}`} width="18" height="18" className="text-muted">
                                    <use href="#star-empty" />
                                </svg>
                            ))}
                        </span>
                        <span>
                            {product.avg_ratings !== "00.00" && product.avg_ratings !== "0.00"
                                ? `(${product.avg_ratings})`
                                : "(0)"}
                        </span>
                    </div>
                    {/* Add to Cart Button */}
                    <button className="btn btn-primary mt-3">
                        <svg width="18" height="18" className="me-1">
                            <use href="#cart" />
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
