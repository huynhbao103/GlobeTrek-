import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import GoogleIcon from '../assets/Google.png';
import FacebookIcon from '../assets/Facebook.png';

export default function Modal() {
    const [showModal, setShowModal] = useState(false);
    const [isRegistered, setIsRegistered] = useState(null);
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const closeModal = () => {
        setShowModal(false);
        setIsRegistered(null);
        setEmailOrPhone("");
        setShowPasswordInput(false);
    };

    const handleContinue = () => {
        // Logic giả định để kiểm tra nếu người dùng đã đăng ký
        const registeredUsers = ["example@example.com", "0987654321"];
        const isUserRegistered = registeredUsers.includes(emailOrPhone);
        setIsRegistered(isUserRegistered);
        setShowPasswordInput(true);
    };

    const handleChange = (e) => {
        setEmailOrPhone(e.target.value);
        setIsRegistered(null);
        setShowPasswordInput(false);
    };

    return (
        <>
            <div className="flex items-center justify-center pr-2">
                <button
                    className="bg-white text-black px-6 py-2 rounded shadow hover:bg-slate-100 text-sm font-medium border border-blue-500"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    <FontAwesomeIcon icon={faUser} style={{ color: "#74C0FC" }} /> Đăng Nhập 
                </button>
            </div>
            
            {showModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={closeModal}
                    />
                    <div className="flex items-center justify-center min-h-screen px-4 py-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[28%] z-10 relative transition-transform transform">
                            <button
                                className="absolute top-2 right-2 bg-transparent text-gray-500 hover:text-black"
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <h2 className="text-2xl font-bold mb-3">Đăng nhập / Đăng ký</h2>
                            <p className="p-2 text-gray-700">Email/Số điện thoại di động</p>
                            <input
                                type="text"
                                placeholder="Ví dụ: +84901234567 hoặc yourname@email.com"
                                className="w-full p-2 mb-4 border border-gray-500 rounded-md focus:border-blue-500"
                                value={emailOrPhone}
                                onChange={handleChange}
                            />
                            {showPasswordInput && (
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="w-full p-2 mb-4 border border-gray-500 rounded-md focus:border-blue-500"
                                />
                            )}
                            <button
                                className={`w-full p-2 mb-4 ${isRegistered === null ? 'bg-gray-100 text-slate-300 cursor-auto' : isRegistered ? 'bg-blue-500 text-white' : 'bg-[#FF5E1F] text-white'} rounded-md font-bold cursor-pointer`}
                                onClick={handleContinue}
                                disabled={!emailOrPhone}
                            >
                                {isRegistered === null ? 'Tiếp tục' : isRegistered ? 'Đăng nhập' : 'Đăng ký'}
                            </button>
                            <div className="bg-Login-register">
                                <div className="flex justify-center items-center mb-4">
                                    <hr className="border border-gray-300 w-20" />
                                    <div className="px-1 text-sm">hoặc đăng nhập/đăng ký với</div>
                                    <hr className="border border-gray-300 w-20" />
                                </div>
                                <div className="flex flex-col gap-2 mb-6">
                                    <button className="flex items-center justify-center p-2 bg-white cursor-pointer text-[#0194f3] rounded-md border border-solid border-[#0194f3] font-bold">
                                        <img className="w-6 p-1 " src={GoogleIcon} alt="Google Icon" /> Tiếp tục với Google
                                    </button>
                                    <button className="flex items-center justify-center p-2 bg-white cursor-pointer text-[#0194f3] rounded-md border border-[#0194f3] font-bold">
                                        <img className="w-6 p-1 " src={FacebookIcon} alt="Facebook Icon" /> Tiếp tục với Facebook
                                    </button>
                                </div>
                                <div className="text-sm text-gray-600 text-center">
                                    Bằng cách đăng ký, bạn đồng ý với <a href="#" className="text-blue-500 font-bold">Điều khoản & Điều kiện</a> của chúng tôi và bạn đã đọc <a href="#" className="text-blue-500 font-bold">Chính Sách Quyền Riêng Tư</a> của chúng tôi.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
