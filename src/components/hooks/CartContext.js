import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Fetch cart for authenticated users, otherwise, fetch from localStorage for guest users
    const fetchCart = async () => {
        const token = localStorage.getItem("token_organic");
        
        if (token) {
            // Fetch cart from server for logged-in users
            try {
                const res = await axios.get("http://localhost:3035/api/v1/user/cart", {
                    headers: { api_key: "123456789", token }
                });
                setCart(res.data.data.result || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        } else {
            // Fetch cart from localStorage for guest users
            const storedCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
            setCart(storedCart);
        }
    };

    // Save cart to localStorage for guest users
    const saveGuestCart = (cartData) => {
        localStorage.setItem("guest_cart", JSON.stringify(cartData));
    };

    // Add to cart
    const addToCart = async (productId, quantity) => {
        const token = localStorage.getItem("token_organic");
        const newItem = { product_id: productId, quantity };

        if (token) {
            // For logged-in users, send to server
            try {
                const res = await axios.post("http://localhost:3035/api/v1/user/cart/add", newItem, {
                    headers: { api_key: "123456789", token }
                });
                if (res.status === 200 || res.status === 201) {
                    fetchCart();
                    toast.success("🛒 Item added to cart!");
                } else {
                    toast.error("Failed to add item to cart.");
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error("Failed to add item to cart.");
            }
        } else {
            // For guest users, save to localStorage
            const updatedCart = [...cart, newItem];
            setCart(updatedCart);
            saveGuestCart(updatedCart);
            toast.success("🛒 Item added to cart!");
        }
    };

    // Update cart quantity
    const updateCartQuantity = async (productId, quantity) => {
        const token = localStorage.getItem("token_organic");

        if (token) {
            try {
                const res = await axios.post("http://localhost:3035/api/v1/user/cart/update", {
                    product_id: productId,
                    quantity
                }, {
                    headers: { api_key: "123456789", token }
                });

                if (res.status === 200 || res.status === 201) {
                    fetchCart();
                    toast.info("🛍️ Cart updated");
                } else {
                    toast.error("Failed to update cart.");
                }
            } catch (error) {
                console.error("Error updating cart quantity:", error);
                toast.error("Failed to update cart.");
            }
        } else {
            // For guest users, update in localStorage
            const updatedCart = cart.map(item => 
                item.product_id === productId ? { ...item, quantity } : item
            );
            setCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };

    // Delete cart item
    const deleteCartItem = async (product_id) => {
        const token = localStorage.getItem("token_organic");

        if (token) {
            // For logged-in users, remove from server
            try {
                const res = await axios.delete("http://localhost:3035/api/v1/user/cart/delete", {
                    headers: { api_key: "123456789", token },
                    data: { product_id: product_id }
                });

                if (res.status === 200 || res.status === 201) {
                    fetchCart();
                    toast.warn("🗑️ Item removed from cart");
                } else {
                    toast.error("Failed to remove item from cart.");
                }
            } catch (error) {
                console.error("Error deleting item:", error);
                toast.error("Failed to remove item from cart.");
            }
        } else {
            // For guest users, remove from localStorage
            const updatedCart = cart.filter(item => item.product_id !== product_id);
            setCart(updatedCart);
            saveGuestCart(updatedCart);
            toast.warn("🗑️ Item removed from cart");
        }
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("guest_cart");  // Clear guest cart from localStorage
        toast.info("🧹 Cart cleared");
    };

    useEffect(() => {
        fetchCart(); // Fetch cart when the component mounts
    }, []);

    return (
        <CartContext.Provider value={{
            cart, addToCart, updateCartQuantity, fetchCart, deleteCartItem, clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
