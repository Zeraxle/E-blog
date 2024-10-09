import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import axios from 'axios';

export const ProfilePage = () => {
    const { authState } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
    const fetchProfile = async () => {
        try {
        const res = await axios.get('/api/auth/profile', {
            headers: { Authorization: `Bearer ${authState.token}` },
        });
        setProfileData(res.data.message);
        } catch (err) {
        console.error('Error fetching profile', err);
        }
    };
    fetchProfile();
    }, [authState.token]);

    return <div>{profileData ? `Welcome, ${profileData}` : 'Loading profile...'}</div>;
};




