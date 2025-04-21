import React, { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("token_organic");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) return setMessage("Please enter an email");

    try {
      const res = await axios.post("http://localhost:3035/api/v1/user/toogleSubscribe",
        {
          email,
        }, {
        headers: {
          api_key: "123456789",
          token
        },
      }
      );

      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      setMessage("An error occurred while subscribing.");
    }
  };

  return (
    <footer className="py-5">
      <div className="container-lg">
        <div className="row">
          {/* Other footer sections */}
          <div className="col-lg-3 col-md-6 col-sm-6">

            <div className="footer-menu">
              <img src="/assets/images/logo.svg" width="240" height="70" alt="logo" />
              <div className="social-links mt-3">
                <ul className="d-flex list-unstyled gap-2">
                  <li>
                    <a href="/dashboard" className="btn btn-outline-light">
                      <svg width="16" height="16"><use href="#facebook"></use></svg>
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="btn btn-outline-light">
                      <svg width="16" height="16"><use href="#twitter"></use></svg>
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="btn btn-outline-light">
                      <svg width="16" height="16"><use href="#youtube"></use></svg>
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="btn btn-outline-light">
                      <svg width="16" height="16"><use href="#instagram"></use></svg>
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="btn btn-outline-light">
                      <svg width="16" height="16"><use href="#amazon"></use></svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Organic</h5>
              <ul className="menu-list list-unstyled">
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">About us</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Conditions </a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Our Journals</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Careers</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Affiliate Programme</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Ultras Press</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Quick Links</h5>
              <ul className="menu-list list-unstyled">
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Offers</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Discount Coupons</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Stores</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Track Order</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Shop</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Info</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Customer Service</h5>
              <ul className="menu-list list-unstyled">
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">FAQ</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Contact</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Privacy Policy</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Returns & Refunds</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Cookie Guidelines</a>
                </li>
                <li className="menu-item">
                  <a href="/dashboard" className="nav-link">Delivery Information</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer - Subscribe Section */}
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-menu">
              <h5 className="widget-title">Subscribe Us</h5>
              <p>Subscribe to our newsletter to get updates about our grand offers.</p>

              {/* Display message if exists */}
              {message && (
                <div className="alert alert-info" role="alert">
                  {message}
                </div>
              )}

              <form className="d-flex mt-3 gap-0" onSubmit={handleSubscribe}>
                <input
                  className="form-control rounded-start rounded-0 bg-light"
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-dark rounded-end rounded-0" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Other footer sections */}
        </div>
      </div>
    </footer >
  );
};

export default Footer;
