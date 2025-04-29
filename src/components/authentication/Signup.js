import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import { useAuth } from "../../AuthContext";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    // const { login } = useAuth();

    const handleSignup = async (values, { setSubmitting, setErrors }) => {
        try {
            const payload = {
                ...values,
                device_type: "android",
                device_name: "fdfe",
                os_version: "11.2",
                app_version: "5.2",
                ip: "192.356.556",
                login_type: "simple",
            };

            const response = await fetch("http://localhost:3035/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    api_key: "123456789",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.status === 200 && data.code === 201) {
                navigate("/login");
            } else {
                setErrors({ general: data.message || "Signup failed, Please try again." });
            }
        } catch (error) {
            console.log(error);
            setErrors({ general: "Something went wrong. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h2 className="signup-title">Create Your Account</h2>

                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        country_code: "",
                        mobile_number: "",
                        password: "",
                        confirmPassword: "",
                        role: "",
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Name is required"),
                        email: Yup.string().email("Invalid email").required("Email is required"),
                        country_code: Yup.string()
                            .matches(/^\+\d+$/, "Country code must start with '+' and include numbers")
                            .required("Country code is required"),
                        mobile_number: Yup.string()
                            .matches(/^\d{6,15}$/, "Enter a valid mobile number")
                            .required("Mobile number is required"),
                        password: Yup.string()
                            .min(6, "Password must be at least 6 characters")
                            .required("Password is required"),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref("password")], "Passwords must match")
                            .required("Confirm Password is required"),
                        role: Yup.string().required("Role is required"),
                    })}
                    onSubmit={handleSignup}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="signup-form">
                            {errors.general && <div className="error-banner">{errors.general}</div>}

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field name="name" type="text" placeholder="Enter your full name" />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" placeholder="Enter your email address" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>

                            <div className="form-group-inline">
                                <div className="form-group">
                                    <label htmlFor="country_code">Country Code</label>
                                    <Field name="country_code" type="text" placeholder="+91" />
                                    <ErrorMessage name="country_code" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mobile_number">Mobile Number</label>
                                    <Field name="mobile_number" type="text" placeholder="Enter mobile number" />
                                    <ErrorMessage name="mobile_number" component="div" className="error" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" placeholder="Create password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field name="confirmPassword" type="password" placeholder="Confirm password" />
                                <ErrorMessage name="confirmPassword" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <Field name="role" as="select">
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Field>
                                <ErrorMessage name="role" component="div" className="error" />
                            </div>

                            <button type="submit" className="signup-btn" disabled={isSubmitting}>
                                {isSubmitting ? "Signing Up..." : "Sign Up"}
                            </button>

                            <div className="signup-footer">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;
