import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = useCallback(async () => {
        const token = localStorage.getItem("token_organic");
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/cart", {
                headers: {
                    api_key: "123456789",
                    token: token,
                },
            });

            const items = Array.isArray(res.data?.data?.result) ? res.data.data.result : [];
            setCartItems(items);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setCartItems([]);
        }
    }, []);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    const handleIncrement = async (product_id) => {
        const token = localStorage.getItem("token_organic");
        try {
            await axios.post(
                "http://localhost:3035/api/v1/user/cart/increase",
                { product_id },
                { headers: { api_key: "123456789", token } }
            );
            fetchCartItems(); // refresh cart
        } catch (error) {
            console.error("Error incrementing item:", error);
        }
    };

    const handleDecrement = async (product_id) => {
        const token = localStorage.getItem("token_organic");
        try {
            await axios.post(
                "http://localhost:3035/api/v1/user/cart/decrease",
                { product_id },
                { headers: { api_key: "123456789", token } }
            );
            fetchCartItems(); // refresh cart
        } catch (error) {
            console.error("Error decrementing item:", error);
        }
    };

    const handleDelete = async (product_id) => {
        const token = localStorage.getItem("token_organic");
        try {
            await axios.delete("http://localhost:3035/api/v1/user/cart/delete", {
                headers: { api_key: "123456789", token },
                data: { product_id }, // for DELETE, data must be inside `data`
            });
            fetchCartItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    return (
        <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart">
            <div className="offcanvas-header justify-content-center">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm flex-column align-items-start">
                                    <div className="d-flex justify-content-between w-100">
                                        <div>
                                            <h6 className="my-0">{item.title}</h6>
                                        </div>
                                        <span className="text-body-secondary">${item.price * item.quantity}</span>
                                    </div>
                                    <div className="d-flex mt-2 align-items-center gap-2">
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDecrement(item.product_id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleIncrement(item.product_id)}>+</button>
                                        <button className="btn btn-sm btn-danger ms-auto" onClick={() => handleDelete(item.product_id)}>Remove</button>
                                    </div>
                                </li>
                            ))

                        ):(
                        <div className="text-center py-5 fw-semibold fs-5 w-100">No products available.</div>
                        )
                        }

                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${calculateTotal()}</strong>
                        </li>
                    </ul>
                    <button className="w-100 btn btn-primary btn-lg" type="submit">
                        Continue to checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
