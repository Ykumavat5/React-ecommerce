import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token_organic");

  const fetchSubscriptionStatus = useCallback(async () => {
    if (!token) {
      setIsSubscribed(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3035/api/v1/user/newsletter", {
        headers: {
          api_key: "123456789",
          token,
        },
      });

      if (response.data?.code === 200) {
        setIsSubscribed(response.data.data?.is_subscribed === 1);
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ✅ Log subscription state on change
  useEffect(() => {
    fetchSubscriptionStatus();
  }, [fetchSubscriptionStatus]);

  const handleToggleSubscribe = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Login to subscribe!");
      return;
    }

    if (!isSubscribed && !email) {
      setMessage("Please enter an email address to subscribe.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3035/api/v1/user/toogleSubscribe",
        isSubscribed ? {} : { email },
        {
          headers: {
            api_key: "123456789",
            token,
          },
        }
      );

      setMessage(res.data.message);
      setEmail("");
      fetchSubscriptionStatus();
    } catch (err) {
      console.error("Subscription error:", err);
      setMessage("An error occurred while toggling subscription.");
    }

    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <footer className="py-5">
      <div className="container-lg">
        <div className="row">
          {/* Branding & Social */}
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-menu">
              <img src="/assets/images/logo.svg" width="240" height="70" alt="logo" />
              <div className="social-links mt-3">
                <ul className="d-flex list-unstyled gap-2">
                  {["facebook", "twitter", "youtube", "instagram", "amazon"].map((icon) => (
                    <li key={icon}>
                      <a href="/dashboard" className="btn btn-outline-light">
                        <svg width="16" height="16"><use href={`#${icon}`}></use></svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Menus */}
          
          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Organic</h5>
              <ul className="menu-list list-unstyled">
                <li><a href="/dashboard" className="nav-link">About us</a></li>
                <li><a href="/dashboard" className="nav-link">Conditions</a></li>
                <li><a href="/dashboard" className="nav-link">Our Journals</a></li>
                <li><a href="/dashboard" className="nav-link">Careers</a></li>
                <li><a href="/dashboard" className="nav-link">Affiliate Programme</a></li>
                <li><a href="/dashboard" className="nav-link">Ultras Press</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Quick Links</h5>
              <ul className="menu-list list-unstyled">
                <li><a href="/dashboard" className="nav-link">Offers</a></li>
                <li><a href="/dashboard" className="nav-link">Discount Coupons</a></li>
                <li><a href="/dashboard" className="nav-link">Stores</a></li>
                <li><a href="/dashboard" className="nav-link">Track Order</a></li>
                <li><a href="/dashboard" className="nav-link">Shop</a></li>
                <li><a href="/dashboard" className="nav-link">Info</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Customer Service</h5>
              <ul className="menu-list list-unstyled">
                <li><a href="/dashboard" className="nav-link">FAQ</a></li>
                <li><a href="/dashboard" className="nav-link">Contact</a></li>
                <li><a href="/dashboard" className="nav-link">Privacy Policy</a></li>
                <li><a href="/dashboard" className="nav-link">Returns & Refunds</a></li>
                <li><a href="/dashboard" className="nav-link">Cookie Guidelines</a></li>
                <li><a href="/dashboard" className="nav-link">Delivery Information</a></li>
              </ul>
            </div>
          </div>

          {/* ✅ Newsletter Subscription Section */}
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">
                {isSubscribed ? "Unsubscribe" : "Subscribe"} Us
              </h5>

              <p>
                {!token
                  ? "Please log in to manage your subscription."
                  : isSubscribed
                    ? "You are currently subscribed to our newsletter. Click below to unsubscribe."
                    : "Enter your email to subscribe to our grand offers."}
              </p>

              {message && (
                <div className="alert alert-info" role="alert">
                  {message}
                </div>
              )}

              {!loading && token && (
                <form className="d-flex mt-3 gap-0 w-100" onSubmit={handleToggleSubscribe}>
                  {!isSubscribed && (
                    <input
                      className="form-control rounded-start rounded-0 bg-light"
                      type="email"
                      placeholder="Email Address"
                      aria-label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  )}
                  <div className="w-100 d-flex justify-content-center mt-2">
                    <button
                      className={`btn btn-dark ${!isSubscribed ? "rounded-end" : "rounded"} rounded-0`}
                      type="submit"
                    >
                      {isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
