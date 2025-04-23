import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../reuse/CartContext'; // Adjust path as needed
import useFavourites from '../reuse/useFavourites'; // ✅ Import your custom hook

const ViewProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const [favourites, toggleFavourite] = useFavourites(); // ✅ Use the hook
    const isFavourite = favourites.includes(Number(productId)); // Check if current product is fav

    const { cart, addToCart, updateCartQuantity, deleteCartItem } = useContext(CartContext);
    const cartItem = cart.find(item => item.product_id === product?.id);
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

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
                setProduct(res.data.data);
            } catch (err) {
                setError('Error loading product. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        setQuantity(cartItem ? cartItem.quantity : 1);
    }, [cartItem]);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
        if (cartItem) updateCartQuantity(product.id, value);
    };

    const handleAddToCart = () => {
        addToCart(product.id, quantity);
    };

    const handleIncrement = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        updateCartQuantity(product.id, newQty);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            updateCartQuantity(product.id, newQty);
        } else {
            deleteCartItem(product.id);
        }
    };

    if (loading) return <div className="text-center my-5">Loading product...</div>;
    if (error) return <div className="text-danger text-center my-5">{error}</div>;
    if (!product) return <div className="text-center my-5">Product not found.</div>;

    return (
        <div className="container my-5" style={{ height: "50rem" }}>
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard">
                            <i className="bi bi-house-door-fill"></i> Dashboard
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">View Product</li>
                </ol>
            </nav>

            <div className="row align-items-center">
                <div className="col-md-12">
                    <img
                        src={product.media || 'https://via.placeholder.com/400x400'}
                        alt={product.title}
                        className="img-fluid rounded"
                    />
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="fs-6 fw-normal product-title" style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: "1.2em",
                            height: "2.4em",
                        }}>
                            {product.title}
                        </h2>

                        <div className="d-flex justify-content-center align-items-center gap-2">
                            {product?.discounted_price ? <del>$ {product?.price}</del> : <span className="text-dark fw-semibold">${product?.price}</span>}
                            {product?.discounted_price && <span className="text-dark fw-semibold">${product?.discounted_price}</span>}
                            {product?.discount_percentage && (
                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                                    {product.discount_percentage + "% off"}
                                </span>
                            )}
                        </div>

                        <div className="mb-3">
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
                                    ? ` (${product.avg_ratings})`
                                    : " (0)"}
                            </span>
                        </div>

                        {/* <p className="text-muted mt-3">{product.description}</p> */}

                        <div className="mt-3">
                            {product.description && (
                                <>
                                    {!expanded ? (
                                        <>
                                            <p className="text-muted">
                                                {product.description.split(" ").slice(0, 50).join(" ")}...
                                            </p>
                                            {product.description.split(" ").length > 50 && (
                                                <button
                                                    onClick={() => setExpanded(true)}
                                                    className="btn btn-link px-0 text-decoration-none"
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
                                                backgroundColor: "#f9f9f9"
                                            }}
                                        >
                                            <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
                                            <button
                                                onClick={() => setExpanded(false)}
                                                className="btn btn-link px-0 mt-2 text-decoration-none"
                                            >
                                                Show Less
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="row justify-content-center g-2">
                            {cartItem ? (
                                <>
                                    <div className="col-2">
                                        <button onClick={handleDecrement} className="btn btn-outline-dark w-100">-</button>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className="form-control text-center"
                                            min="1"
                                        />
                                    </div>
                                    <div className="col-2">
                                        <button onClick={handleIncrement} className="btn btn-outline-dark w-100">+</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-3">
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className="form-control text-center"
                                            min="1"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <button onClick={handleAddToCart} className="btn btn-primary w-100">
                                            <svg width="18" height="18"><use href="#cart" /></svg> Add to Cart
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="col-1">
                                <button
                                    onClick={() => toggleFavourite(product.id)}
                                    className={`btn ${isFavourite ? 'btn-dark' : 'btn-outline-dark'}`}
                                >
                                    <svg width="18" height="18"><use href="#heart" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
