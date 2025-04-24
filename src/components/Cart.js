import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./hooks/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { cart, updateCartQuantity, deleteCartItem, clearCart } = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [formData, setFormData] = useState({
        recipient: "",
        address: "",
        timeslot: ""
    });

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => document.body.classList.remove("modal-open");
    }, [showModal]);

    const fetchTimeSlots = async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/timeslots", {
                headers: { api_key: "123456789" }
            });
            setTimeSlots(res.data.data.result || []);
        } catch (error) {
            console.error("Error fetching timeslots:", error);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            deleteCartItem(productId);
        } else {
            updateCartQuantity(productId, newQuantity);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckoutClick = () => {
        fetchTimeSlots();

        // Hide the Bootstrap offcanvas before showing modal
        const offcanvasElement = document.getElementById("offcanvasCart");
        if (offcanvasElement && window.bootstrap) {
            const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement)
                || new window.bootstrap.Offcanvas(offcanvasElement);
            offcanvas.hide();
        }

        setTimeout(() => setShowModal(true), 300);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProceedToPay = async () => {
        if (!formData.recipient || !formData.address || !formData.timeslot) {
            alert("Please complete all fields before proceeding.");
            return;
        }

        const payload = {
            recipient: formData.recipient,
            address: formData.address,
            timeslot_id: formData.timeslot,
            total: parseFloat(calculateTotal()),
            items: cart.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            const token = localStorage.getItem("token_organic");

            const response = await axios.post(
                "http://localhost:3035/api/v1/user/checkout",
                payload,
                {
                    headers: {
                        api_key: "123456789",
                        token,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                clearCart();

                // alert("Checkout successful!");
                toast.success("🎉 Order placed successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                console.log("Order placed successfully:", response.data);
            } else {
                alert("Checkout failed with status code: " + response.status);
                console.log("Error:", response.data);
            }

            // Optionally clear cart or redirect
            setShowModal(false);
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong during checkout. Please try again.");
        }
    };


    return (
        <>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart">
                <div className="offcanvas-header justify-content-end">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">
                    <div className="order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill">{cart.length}</span>
                        </h4>

                        <ul className="list-group mb-3">
                            {cart.length > 0 ? (
                                cart.map((item) => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm flex-column align-items-start">
                                        <div className="d-flex justify-content-between w-100">
                                            <div>
                                                <Link
                                                    to={`/product/${item.product_id}`}
                                                    className="text-decoration-none text-dark"
                                                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                    title={item.title}
                                                >
                                                    {(item.title || '').split(' ').slice(0, 5).join(' ')}
                                                    {(item.title || '').split(' ').length > 5 ? '...' : ''}
                                                </Link>
                                            </div>
                                            <span className="text-body-secondary">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>

                                        <div className="d-flex mt-2 align-items-center gap-2">
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}>+</button>
                                            <button className="btn btn-sm btn-danger ms-auto" onClick={() => deleteCartItem(item.product_id)}>Remove</button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div className="text-center py-5 fw-semibold fs-5 w-100">No products available.</div>
                            )}

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${calculateTotal()}</strong>
                            </li>
                        </ul>

                        <button
                            className="w-100 btn btn-primary btn-lg"
                            type="button"
                            onClick={handleCheckoutClick}
                            disabled={cart.length === 0}
                        >
                            Continue to checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1050,
                    }}
                    tabIndex="-1"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Checkout Details</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Recipient Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="recipient"
                                        value={formData.recipient}
                                        onChange={handleInputChange}
                                        placeholder="Enter recipient name"
                                        autoFocus
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Delivery Address</label>
                                    <textarea
                                        className="form-control"
                                        name="address"
                                        rows="2"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter delivery address"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Select Delivery Time Slot</label>
                                    <select
                                        className="form-select"
                                        name="timeslot"
                                        value={formData.timeslot}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">-- Select a Time Slot --</option>
                                        {timeSlots.length > 0 ? (
                                            timeSlots.map((slot) => (
                                                <option key={slot.id} value={slot.id}>
                                                    {slot.slot}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">-- No timeslot available --</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleProceedToPay}
                                >
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Cart;
