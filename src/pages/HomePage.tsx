
import { useEffect, useState } from 'react';
import apiClient from "../services/apiClient";
import { type User } from '../types';
import { useTitle } from '../context/TitleProvider';
import { ShieldFill, People, Eye, Person, Envelope } from 'react-bootstrap-icons';

export default function HomePage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUser] = useState(0);
    const [totalAdminUsers, setTotalAdminUser] = useState(0);
    const [totalNormalUsers, setTotalNormalUser] = useState(0);
    const [totalContact, setTotalContact] = useState(0);
    const { setTitle } = useTitle();

    useEffect(() => { setTitle("Dashboard"); }, [setTitle]);


    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem("currentuser");
        if (savedData) {
            const parsedData: User = JSON.parse(savedData);
            setData(parsedData);
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiClient.get(`/api/users/`);
                console.log(response);
                setUsers(response.data);
                let result = response.data;

                setTotalUser(result.length);
                setTotalAdminUser(result.filter((u) => u.role === 'admin').length);
                setTotalNormalUser(result.filter((u) => u.role === 'user').length);

                const response1 = await apiClient.get('api/contact');
                let result1 = response1.data;
                setTotalContact(result1.length)

            } catch (err) {
                console.error('Failed to fetch users', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    if (loading) {
        return <div className="text-center mt-5">Loading ...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3">Welcome, {data?.name}</h4>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title"><People className="text-primary"  size={20} />&nbsp;Total Users</h5>
                                    <p className="card-text mb-1"><strong>{totalUsers}</strong> </p>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100">
                               
                                <div className="card-body">
                                    <h5 className="card-title"><ShieldFill className="text-danger"  size={20} />&nbsp;Admin Users</h5>
                                    <p className="card-text mb-1"><strong>{totalAdminUsers}</strong> </p>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title"><Person className="text-info"  size={20} />&nbsp;Regular Users</h5>
                                    <p className="card-text mb-1"><strong>{totalNormalUsers}</strong> </p>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title"><Envelope className="text-success"  size={20} />&nbsp;Contact Messages</h5>
                                    <p className="card-text mb-1"><strong>{totalContact}</strong> </p>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

