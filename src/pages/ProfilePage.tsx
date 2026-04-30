import React, { useEffect } from 'react';
import { ProfileView, ProfileEdit } from '../components/Profile';
import { useTitle } from '../context/TitleProvider';
import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = React.useState(false);
   

    const { setTitle } = useTitle();

    useEffect(() => { setTitle("Profile"); }, [setTitle]);

    const { error, fetchProfile, user: profile,loading } = useAuth();

    const [user, setUser] = React.useState({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error);
        }
    }, [error]);

   

    if (loading) {
        return <div className="text-center mt-5">Loading profile...</div>;
    }

    return isEditing && profile ? (
        <ProfileEdit
            user={profile}
            onSave={() => {                
                setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
        />
    ) : (
        profile && <ProfileView user={profile} onEdit={() => setIsEditing(true)} />
    );
};

