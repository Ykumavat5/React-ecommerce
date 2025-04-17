import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    console.log(login);

    const handleSignup = async (values, { setSubmitting, setErrors }) => {
        try {
            const payload = {
                ...values,
                device_type: "android",
                device_name: "fdfe",
                os_version: "11.2",
                app_version: "5.2",
                ip: "192.356.556",
                login_type: 'simple'
            };

            const response = await fetch("http://localhost:3036/api/v1/auth/adminsignup", {
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
                setErrors({ general: "Signup failed, Please try again." });
                console.log(data.message);
            }


        } catch (error) {
            console.log(error);

            setErrors({ general: "Something went wrong. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="form-container">
            <div className="auth-form">
                <h2>Sign Up</h2>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        country_code: "",
                        mobile_number: "",
                        password: "",
                        confirmPassword: "",
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
                        role: Yup.string().required("Please select a type"),
                    })}
                    onSubmit={handleSignup}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            {errors.general && <div className="error-message">{errors.general}</div>}

                            <div className="form-group">
                                <Field name="name" type="text" placeholder="Name" />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <Field name="email" type="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <Field name="country_code" type="text" placeholder="Country Code (e.g. +91)" />
                                <ErrorMessage name="country_code" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <Field name="mobile_number" type="text" placeholder="Mobile Number" />
                                <ErrorMessage name="mobile_number" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <Field name="password" type="password" placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <Field name="confirmPassword" type="password" placeholder="Confirm Password" />
                                <ErrorMessage name="confirmPassword" component="div" className="error" />
                            </div>


                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Signing up..." : "Sign Up"}
                            </button>

                            <p>
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;
