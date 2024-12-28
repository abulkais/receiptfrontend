
// import React, { useState } from 'react';
// import axios from 'axios';
// import './login.css';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [step, setStep] = useState('login'); // Track step: 'login' or 'verify'
//     const [message, setMessage] = useState('');
//     const [authSuccess, setAuthSuccess] = useState(false); // Track authentication success
//     const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent

//     // Handle login authentication
//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/api/login', {
//                 email,
//                 password
//             });

//             setMessage(response.data);
//             if (response.data.includes('please enter OTP')) {
//                 setAuthSuccess(true); // Login successful, proceed to send OTP
//                 sendOtp(); // Automatically send OTP after successful login
//                 setStep('verify'); // Move to OTP verification step
//             }
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'An error occurred');
//         }
//     };

//     // Automatically send OTP after successful login
//     const sendOtp = async () => {
//         try {
//             await axios.post('http://localhost:5000/api/send-otp', { email });
//             setMessage('OTP sent to your email');
//             setOtpSent(true); // Set OTP sent to true
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'Error sending OTP');
//         }
//     };

//     // Handle OTP verification
//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/api/verify-otp', {
//                 email,
//                 otp
//             });

//             setMessage(response.data);
//             if (response.data === 'OTP verified') {
//                 // Redirect to admin page or perform any action after successful OTP verification
//                 window.location.href = '/bulk-receipt-genrator';
//             }
//             // if (response.data === 'OTP verified') {
//             //     localStorage.setItem('email', email); // Store user email
//             //     localStorage.setItem('isLoggedIn', 'true'); // Mark user as logged in
//             //     window.location.href = '/dashboard'; // Redirect to dashboard
//             // }
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'Invalid OTP');
//         }
//     };

//     return (
//         <div className="login_container">
//             <div className="login_box">
//                 <img src="https://kvch.in/assets-new/img/website-logo.webp" alt="" />

//                 {/* Login Form: Visible initially */}
//                 <form onSubmit={handleLogin} style={{ display: authSuccess ? 'none' : 'block' }}>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             placeholder='Email*'
//                             className="form-control"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             placeholder='Password*'
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <button type="submit" className="w-100">Submit</button>
//                     </div>
//                 </form>

//                 {/* OTP Section: Shown after successful login */}
//                 {authSuccess && (
//                     <div>
//                         <form onSubmit={handleVerifyOtp}>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     placeholder='Enter OTP'
//                                     className="form-control"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <button type="submit" className="w-100">Verify OTP</button>
//                             </div>
//                         </form>
//                     </div>
//                 )}

//                 {/* Message Display */}
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './login.css';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [step, setStep] = useState('login'); // Track step: 'login' or 'verify'
//     const [message, setMessage] = useState('');
//     const [authSuccess, setAuthSuccess] = useState(false); // Track authentication success
//     const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
//     const navigate = useNavigate(); // Hook for navigation
//     const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

//     // Handle login authentication
//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/api/login', {
//                 email,
//                 password
//             });

//             setMessage(response.data);
//             if (response.data.includes('please enter OTP')) {
//                 setAuthSuccess(true); // Login successful, proceed to send OTP
//                 sendOtp(); // Automatically send OTP after successful login
//                 setStep('verify'); // Move to OTP verification step
//             }
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'An error occurred');
//         }
//     };

//     // Automatically send OTP after successful login
//     const sendOtp = async () => {
//         try {
//             await axios.post('http://localhost:5000/api/send-otp', { email });
//             setMessage('OTP sent to your email');
//             setOtpSent(true); // Set OTP sent to true
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'Error sending OTP');
//         }
//     };

//     // Handle OTP verification
//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/api/verify-otp', {
//                 email,
//                 otp
//             });

//             setMessage(response.data);
//             if (response.data === 'OTP verified') {
//                 // Call the onLogin function passed as a prop
//                 onLogin(); // Mark user as logged in
//                 // Redirect to the desired page after successful verification
//                 navigate('/bulk-receipt-genrator'); // Use navigate for redirection
//             }
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'Invalid OTP');
//         }
//     };

//     return (
//         <div className="login_container">
//             <div className="login_box">
//                 <img src="https://kvch.in/assets-new/img/website-logo.webp" alt="" />

//                 {/* Login Form: Visible initially */}
//                 <form onSubmit={handleLogin} style={{ display: authSuccess ? 'none' : 'block' }}>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             placeholder='Email*'
//                             className="form-control"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group" style={{position:'relative'}}>
//                         <input
//                             type={showPassword ? 'text' : 'password'} // Toggle password visibility
//                             placeholder='Password*'
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                         <span
//                             className="toggle-password" 
//                             onClick={() => setShowPassword(!showPassword)} // Toggle state
//                         >
//                             <i className={showPassword ? 'fas fa-eye-slash fa-lg' : 'fas fa-eye fa-lg'}></i>
//                         </span>
//                     </div>
//                     <div className="form-group">
//                         <button type="submit" className="w-100">Submit</button>
//                     </div>
//                 </form>

//                 {/* OTP Section: Shown after successful login */}
//                 {authSuccess && (
//                     <div>
//                         <form onSubmit={handleVerifyOtp}>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     placeholder='Enter OTP'
//                                     className="form-control"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <button type="submit" className="w-100">Verify OTP</button>
//                             </div>
//                         </form>
//                     </div>
//                 )}

//                 {/* Message Display */}
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default Login;


// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import './login.css';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState(new Array(6).fill('')); // Array for OTP digits
//     const [step, setStep] = useState('login');
//     const [message, setMessage] = useState('');
//     const [authSuccess, setAuthSuccess] = useState(false);
//     const [otpSent, setOtpSent] = useState(false);
//     const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
//     const navigate = useNavigate();
//     const [isError, setIsError] = useState(false); // State to track error
//     const otpRefs = useRef([]); // Ref for OTP input fields

//     // Handle login authentication
//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/api/login', {
//                 email,
//                 password
//             });

//             setMessage(response.data);
//             if (response.data.includes('please enter OTP')) {
//                 setAuthSuccess(true); // Login successful, proceed to send OTP
//                 sendOtp(); // Automatically send OTP after successful login
//                 setStep('verify');
//             }
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'An error occurred');
//         }
//     };

//     // Automatically send OTP after successful login
//     const sendOtp = async () => {
//         try {
//             await axios.post('http://localhost:5000/api/send-otp', { email });
//             setMessage('OTP sent to your email');
//             setOtpSent(true);
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'Error sending OTP');
//         }
//     };

//     // Handle OTP verification
//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();
//         const enteredOtp = otp.join(''); // Combine OTP into a single string

//         try {
//             const response = await axios.post('http://localhost:5000/api/verify-otp', {
//                 email,
//                 otp: enteredOtp
//             });

//             setMessage(response.data);
//             if (response.data === 'OTP verified') {
//                 onLogin(); // Mark user as logged in
//                 navigate('/bulk-receipt-genrator');
//             } else {
//                 // If OTP is incorrect, clear the OTP fields and show error message
//                 setOtp(new Array(6).fill(''));
//                 otpRefs.current[0].focus(); // Set focus back to the first input
//                 setMessage('Incorrect OTP. Please try again.');
//             }
//         } catch (error) {
//             setMessage(error.response ? error.response.data : 'Invalid OTP');
//             // Clear OTP fields on error
//             setOtp(new Array(6).fill(''));
//             otpRefs.current[0].focus(); // Set focus back to the first input
//         }
//     };

//     // Handle OTP input change and auto-focus
//     const handleOtpChange = (element, index) => {
//         if (/^[0-9]$/.test(element.value)) {
//             const newOtp = [...otp];
//             newOtp[index] = element.value;
//             setOtp(newOtp);

//             // Move focus to the next input field
//             if (index < 5 && element.value) {
//                 otpRefs.current[index + 1].focus();
//             }
//         }
//     };

//     return (
        // <div className="login_container">
        //     <div className="login_box">
        //         <img src="https://kvch.in/assets-new/img/website-logo.webp" alt="" />

        //         {/* Login Form: Visible initially */}
        //         <form onSubmit={handleLogin} style={{ display: authSuccess ? 'none' : 'block' }}>
        //             <div className="form-group">
        //                 <input
        //                     type="email"
        //                     placeholder="Email*"
        //                     className="form-control"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className="form-group" style={{ position: 'relative' }}>
        //                 <input
        //                     type={showPassword ? 'text' : 'password'}
        //                     placeholder="Password*"
        //                     className="form-control"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     required
        //                 />
        //                 <span
        //                     className="toggle-password"
        //                     onClick={() => setShowPassword(!showPassword)}
        //                 >
        //                     <i className={showPassword ? 'fas fa-eye-slash fa-lg' : 'fas fa-eye fa-lg'}></i>
        //                 </span>
        //             </div>
        //             <div className="form-group">
        //                 <button type="submit" className="w-100">Submit</button>
        //             </div>
        //         </form>

        //         {/* OTP Section: Shown after successful login */}
        //         {authSuccess && (
        //             <div>
        //                 <form onSubmit={handleVerifyOtp}>
        //                     <div className="otp_container d-flex">
        //                         {otp.map((_, index) => (
        //                             <input autoComplete='off' style={{ width: '55px', textAlign: 'center' }}
        //                                 key={index}
        //                                 type="text"
        //                                 maxLength="1"
        //                                 className="otp_input"
        //                                 value={otp[index]}
        //                                 onChange={(e) => handleOtpChange(e.target, index)}
        //                                 ref={(el) => (otpRefs.current[index] = el)} // Reference each input
        //                                 onKeyDown={(e) => {
        //                                     // Handle backspace to move to previous input
        //                                     if (e.key === 'Backspace' && index > 0 && !otp[index]) {
        //                                         otpRefs.current[index - 1].focus();
        //                                     }
        //                                 }}
        //                                 required
        //                             />
        //                         ))}
        //                     </div>
        //                     <div className="form-group mt-4">
        //                         <button type="submit" className="w-100">Verify OTP</button>
        //                     </div>
        //                 </form>
        //             </div>
        //         )}

        //         {/* Message Display */}
        //         {/* {message && <p>{message}</p>} */}
        //         {message && <p className={isError ? 'error_message' : 'success_message'}>{message}</p>}

        //     </div>
        // </div>
//     );
// };

// export default Login;


import React, { useState, useRef } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill('')); // Array for OTP digits
    const [step, setStep] = useState('login');
    const [message, setMessage] = useState('');
    const [authSuccess, setAuthSuccess] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [isError, setIsError] = useState(false); // State to track error
    const navigate = useNavigate();
    const otpRefs = useRef([]); // Ref for OTP input fields

    // Handle login authentication
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            });

            setMessage(response.data);
            setIsError(false); // Reset error state

            if (response.data.includes('please enter OTP')) {
                setAuthSuccess(true); // Login successful, proceed to send OTP
                sendOtp(); // Automatically send OTP after successful login
                setStep('verify');
            }
        } catch (error) {
            setMessage(error.response ? error.response.data : 'Invalid credentials');
            setIsError(true); // Set error state for invalid credentials
        }
    };

    // Automatically send OTP after successful login
    const sendOtp = async () => {
        try {
            await axios.post('http://localhost:5000/api/send-otp', { email });
            setMessage(`OTP sent to your ${email}`);
            setOtpSent(true);
            setIsError(false); // Reset error state
        } catch (error) {
            setMessage(error.response ? error.response.data : 'Error sending OTP');
            setIsError(true); // Set error state for OTP sending failure
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join(''); // Combine OTP into a single string

        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', {
                email,
                otp: enteredOtp
            });

            setMessage(response.data);
            setIsError(false); // Reset error state

            if (response.data === 'OTP verified') {
                onLogin(); // Mark user as logged in
                navigate('/bulk-receipt-genrator');
            } else {
                setOtp(new Array(6).fill('')); // Clear OTP fields
                otpRefs.current[0].focus(); // Set focus back to the first input
                setMessage('Incorrect OTP. Please try again.');
                setIsError(true); // Set error state for invalid OTP
            }
        } catch (error) {
            setMessage(error.response ? error.response.data : 'Invalid OTP');
            setIsError(true); // Set error state for OTP verification failure
            setOtp(new Array(6).fill('')); // Clear OTP fields on error
            otpRefs.current[0].focus(); // Set focus back to the first input
        }
    };

    // Handle OTP input change and auto-focus
    const handleOtpChange = (element, index) => {
        if (/^[0-9]$/.test(element.value)) {
            const newOtp = [...otp];
            newOtp[index] = element.value;
            setOtp(newOtp);

            // Move focus to the next input field
            if (index < 5 && element.value) {
                otpRefs.current[index + 1].focus();
            }
        }
    };

    return (
        <div className="login_container">
        <div className="login_box">
            <img src="https://kvch.in/assets-new/img/website-logo.webp" alt="" />

            {/* Login Form: Visible initially */}
            <form onSubmit={handleLogin} style={{ display: authSuccess ? 'none' : 'block' }}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email*"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password*"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <i className={showPassword ? 'fas fa-eye-slash fa-lg' : 'fas fa-eye fa-lg'}></i>
                    </span>
                </div>
                <div className="form-group">
                    <button type="submit" className="w-100">Submit</button>
                </div>
            </form>

            {/* OTP Section: Shown after successful login */}
            {authSuccess && (
                <div>
                    <form onSubmit={handleVerifyOtp}>
                        <div className="otp_container d-flex">
                            {otp.map((_, index) => (
                                <input autoComplete='off' style={{ width: '55px', textAlign: 'center' }}
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="otp_input"
                                    value={otp[index]}
                                    onChange={(e) => handleOtpChange(e.target, index)}
                                    ref={(el) => (otpRefs.current[index] = el)} // Reference each input
                                    onKeyDown={(e) => {
                                        // Handle backspace to move to previous input
                                        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
                                            otpRefs.current[index - 1].focus();
                                        }
                                    }}
                                    required
                                />
                            ))}
                        </div>
                        <div className="mb-4 mt-4">
                            <button type="submit" className="w-100">Verify OTP</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Message Display */}
            {/* {message && <p>{message}</p>} */}
            {message && <p className={isError ? 'error_message' : 'success_message'}>{message}</p>}

        </div>
    </div>
    );
};

export default Login;
