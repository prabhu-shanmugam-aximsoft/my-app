import React, { useEffect, useState } from 'react';
import { ProfileView, ProfileEdit } from '../components/Profile';
import apiClient from "../services/apiClient";
import { useTitle } from '../context/TitleProvider';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [loading, setLoading] = useState(true);

    const { setTitle } = useTitle();

    useEffect(() => { setTitle("Profile"); }, [setTitle]);

    const [user, setUser] = React.useState({
        name: '',
        email: '',
        role: ''        
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get('/api/profile');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch profile', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);



    if (loading) {
        return <div className="text-center mt-5">Loading profile...</div>;
    }
    return isEditing ? (
        <ProfileEdit
            user={user}
            onSave={(updatedUser) => {
                setUser(updatedUser);
                setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
        />
    ) : (
        <ProfileView user={user} onEdit={() => setIsEditing(true)} />
    );
};

