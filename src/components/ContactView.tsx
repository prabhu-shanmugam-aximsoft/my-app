import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apiClient from "../services/apiClient";

interface Contact {
    id: number;
    full_name: string;
    email: string;
    message: string;
}

export default function ContactView() {
    const { id } = useParams<{ id: string }>();

    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);

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

    // ✅ Render view
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h4>View Contact</h4>
                    <p><strong>Name:</strong> {contact.full_name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Message:</strong> {contact.message}</p>
                </div>
            </div>
        </div>
    );;
};

;