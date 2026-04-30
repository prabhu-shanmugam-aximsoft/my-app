
import { useEffect, useState } from 'react';
import { type User } from '../types';
import { useTitle } from '../context/TitleProvider';
import { ShieldFill, People, Person, Envelope } from 'react-bootstrap-icons';
import { useContact } from '../hooks/useContact';
import { useUser } from '../hooks/useUser';

export default function HomePage() {

    const [totalUsers, setTotalUser] = useState(0);
    const [totalAdminUsers, setTotalAdminUser] = useState(0);
    const [totalNormalUsers, setTotalNormalUser] = useState(0);
    const [totalContact, setTotalContact] = useState(0);
    const { setTitle } = useTitle();

    useEffect(() => { setTitle("Dashboard"); }, [setTitle]);

    const { data: contactData, fetchAll: fetchAllContacts, error: userError, loading } = useContact();
    const { data: UserData, fetchAll: fetchAllUsers, error: contactError } = useUser();


    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem("currentuser");
        if (savedData) {
            const parsedData: User = JSON.parse(savedData);
            setData(parsedData);
        }
    }, []);

    useEffect(() => {
        fetchAllContacts();
        fetchAllUsers()
    }, []);

    useEffect(() => {
        setTotalUser(UserData.length);
        setTotalAdminUser(UserData.filter((u: User) => u.role === 'admin').length);
        setTotalNormalUser(UserData.filter((u: User) => u.role === 'user').length);
        setTotalContact(contactData.length);
    }, [contactData, UserData]);

    useEffect(() => {
        if (userError) {
            console.log(userError);
            alert(userError);
        }
        if (contactError) {
            console.log(contactError);
            alert(contactError);
        }
    }, [contactError, userError]);

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
                                    <h5 className="card-title"><People className="text-primary" size={20} />&nbsp;Total Users</h5>
                                    <p className="card-text mb-1"><strong>{totalUsers}</strong> </p>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100">

                                <div className="card-body">
                                    <h5 className="card-title"><ShieldFill className="text-danger" size={20} />&nbsp;Admin Users</h5>
                                    <p className="card-text mb-1"><strong>{totalAdminUsers}</strong> </p>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title"><Person className="text-info" size={20} />&nbsp;Regular Users</h5>
                                    <p className="card-text mb-1"><strong>{totalNormalUsers}</strong> </p>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title"><Envelope className="text-success" size={20} />&nbsp;Contact Messages</h5>
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

