import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { type User } from '../types';
import apiClient from "../services/apiClient";
import { useTitle } from '../context/TitleProvider';
import axios from 'axios';

export default function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState<User | null>(null);

    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle("Edit User");
    }, [setTitle]);


    useEffect(() => {
        const fetchUser = async () => {
            const response = await apiClient.get(`/api/users/${id}`);
            console.log(response);
            setInitialValues(response.data);
        };

        if (id) fetchUser();
    }, [id]);

    const formik = useFormik<User>({
        enableReinitialize: true,
        initialValues: initialValues || { id: 0, name: '', email: '', role: '' },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            role: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log("formvalue:" + JSON.stringify(values));
                await apiClient.put(`/api/users/${id}`, JSON.stringify(values));

                navigate('/users');
            } catch (err) {

                if (axios.isAxiosError(err)) {
                    if (err?.response) {

                        alert(err?.response?.data?.message);
                    }
                }
                else {
                    alert('Failed to update');
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (!initialValues) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4>Edit User</h4>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <input name="name" className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} value={formik.values.name} onChange={formik.handleChange} />
                            {formik.touched.name && formik.errors.name && (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <input name="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} value={formik.values.email} onChange={formik.handleChange} />
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <select name="role" className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`} value={formik.values.role} onChange={formik.handleChange}>
                                <option key="admin" value="admin">Admin</option>
                                <option key="user" value="user">User</option>
                            </select>
                            {formik.touched.role && formik.errors.role && (
                                <div className="invalid-feedback">{formik.errors.role}</div>
                            )}
                        </div>
                        <button className="btn btn-success" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </form>
                </div>
            </div>
        </div >
    );
};