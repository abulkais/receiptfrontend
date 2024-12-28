
// import './Receipt.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import Admin from './Admin';
// import Receipt from './Receipt';
// import BulkReceiptGen from './BulkReceiptGen';
// import Navbar from './Navbar';
// import Footer from './Footer';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/manual-receipt-genrator" element={<Admin />} />
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//         <Route path="/bulk-receipt-genrator" element={<BulkReceiptGen />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import './Receipt.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';
import BulkReceiptGen from './BulkReceiptGen';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check local storage for logged-in state on initial load
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true'; // Check if user is logged in
        setIsLoggedIn(loggedInStatus);
    }, []);

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true'); // Store logged-in state
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false'); // Clear logged-in state
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
            <Routes>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route 
                    path="/manual-receipt-genrator" 
                    element={isLoggedIn ? <Admin /> : <Navigate to="/" />} 
                />
                <Route 
                    path="/bulk-receipt-genrator" 
                    element={isLoggedIn ? <BulkReceiptGen /> : <Navigate to="/" />} 
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
