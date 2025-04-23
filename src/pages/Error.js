import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
      <h2>⚠️ Something went wrong.</h2>
      <p>We’re working to fix the issue. Try refreshing the page or click <Link to='/dashboard'>here</Link>.</p>
    </div>
  );
};

export default Error;