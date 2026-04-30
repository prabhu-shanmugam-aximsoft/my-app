
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { type SignupForm } from '../types';
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react';


export default function Signup() {

    const { create, error } = useUser();

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error);
        }
    }, [error]);

    const formik = useFormik<SignupForm>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Minimum 3 characters')
                .required('Name is required'),

            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),

            password: Yup.string()
                .min(6, 'Minimum 6 characters')
                .required('Password is required'),

            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm your password'),
        }),

        onSubmit: async (values, { setSubmitting }) => {
            try {
                const { confirmPassword, ...apiPayload } = values;
                create(apiPayload);
                alert('Signup successful');
                if (!error) {
                    window.location.href = "/signin";
                }
                else {
                    alert(error);
                }
            } catch (err) {
                console.error(err);               
                alert(err);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="mb-4 text-center">Sign Up</h3>

                            <form onSubmit={formik.handleSubmit}>

                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''
                                            }`}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="invalid-feedback">{formik.errors.name}</div>
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                                            }`}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="invalid-feedback">{formik.errors.email}</div>
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                                            }`}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password"
                                        name="confirmPassword"
                                        className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''
                                            }`}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                                </div>

                                {/* Submit */}
                                <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? 'Signing up...' : 'Sign Up'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
