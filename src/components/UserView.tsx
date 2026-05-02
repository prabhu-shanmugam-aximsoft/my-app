
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTitle } from '../context/TitleProvider';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useUser } from '../hooks/useUser';

export default function UserView() {
    const { id } = useParams();


    const navigate = useNavigate();

    const { setTitle } = useTitle();
    const { selectedItem, loading, fetchOne, } = useUser();

    useEffect(() => {
        setTitle("User Management");
    }, [setTitle]);

    useEffect(() => {
        fetchOne(id || '');
    }, []);    


    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (!selectedItem) return <div className="text-center text-danger"> <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>User not found</div>;

    

    return (
        <div className="container mt-4">
            <div className="card  shadow-sm ml-4">
                <div className="card-body">
                    <h4 className="card-title mb-3">Edit User</h4>
                    <h5>{selectedItem?.name}</h5>
                    <p><strong>Email:</strong> {selectedItem?.email}</p>
                    <p><strong>Role:</strong> {selectedItem?.role}</p>
                    <div className="d-flex gap-2 ml-5">
                        <button className="btn btn-secondary mb-3" onClick={() => navigate('/users')}><ArrowLeft size={20} /> Back</button>
                    </div>
                </div>

            </div>
        </div>
    );
};