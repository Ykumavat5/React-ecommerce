import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch("http://localhost:3035/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: "123456789",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.status === 200 && data.code === 200) {
        // Use context to handle login + localStorage
        login(data.data.token, data.data);
        // Navigation happens in useEffect after context updates
      } else {
        setErrors({ general: "Invalid credentials" });
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  // 🔁 Navigate after context is fully updated
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="form-container">
      <div className="auth-form ">
        <div className="d-flex align-items-center mx-5 mb-5 my-3 my-sm-0">
          <Link to="index.html">
            <img src="/assets/images/logo.svg" alt="logo" className="img-fluid" style={{margin:"25px 30px"}} />
          </Link>
        </div>
        <h2>Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && <div className="error-message">{errors.general}</div>}

              <div className="form-group">
                <Field name="email" type="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <Field name="password" type="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p>
                New user? <Link to="/signup">Register</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
