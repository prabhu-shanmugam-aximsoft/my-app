import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { type LoginFormValues } from '../types';

import { useAuth } from '../hooks/useAuth';

export default function SignIn() {
    const [apiError, setApiError] = useState<string>("");
    const { error, login, isAuthenticated, clearAuthError } = useAuth();

    const navigate = useNavigate();

    // Auto-redirect on successful login
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (error) {
            console.log(error);
            setApiError(error);
        }
    }, [error]);

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
        clearAuthError();
        login(values);
        setSubmitting(false);
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
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>&nbsp;
                            <button type="button" className="btn btn-info w-49" onClick={() => navigate(`/signup`)}>SignUp</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

