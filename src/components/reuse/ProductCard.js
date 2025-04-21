import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../reuse/CartContext';
import axios from 'axios';

const ProductCard = ({ product, favourites, setFavourites }) => {
    const { cart, addToCart, updateCartQuantity,deleteCartItem } = useContext(CartContext);
    const cartItem = cart.find(item => item.product_id === product.id);
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

    useEffect(() => {
        if (cartItem) setQuantity(cartItem.quantity);
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
            // Quantity is 1, so delete from cart
            deleteCartItem(product.id);
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

    return (
        <div className="product-item h-100">
            <figure>
                <a href={`/product/${product.id}`} title={product.title}>
                    <img src={product?.media} alt="Product Thumbnail" className="tab-image"
                        style={{ height: "200px", objectFit: "cover" }}
                    />
                </a>
            </figure>

            <div className="d-flex flex-column text-center">
                <h3 className="fs-6 fw-normal product-title "
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.2em",
                        height: "2.4em",
                    }}
                >{product.title}</h3>

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
                    <span className="text-dark fw-semibold">{product?.discounted_price ? "$" + product?.discounted_price : ""}</span>
                    <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                        {product?.discount_percentage ? product?.discount_percentage + "% off" : ""}
                    </span>
                </div>

                <div className="button-area p-3 pt-0">
                    <div className="row g-1 mt-2">

                        {cartItem ? (
                            <>
                                <div className="col-3">
                                    <button onClick={handleDecrement} className="btn btn-outline-dark rounded-1 w-100 h-100">-</button>
                                </div>
                                <div className="col-4 h-100">
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                    />
                                </div>
                                <div className="col-3">
                                    <button onClick={handleIncrement} className="btn btn-outline-dark rounded-1 w-100 h-100">+</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-3">
                                    <input
                                        type="number"
                                        className="form-control border-dark-subtle input-number quantity"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                    />
                                </div>
                                <div className="col-7">
                                    <button
                                        onClick={handleAddToCart}
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
    );
};

export default ProductCard;
