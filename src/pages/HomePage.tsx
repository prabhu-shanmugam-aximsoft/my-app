
import { useEffect, useState } from 'react';
import { type User } from '../types';
import { useTitle } from '../context/TitleProvider';
import { ShieldFill, People, Person, Envelope } from 'react-bootstrap-icons';
import { useContact } from '../hooks/useContact';
import { useUser } from '../hooks/useUser';
import { StatCard } from '../components/StatCard';

export default function HomePage() {

    const [totalUsers, setTotalUser] = useState(0);
    const [totalAdminUsers, setTotalAdminUser] = useState(0);
    const [totalNormalUsers, setTotalNormalUser] = useState(0);
    const [totalContact, setTotalContact] = useState(0);
    const { setTitle } = useTitle();

    useEffect(() => { setTitle("Dashboard"); }, [setTitle]);

     useEffect(() => {
        fetchAllContacts();
        fetchAllUsers()
    }, []);

    const { data: contactData, fetchAll: fetchAllContacts, error: userError, loading } = useContact();
    const { data: UserData, fetchAll: fetchAllUsers, error: contactError, selectedItem } = useUser();

   

    useEffect(() => {
        setTotalUser(UserData?.length ?? 0);
        if (UserData) setTotalAdminUser(UserData?.filter((u: User) => u.role === 'admin')?.length ?? 0);
        if (UserData) setTotalNormalUser(UserData?.filter((u: User) => u.role === 'user')?.length ?? 0);
        if (contactData) setTotalContact(contactData?.length ?? 0);
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
                    <h4 className="mb-3">Welcome, {selectedItem?.name}</h4>
                    <div className="row">
                         <StatCard
                            title="Total Users"
                            value={totalUsers}
                            icon={<People className="text-primary" size={20} />}
                        />

                        <StatCard
                            title="Admin Users"
                            value={totalAdminUsers}
                            icon={<ShieldFill className="text-danger" size={20} />}
                        />

                        <StatCard
                            title="Regular Users"
                            value={totalNormalUsers}
                            icon={<Person className="text-info" size={20} />}
                        />

                        <StatCard
                            title="Contact Messages"
                            value={totalContact}
                            icon={<Envelope className="text-success" size={20} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

