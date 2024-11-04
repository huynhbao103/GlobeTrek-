
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  message } from 'antd';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

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
            console.log(code) 
            if (code) {
                try {
                    const { data } = await axios.get(`${BASE_URL}/api/auth/callback`, {
                        params: { code }  
                    });
                    console.log(data) 
                    localStorage.setItem('userNav', JSON.stringify(data)); 
                    setUser(data); 
                    setError('');
                    message.success('Đăng nhập thành công!');
                    window.location.reload();
                } catch (error) {
                    console.error('Đăng nhập thất bại:', error);
                    message.error('Đăng nhập thất bại! Vui lòng thử lại.');
                }
            }
        };
        
        handleCallback();
    }, []); 
    const handleLoginRedirect = () => {
        // const redirectUri = encodeURIComponent(`http://localhost:5173`); 
        const redirectUri = encodeURIComponent(`${REDIRECT_URL}`); 

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

                    {/* <button onClick={() => {
                        localStorage.removeItem('user');

                        setUser(null);
                    }}>Đăng xuất</button> */}
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default SsoPointerSignIn;
