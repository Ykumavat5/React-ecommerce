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
                <div className="col-md-6">
                    <img
                        src={product.media || 'https://via.placeholder.com/400x400'}
                        alt={product.title}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <h2>{product.title}</h2>
                    <p className="text-muted">{product.description}</p>
                    <h4 className="mt-4">
                        {product.discounted_price ? (
                            <>
                                <del>${product.price}</del>{" "}
                                <span className="text-success">${product.discounted_price}</span>
                            </>
                        ) : (
                            <>${product.price}</>
                        )}
                    </h4>
                    <p>
                        {product.discount_percentage && (
                            <span className="badge bg-success">{product.discount_percentage}% OFF</span>
                        )}
                    </p>

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
