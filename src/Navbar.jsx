

import React from 'react';
import '../src/navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout, isLoggedIn }) => {
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            onLogout(); // Call the onLogout function passed as a prop
        }
    };

    return (
        <>
            <div className="navbar_head">
                <div className="d-flex align-items-center" style={{ width: '30%', justifyContent: 'space-between' }}>
                    <Link to='/bulk-receipt-genrator'>
                        <img src="https://kvch.in/nigeria/assets-new/img/logo.webp" alt="" />
                    </Link>

                    {isLoggedIn && (
                        <>
                            <Link to='/manual-receipt-genrator' style={{ textDecoration: 'none', color: '#000', fontSize: '1.3rem', fontWeight: '600' }}>Manual Receipt</Link>
                            <Link to='/bulk-receipt-genrator' style={{ textDecoration: 'none', color: '#000', fontSize: '1.3rem', fontWeight: '600' }}>Bulk Receipt</Link>
                        </>
                    )}
                </div>
                {isLoggedIn && (
                    <div className="logout_btn">
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
