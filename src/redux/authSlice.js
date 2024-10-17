import { createSlice } from "@reduxjs/toolkit";

const autheSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
            otpSent: false, // Track if OTP is sent
            otpVerified: false, // Track OTP verification status
        },
        verify: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser=action.payload
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.register.success = false;
        },
        otpSent: (state) => { 
            state.register.otpSent = true; 
        },
        otpFailed: (state) => { 
            state.register.error = true; 
        },
        otpVerified: (state) => { 
            state.register.otpVerified = true; 
        },
        verifyAccountStart: (state) => {
            state.verify.isFetching = true;
        },
        verifyAccountSuccess: (state) => {
            state.verify.isFetching = false;
            state.verify.success = true;
            state.verify.error = false;
        },
        verifyAccountFailed: (state) => {
            state.verify.isFetching = false;
            state.verify.error = true;
            state.verify.success = false;
        },
    },
});

export const { loginStart, 
               loginFailed, 
               loginSuccess,
               registerStart,
               registerSuccess,
               registerFailed,
               otpSent, 
               otpFailed, 
               otpVerified,
               verifyAccountStart,
               verifyAccountSuccess,
               verifyAccountFailed } = autheSlice.actions;
export default autheSlice.reducer;
