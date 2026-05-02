import  { useEffect, useState } from 'react';
import { ProfileView, ProfileEdit } from '../components/Profile';
import { useTitle } from '../context/TitleProvider';
import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    const { setTitle } = useTitle();

    useEffect(() => { setTitle("Profile"); }, [setTitle]);

    const { error, fetchProfile, user: profile, loading } = useAuth();

  
    useEffect(() => {
        fetchProfile();
    }, []);

   if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="text-center mt-5">Loading profile...</div>;
    }

    if (isEditing && profile) return <ProfileEdit
        user={profile}
        onSave={() => {
            setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
    />

    if (profile) return <ProfileView user={profile} onEdit={() => setIsEditing(true)} />

    return null;
};

