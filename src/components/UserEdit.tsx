import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type User } from '../types';
import { useTitle } from '../context/TitleProvider';
import { Floppy, XCircle } from 'react-bootstrap-icons';
import { useUser } from '../hooks/useUser';

export default function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState<User | null>(null);
    const { selectedItem, fetchOne, update, error } = useUser();

    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle("User Management");
    }, [setTitle]);

    useEffect(() => {
        fetchOne(id || '');
    }, []);


    useEffect(() => {
        console.log(selectedItem);
        setInitialValues(selectedItem);
    }, [selectedItem]);

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error);
        }
    }, [error]);

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
                update(id || '', values);
                if (!error) {
                    navigate('/users');
                }
            } catch (err) {
                alert('Failed to update');
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
                            <label className="form-label">Name</label>
                            <input name="name" className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} value={formik.values.name} onChange={formik.handleChange} />
                            {formik.touched.name && formik.errors.name && (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input name="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} value={formik.values.email} onChange={formik.handleChange} />
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select name="role" className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`} value={formik.values.role} onChange={formik.handleChange}>
                                <option key="admin" value="admin">Admin</option>
                                <option key="user" value="user">User</option>
                            </select>
                            {formik.touched.role && formik.errors.role && (
                                <div className="invalid-feedback">{formik.errors.role}</div>
                            )}
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-success" disabled={formik.isSubmitting}>
                                <Floppy size={20} /> {formik.isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                            <button className="btn btn-secondary" onClick={() => navigate(-1)}><XCircle size={20} /> Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};