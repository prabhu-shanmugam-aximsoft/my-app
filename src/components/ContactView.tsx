import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import apiClient from "../services/apiClient";
import { type Contact } from '../types';
import { ArrowLeft } from 'react-bootstrap-icons';


export default function ContactView() {
    const { id } = useParams<{ id: string }>();

    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await apiClient.get(`/api/contact/${id}`);
                console.log(response);

                setContact(response.data);
            } catch (err) {
                console.error('Failed to fetch message', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMessage();
        }
    }, [id]);


    if (loading) {
        return <div className="text-center mt-5">Loading contact...</div>;
    }

    if (!contact) {
        return <div className="text-center mt-5 text-danger">contact not found</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card  shadow-sm ml-4" >
                <div className="card-body">
                    <h4 className="card-title mb-3">View Contact</h4>
                    <p><strong>Name:</strong> {contact.full_name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Message:</strong> {contact.message}</p>
                    <div >
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}><ArrowLeft size={20} /> Back</button>
                    </div>
                </div>

            </div>

        </div>
    );;
};

;