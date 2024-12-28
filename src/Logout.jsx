import React from 'react';
import axios from 'axios';

const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout');
            alert('Logged out successfully');
        } catch (error) {
            alert('Failed to log out');
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
