import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import apiClient from "../services/apiClient";
import { useTitle } from '../context/TitleProvider';
import { Trash3, Eye } from 'react-bootstrap-icons';
import { type Contact } from '../types';



export default function ContactPage() {
    const [data, setData] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    const { setTitle } = useTitle();

    const navigate = useNavigate();

    useEffect(() => { setTitle("Contact Management"); }, [setTitle]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await apiClient.get('api/contact');
                setData(response.data);
            } catch (err) {
                console.error('Failed to fetch messages', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);


    async function handleDelete(id: number) {
        const confirmDelete = window.confirm('Are you sure you want to delete this message?');
        if (!confirmDelete) return;

        try {
            const response = await apiClient.delete(`api/contact/${id}`);
            console.log(response)

            //if (!res.ok) throw new Error('Delete failed');

            setData((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    }

    if (loading) {
        return <div className="text-center mt-5">Loading contacts...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3">Messages</h4>

                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.full_name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.message}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info" onClick={() => navigate(`/contact/view/${item.id}`)}> <Eye size={20} /> View</button>
                                        &nbsp;<button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                                            <Trash3 size={20} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};