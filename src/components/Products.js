import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import useFavourites from "./reuse/useFavourites";
import './reuse/ButtonStyles.css';
import { CartContext } from './reuse/CartContext';

const Product = () => {
    const [favourites, setFavourites] = useFavourites();
    const [products, setProducts] = useState([]);
    const { cart, addToCart, updateCartQuantity, deleteCartItem } = useContext(CartContext);
    const [selectedQuantities, setSelectedQuantities] = useState({});

    const handleQuantityChange = (e, productId) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        const cartItem = cart.find(item => item.product_id === productId);

        if (cartItem) {
            updateCartQuantity(productId, value);
        } else {
            setSelectedQuantities(prev => ({ ...prev, [productId]: value }));
        }
    };

    const handleAddToCart = (productId) => {
        const quantity = selectedQuantities[productId] || 1;
        addToCart(productId, quantity);
        setSelectedQuantities(prev => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
        });
    };

    const handleIncrement = (productId, quantity) => {
        const cartItem = cart.find(item => item.product_id === productId);
        if (cartItem) {
            updateCartQuantity(productId, quantity + 1);
        } else {
            setSelectedQuantities(prev => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }));
        }
    };

    const handleDecrement = (productId, quantity) => {
        const cartItem = cart.find(item => item.product_id === productId);
        if (cartItem) {
            if (quantity > 1) {
                updateCartQuantity(productId, quantity - 1);
            } else {
                deleteCartItem(productId);
            }
        } else {
            setSelectedQuantities(prev => {
                const newQty = (prev[productId] || 1) - 1;
                return { ...prev, [productId]: Math.max(newQty, 1) };
            });
        }
    };

    const handleToggleFavourite = async (productId) => {
        const token = localStorage.getItem("token_organic");
        setFavourites(prev =>
            prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        );
        try {
            const res = await axios.post(
                "http://localhost:3035/api/v1/user/toggleFavourite",
                { product_id: productId },
                { headers: { api_key: "123456789", token } }
            );
            if (res.status === 200) console.log(res.data.message);
        } catch (error) {
            console.error("Error toggling favourite:", error);
            setFavourites(prev =>
                prev.includes(productId) ? [...prev, productId] : prev.filter(id => id !== productId)
            );
        }
    };

    const fetchProducts = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/products", {
                headers: { api_key: "123456789" },
            });
            setProducts(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <section className="pb-5">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap justify-content-between my-4">
                            <h2 className="section-title">Best selling products</h2>
                            <div className="d-flex align-items-center">
                                <a href="/dashboard" className="btn btn-primary rounded-1">View All</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5" id="product-grid">
                            {products.length > 0 ? (
                                products.map((product, index) => {
                                    const cartItem = cart.find(item => item.product_id === product.id);
                                    const quantity = cartItem ? cartItem.quantity : (selectedQuantities[product.id] || 1);

                                    return (
                                        <div className="col" key={index}>
                                            <div className="product-item h-100 d-flex flex-column border p-2">
                                                <figure>
                                                    <a href={`/product/${product.id}`} title={product.title}>
                                                        <img
                                                            src={product.media}
                                                            alt="Product Thumbnail"
                                                            className="tab-image w-100"
                                                            style={{ height: "200px", objectFit: "cover" }}
                                                        />
                                                    </a>
                                                </figure>

                                                <div className="d-flex flex-column text-center flex-grow-1">
                                                    <h3 className="fs-6 fw-normal product-title"
                                                        style={{
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            lineHeight: "1.2em",
                                                            height: "2.4em",
                                                        }}
                                                    >
                                                        {product.title}
                                                    </h3>

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

                                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                                        {product?.discounted_price ? (
                                                            <del>$ {product?.price}</del>
                                                        ) : (
                                                            <span className="text-dark fw-semibold">${product?.price}</span>
                                                        )}
                                                        <span className="text-dark fw-semibold">
                                                            {product?.discounted_price ? "$" + product?.discounted_price : ""}
                                                        </span>
                                                        <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                                                            {product?.discount_percentage ? product?.discount_percentage + "% off" : ""}
                                                        </span>
                                                    </div>

                                                    <div className="button-area p-3 pt-0">
                                                        <div className="row g-1 mt-2">

                                                            {cartItem ? (
                                                                <>
                                                                    <div className="col-3">
                                                                        <button
                                                                            onClick={() => handleDecrement(product.id, quantity)}
                                                                            className="btn btn-outline-dark rounded-1 w-100 h-100"
                                                                        >
                                                                            -
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-4 h-100">
                                                                        <input
                                                                            type="number"
                                                                            className="form-control text-center"
                                                                            value={quantity}
                                                                            onChange={(e) => handleQuantityChange(e, product.id)}
                                                                            min="1"
                                                                        />
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <button
                                                                            onClick={() => handleIncrement(product.id, quantity)}
                                                                            className="btn btn-outline-dark rounded-1 w-100 h-100"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="col-3">
                                                                        <input
                                                                            type="number"
                                                                            className="form-control border-dark-subtle input-number quantity"
                                                                            value={quantity}
                                                                            onChange={(e) => handleQuantityChange(e, product.id)}
                                                                            min="1"
                                                                        />
                                                                    </div>
                                                                    <div className="col-7">
                                                                        <button
                                                                            onClick={() => handleAddToCart(product.id)}
                                                                            className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"
                                                                        >
                                                                            <svg width="18" height="18"><use href="#cart" /></svg> Add to Cart
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}

                                                            <div className="col-2">
                                                                <button
                                                                    onClick={() => handleToggleFavourite(product.id)}
                                                                    className={`btn btn-outline-dark rounded-1 p-2 fs-6 ${favourites.includes(product.id) ? 'heart-black' : 'heart-white'}`}
                                                                >
                                                                    <svg width="18" height="18">
                                                                        <use href="#heart" />
                                                                    </svg>
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-5 fw-semibold fs-5 w-100">No products available.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;
