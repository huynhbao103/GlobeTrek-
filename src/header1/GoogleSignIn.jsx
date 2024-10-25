
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SsoPointerSignIn = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            console.log(code) // Extract the authorization code from the URL
            if (code) {
                try {
                    const { data } = await axios.get('http://localhost:8081/api/auth/callback', {
                        params: { code }  // Send the code to your backend to exchange it for user information and token
                    });
                    console.log(data) 
                    localStorage.setItem('userNav', JSON.stringify(data)); // Store the user data in local storage
                    setUser(data); // Update the state with user data
                    setError('');
                    alert('Đăng nhập thành công!');
                } catch (error) {
                    console.error('Đăng nhập thất bại:', error);
                    setError('Đăng nhập thất bại! Vui lòng thử lại.');
                }
            }
        };
        
        handleCallback();
    }, []); 
    const handleLoginRedirect = () => {
        const redirectUri = encodeURIComponent('http://localhost:5173/'); // Adjust as needed
        window.location.href = `https://sso-pointer.vercel.app/authorize?callbackUrl=${redirectUri}`;
    };

    return (
        <div className="flex items-center max-w-full justify-center">
            {!user ? (
                <button
                    onClick={handleLoginRedirect}
                    className="flex w-full items-center justify-center px-4 py-2 bg-white cursor-pointer rounded-md border font-bold"
                >
                    Đăng nhập bằng SSO Pointer
                </button>
            ) : (
                <div>
                    {/* Display user information or logout button */}
                    <p>Xin chào, {user.name}</p>
                    <button onClick={() => {
                        localStorage.removeItem('user');
                        setUser(null);
                    }}>Đăng xuất</button>
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default SsoPointerSignIn;
