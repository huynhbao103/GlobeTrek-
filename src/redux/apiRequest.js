import {  message } from 'antd';
import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

import { loginFailed, 
         loginStart,
         loginSuccess,
         registerStart,
         registerFailed,
         registerSuccess,
         otpSent, 
         otpFailed, 
         otpVerified,
         verifyAccountStart,
         verifyAccountSuccess,
         verifyAccountFailed } from "./authSlice";

export const signinUser = async (user, dispatch, closeModal) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(`${VITE_BASE_URL}/api/auth/signin?client=true`, user);

       

        dispatch(loginSuccess(response.data)); // If no message, login is successful
        console.log(response.data);
        closeModal(); // Close modal on successful login
    } catch (error) {
        console.error("Login failed:", error); // Log error for debugging
        dispatch(loginFailed());
        message.error("Login failed!"); // Show generic error
    }
};
        

export const registerUser = async(user, dispatch, setShowVerification) => {
    dispatch(registerStart());
    try {
        await axios.post(`${VITE_BASE_URL}/api/auth/signup?client=true`, user);
        dispatch(registerSuccess());
        setShowVerification(true);
    } catch (error) {
        console.error("Login failed:", error); // Log error for debugging
        dispatch(registerFailed());
        message.error("Login failed! Please check your credentials."); // User feedback
    }
};

export const verifyAccount = async (email, otp, dispatch,closeModal, setShowVerification) => {
    dispatch(verifyAccountStart());
    try {
        const res = await axios.post(`${VITE_BASE_URL}/api/auth/verify-account`, { email, otp });
        dispatch(verifyAccountSuccess(res.data));
        message.error("Tài khoản xác nhận thành công vui lòng đăng nhập!");
        closeModal();
        setShowVerification(false);

    } catch (error) {
        console.error("OTP verification failed:", error);
        dispatch(verifyAccountFailed());
        message.error("Invalid OTP or OTP expired.");
    }
};