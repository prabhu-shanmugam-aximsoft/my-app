// ================= PROFILE VIEW =================

import React from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import apiClient from "../services/apiClient";

interface UserProfile {
    name: string;
    email: string;
    role: string;
    password: string;
}

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
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};
// ================= PROFILE EDIT =================


export const ProfileEdit: React.FC<{
    user: UserProfile;
    onSave: (user: UserProfile) => void;
    onCancel: () => void;
}> = ({ user, onSave, onCancel }) => {

    const currentUserRole = localStorage.getItem('userrole'); // assume stored at login
    const isAdmin = currentUserRole === 'admin';

    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'Minimum 3 characters').required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        role: Yup.string().required('Role is required'),
    });

    const formik = useFormik<UserProfile>({
        initialValues: user,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                 console.log("formvalue:" + JSON.stringify(values));
                const response = await apiClient.put('/api/profile', JSON.stringify(values));
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
                            <label className="form-label">Role</label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={!isAdmin}
                            />
                            {formik.touched.role && formik.errors.role && (
                                <div className="invalid-feedback">{formik.errors.role}</div>
                            )}
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

