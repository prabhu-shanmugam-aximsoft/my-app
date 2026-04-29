
import React from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import apiClient from "../services/apiClient";
import { type UserProfile } from '../types';
import { Floppy, Pencil, XCircle } from 'react-bootstrap-icons';


export const ProfileView: React.FC<{ user: UserProfile; onEdit: () => void }> = ({ user, onEdit }) => {
    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title mb-3">Profile</h4>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>

                    <button className="btn btn-primary" onClick={onEdit}>
                        <Pencil size={20} /> Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};



export const ProfileEdit: React.FC<{
    user: UserProfile;
    onSave: (user: UserProfile) => void;
    onCancel: () => void;
}> = ({ user, onSave, onCancel }) => {


    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'Minimum 3 characters').required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .notRequired(),
    });

    const formik = useFormik<UserProfile>({
        initialValues: user,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log("formvalue:" + JSON.stringify(values));

                const payload: Partial<UserProfile> = {
                    name: values.name,
                    email: values.email,
                };

                if (values.password && values.password.trim() !== "") {
                    payload.password = values.password;
                }

                const response = await apiClient.put('/api/profile', JSON.stringify(payload));
                console.log(response);

                const updated = response.data;
                onSave(updated);
            } catch (error) {
                console.error('Update failed', error);
                alert('Failed to update profile');
            } finally {
                setSubmitting(false);
            }
        },
    });



    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title mb-3">Edit Profile</h4>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Password (Optional)</label>
                            <input
                                type="password"
                                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            )}
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success"><Floppy size={20} /> Save</button>
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                <XCircle size={20} />  Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

