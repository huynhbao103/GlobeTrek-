import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleSignIn = ({ recaptchaToken, disabled }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLoginSuccess = async (response) => {
        if (!recaptchaToken) {
            alert('Vui lòng hoàn thành reCAPTCHA');
            return;
        }
        try {
            const { data } = await axios.post('http://localhost:5000/api/google-login', {
                tokenId: response.credential,
                recaptchaToken
            });
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            setError('');
            window.location.reload();
            alert('Đăng nhập thành công!');
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            alert('Đăng nhập thất bại! Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex items-center max-w-full justify-center">
            {!user ? (
                <GoogleOAuthProvider clientId="655975498553-f4gr2g8qjss68qa9l71i78msg8fpsik7.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => setError('Đăng nhập thất bại!')}
                        render={({ onClick }) => (
                            <button
                                onClick={() => {
                                    window.grecaptcha.execute();
                                    onClick();
                                }}
                                className="flex w-full items-center justify-center px-4 py-2 bg-white cursor-pointer rounded-md border font-bold"
                                disabled={disabled}
                            >
                                Đăng nhập bằng Google
                            </button>
                        )}
                    />
                </GoogleOAuthProvider>
            ) : (
                <div>
                    {/* Display user information or logout button */}
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default GoogleSignIn;
