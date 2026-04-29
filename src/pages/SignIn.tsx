import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../services/apiClient";
import { useState } from "react";
import { useNavigate } from "react-router";
import { type LoginFormValues } from '../types';
import axios from 'axios';

export default function SignIn() {
    const [apiError, setApiError] = useState<string>("");

    const navigate = useNavigate();

    const initialValues: LoginFormValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    });

    const handleSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
        setApiError("");

        try {
            const response = await apiClient.post("/api/login", values);
            console.log("Success:", response);

            // Example: store token
            localStorage.setItem("accessToken", response.data.token);
            localStorage.setItem("userrole", response.data.role);

            try {
                const response = await apiClient.get('/api/profile');
                localStorage.setItem("currentuser", JSON.stringify(response.data))
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }

            window.location.href = "/home";

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response) {
                    setApiError(error.response.data.message || "Login failed");
                }
            }
            else {
                setApiError("Network error. Try again.");
            }

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center mb-3">Login</h3>

                {apiError && <div className="alert alert-danger">{apiError}</div>}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form>
                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Field type="password" name="password" className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>

                            <button type="submit" className="btn btn-primary w-49" disabled={isSubmitting}  >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>&nbsp;
                            <button type="button" className="btn btn-info w-49" onClick={() => navigate(`/signup`)}>SignUp</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

