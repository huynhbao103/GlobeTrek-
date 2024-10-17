
import axios from "axios";
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

export const signinUser = async(user, dispatch, closeModal) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8081/api/auth/signin", user);
        dispatch(loginSuccess(res.data));
        console.log(res.data)
        // navigator("/"); // Navigate on success
        closeModal();
    } catch (error) {
        console.error("Login failed:", error); // Log error for debugging
        dispatch(loginFailed());
        alert("Login failed! Please check your credentials."); // User feedback
    }
};


export const registerUser = async(user, dispatch, setShowVerification) => {
    dispatch(registerStart());
    try {
        await axios.post("http://localhost:8081/api/auth/signup", user);
        dispatch(registerSuccess());
        setShowVerification(true);
    } catch (error) {
        console.error("Login failed:", error); // Log error for debugging
        dispatch(registerFailed());
        alert("Login failed! Please check your credentials."); // User feedback
    }
};

export const verifyAccount = async (email, otp, dispatch) => {
    dispatch(verifyAccountStart());
    try {
        const res = await axios.post("http://localhost:8081/api/auth/verify-account", { email, otp });
        dispatch(verifyAccountSuccess(res.data));
        alert("Account verified successfully!");
    } catch (error) {
        console.error("OTP verification failed:", error);
        dispatch(verifyAccountFailed());
        alert("Invalid OTP or OTP expired.");
    }
};