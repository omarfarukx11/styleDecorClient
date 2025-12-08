import React from 'react';
import useAuth from '../../Hooks/useAuth';

const MyProfile = () => {
    const {user} = useAuth()
    return (
        <div>
            <h1>{user.name}</h1>
        </div>
    );
};

export default MyProfile;