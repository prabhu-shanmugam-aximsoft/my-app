import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTitle } from '../context/TitleProvider';
import { Trash3, Eye } from 'react-bootstrap-icons';
import { useContact } from '../hooks/useContact';

export default function ContactPage() {

    const { setTitle } = useTitle();

    const navigate = useNavigate();

    useEffect(() => { setTitle("Contact Management"); }, [setTitle]);

    const { data, loading, fetchAll, remove, error } = useContact();



    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error);
        }
    }, [error]);


    async function handleDelete(id: number) {
        const confirmDelete = window.confirm('Delete this user?');
        if (!confirmDelete) return;
        remove(id);
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