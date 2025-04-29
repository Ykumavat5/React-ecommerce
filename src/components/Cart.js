// Cart.js
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./hooks/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ReCAPTCHA from "react-google-recaptcha";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe("pk_test_51PT1lF2KXWWRtS4wteQaFVjBqVZDyEYk9TZydkmEwRCwk7ClXJQPGc2yYMgTnxyQK521noLavAM7nOVVSzA7tNXw00lsCFsTYb");

const CartContent = () => {
    const [captchaToken, setCaptchaToken] = useState(null);
    const navigate = useNavigate();
    const { cart, updateCartQuantity, deleteCartItem } = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [formData, setFormData] = useState({
        recipient: "",
        address: "",
        timeslot: "",
    });

    useEffect(() => {
        document.body.classList.toggle("modal-open", showModal);
        return () => document.body.classList.remove("modal-open");
    }, [showModal]);

    const fetchTimeSlots = async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/timeslots", {
                headers: { api_key: "123456789" },
            });
            setTimeSlots(res.data?.data?.result || []);
        } catch (error) {
            toast.error("Failed to fetch time slots.");
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
        return (cart || []).reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckoutClick = () => {
        fetchTimeSlots();
        const offcanvasElement = document.getElementById("offcanvasCart");
        if (offcanvasElement && window.bootstrap) {
            const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                new window.bootstrap.Offcanvas(offcanvasElement);
            offcanvas.hide();
        }
        setTimeout(() => setShowModal(true), 300);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProceedToPay = () => {
        const { recipient, address, timeslot } = formData;
        if (!recipient || !address || !timeslot) {
            toast.warn("Please fill out all checkout fields.");
            return;
        }
        if (!captchaToken) {
            toast.warn("Please complete the CAPTCHA.");
            return;
        }

        const checkoutData = {
            recipient,
            address,
            timeslot,
            cart,
            total: calculateTotal(),
        };

        setShowModal(false);
        navigate("/payment", { state: checkoutData });
    };

    return (
        <>
            <div className="offcanvas offcanvas-end" id="offcanvasCart" tabIndex="-1">
                <div className="offcanvas-header justify-content-end">
                    <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <h4 className="d-flex justify-content-between mb-3">
                        <span>Your cart</span>
                        <span className="badge bg-primary rounded-pill">{cart.length}</span>
                    </h4>

                    <ul className="list-group mb-3">
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <li key={item.product_id} className="list-group-item d-flex flex-column">
                                    <div className="d-flex justify-content-between">
                                        <Link
                                            to={`/product/${item.product_id}`}
                                            className="text-decoration-none"
                                            style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                        >
                                            {(item.title || "").split(" ").length > 5
                                                ? (item.title || "").split(" ").slice(0, 5).join(" ") + "..."
                                                : item.title}
                                        </Link>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
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
                            <div className="text-center py-5 fw-semibold fs-5">No products available.</div>
                        )}

                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${calculateTotal()}</strong>
                        </li>
                    </ul>

                    <button className="w-100 btn btn-primary btn-lg" onClick={handleCheckoutClick} disabled={cart.length === 0}>
                        Continue to checkout
                    </button>
                </div>
            </div>

            {showModal && (
                <>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Checkout Details</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Recipient Name</label>
                                        <input type="text" className="form-control" name="recipient" value={formData.recipient} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Delivery Address</label>
                                        <textarea className="form-control" name="address" rows="2" value={formData.address} onChange={handleInputChange}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Delivery Time Slot</label>
                                        <select className="form-select" name="timeslot" value={formData.timeslot} onChange={handleInputChange}>
                                            <option value="">-- Select a Time Slot --</option>
                                            {timeSlots.map((slot) => (
                                                <option key={slot.id} value={slot.id}>
                                                    {slot.slot}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <ReCAPTCHA
                                            sitekey="6LdIHCgrAAAAAJELnTTbf4afEszmCZ7YS4ZqXIkC"
                                            onChange={(token) => setCaptchaToken(token)}
                                            onExpired={() => setCaptchaToken(null)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={handleProceedToPay}>Proceed to Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}
        </>
    );
};

const Cart = () => (
    <Elements stripe={stripePromise}>
        <CartContent />
    </Elements>
);

export default Cart;
