
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { type User } from '../types';
import apiClient from "../services/apiClient";
import { useTitle } from '../context/TitleProvider';

export default function UserView() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle("View User");
    }, [setTitle]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient.get(`/api/users/${id}`);
                console.log(response);
                setUser(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (!user) return <div className="text-center text-danger"> <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>User not found</div>;

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
            <div className="card">
                <div className="card-body">
                    <h4>{user.name}</h4>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            </div>
        </div>
    );
};