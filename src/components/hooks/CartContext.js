import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Fetch cart
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token_organic");
            const res = await axios.get("http://localhost:3035/api/v1/user/cart", {
                headers: { api_key: "123456789", token }
            });
            setCart(res.data.data.result || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Add to cart
    const addToCart = async (productId, quantity) => {
        try {
            const token = localStorage.getItem("token_organic");
            const res = await axios.post("http://localhost:3035/api/v1/user/cart/add",
                { product_id: productId, quantity }, {
                headers: { api_key: "123456789", token }
            });

            if (res.data.code === 200 || res.data.code === 201) {
                fetchCart();
                toast.success("🛒 Item added to cart!");
            } else {
                toast.error("Failed to add item to cart.");
            }

        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart.");
        }
    };

    // Update cart quantity
    const updateCartQuantity = async (productId, quantity) => {
        try {
            const token = localStorage.getItem("token_organic");
            const res = await axios.post("http://localhost:3035/api/v1/user/cart/update", { product_id: productId, quantity }, {
                headers: { api_key: "123456789", token }
            });

            if (res.data.code === 200 || res.data.code === 201) {
                fetchCart();
                toast.info("🛍️ Cart updated");
            } else {
                toast.error("Failed to update cart.");
            }

        } catch (error) {
            console.error("Error updating cart quantity:", error);
            toast.error("Failed to update cart.");
        }
    };

    // Delete cart item
    const deleteCartItem = async (product_id) => {
        const token = localStorage.getItem("token_organic");
        try {
            const res = await axios.delete("http://localhost:3035/api/v1/user/cart/delete", {
                headers: { api_key: "123456789", token },
                data: { product_id },
            });

            if (res.data.code === 200 || res.data.code === 201) {
                fetchCart();
                toast.warn("🗑️ Item removed from cart");
            } else {
                toast.error("Failed to remove item from cart.");
            }

        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to remove item from cart.");
        }
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
        toast.info("🧹 Cart cleared");
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{
            cart, addToCart, updateCartQuantity, fetchCart, deleteCartItem, clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
