import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/hooks/CartContext";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#a0aec0",
            },
        },
        invalid: {
            color: "#e53e3e",
            iconColor: "#e53e3e",
        },
    },
};

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const stripe = useStripe();
    const elements = useElements();
    const [loadingStep, setLoadingStep] = useState(null);
    const { clearCart } = useContext(CartContext);
    const { recipient, address, timeslot, cart, total } = location.state || {};

    const handlePayment = async () => {
        try {
            setLoadingStep("processing");

            const token = localStorage.getItem("token_organic");

            const paymentIntentRes = await axios.post(
                "http://localhost:3035/api/v1/user/create-payment-intent",
                { amount: parseFloat(total) * 100 },
                {
                    headers: {
                        api_key: "123456789",
                        token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const clientSecret = paymentIntentRes.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setLoadingStep(null);
                toast.error(result.error.message || "Payment failed");
            } else if (result.paymentIntent.status === "succeeded") {
                setLoadingStep("placing");
                const checkoutRes = await axios.post(
                    "http://localhost:3035/api/v1/user/checkout",
                    {
                        recipient,
                        address,
                        timeslot_id: timeslot,
                        total: parseFloat(total),
                        items: cart.map((item) => ({
                            product_id: item.product_id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                    {
                        headers: {
                            api_key: "123456789",
                            token,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (checkoutRes.status === 200 || checkoutRes.status === 201) {
                    clearCart();
                    // setLoadingStep(null);
                    setTimeout(() => navigate("/dashboard"), 1500);
                    toast.success("🎉 Order placed successfully!");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while processing payment.");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm p-4">
                        <h3 className="mb-3 text-center">Payment Information</h3>
                        <div className="mb-4 border rounded p-3">
                            <CardElement options={CARD_ELEMENT_OPTIONS} />
                        </div>

                        <button
                            className="btn btn-primary w-100"
                            onClick={handlePayment}
                            disabled={loadingStep !== null}
                        >
                            {loadingStep === "processing"
                                ? "Processing payment..."
                                : loadingStep === "placing"
                                    ? "Placing order..."
                                    : `Pay $${parseFloat(total).toFixed(2)}`}
                        </button>

                    </div>
                </div>

                <div className="col-md-4 mt-4 mt-md-0">
                    <div className="card shadow-sm p-4 bg-light">
                        <h5 className="mb-3">Order Summary</h5>
                        <ul className="list-group mb-3">
                            {cart?.map((item, index) => (
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                    key={index}
                                >
                                    <span>{(item.title || "").split(" ").length > 4 ? (item.title || "").split(" ").slice(0, 4).join(" ") + "..." : item.title} × {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <p><strong>Recipient:</strong> {recipient}</p>
                        <p><strong>Address:</strong> {address}</p>
                        <p className="fs-5 fw-bold">Total: ${parseFloat(total).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
