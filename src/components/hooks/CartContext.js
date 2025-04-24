import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
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
    

    const addToCart = async (productId, quantity) => {
        try {
            const token = localStorage.getItem("token_organic");
            await axios.post("http://localhost:3035/api/v1/user/cart/add", { product_id: productId, quantity }, {
                headers: { api_key: "123456789", token }
            });
            fetchCart();
            toast.success("🛒 Item added to cart!");

        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart.");

        }
    };

    const updateCartQuantity = async (productId, quantity) => {
        try {
            const token = localStorage.getItem("token_organic");
            await axios.post("http://localhost:3035/api/v1/user/cart/update", { product_id: productId, quantity }, {
                headers: { api_key: "123456789", token }
            });
            fetchCart();
            toast.info("🛍️ Cart updated");

        } catch (error) {
            console.error("Error updating cart quantity:", error);
            toast.error("Failed to update cart.");

        }
    };
    const deleteCartItem = async (product_id) => {
        const token = localStorage.getItem("token_organic");
        try {
            await axios.delete("http://localhost:3035/api/v1/user/cart/delete", {
                headers: { api_key: "123456789", token },
                data: { product_id },
            });
            fetchCart();
            toast.warn("🗑️ Item removed from cart");

        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to remove item from cart.");
        }
    };
    const clearCart = () => {
        setCart([]);
        toast.info("🧹 Cart cleared");
    };    

    useEffect(() => {
        fetchCart(); // Fetch cart when app loads
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, fetchCart,deleteCartItem ,clearCart}}>
            {children}
        </CartContext.Provider>
    );
};
