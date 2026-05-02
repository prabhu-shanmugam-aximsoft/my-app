import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useContact } from '../hooks/useContact';

export default function ContactView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { selectedItem, loading, fetchOne, error } = useContact();

    useEffect(() => {
        fetchOne(id||'');
    }, []);

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error);
        }
    }, [error]);

    if (loading) {
        return <div className="text-center mt-5">Loading contact...</div>;
    }

    if (!selectedItem) {
        return <div className="text-center mt-5 text-danger">contact not found</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card  shadow-sm ml-4" >
                <div className="card-body">
                    <h4 className="card-title mb-3">View Contact</h4>
                    <p><strong>Name:</strong> {selectedItem.full_name}</p>
                    <p><strong>Email:</strong> {selectedItem.email}</p>
                    <p><strong>Message:</strong> {selectedItem.message}</p>
                    <div >
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}><ArrowLeft size={20} /> Back</button>
                    </div>
                </div>

            </div>

        </div>
    );;
};