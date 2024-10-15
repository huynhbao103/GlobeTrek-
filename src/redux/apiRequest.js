

// export const signinUser = async(user,dispatch, navigator)=>{
//     dispatch(loginStart());
//     try {
//         const res = await axios.post("http://localhost:8081/api/auth/signin",user);
//         dispatch(loginSuccess( res.data));
//         navigator("/")
//     } catch (error) {
//         dispatch(loginFailed());
//     }
// }
// import axios from "axios";
// import { loginFailed, loginStart, loginSuccess } from "./authSlice";

// export const signinUser = async (user, dispatch, navigator) => {
//     dispatch(loginStart());
//     try {
//         const res = await axios.post(
//             "http://localhost:8081/api/auth/signin",
//             user,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         dispatch(loginSuccess(res.data));
//         navigator("/");
//     } catch (error) {
//         console.error("Error signing in:", error.response?.data || error.message);
//         dispatch(loginFailed());
//     }
// };
import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";
export const signinUser = async(user, dispatch, navigator) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8081/api/auth/signin", user);
        dispatch(loginSuccess(res.data));
        navigator("/"); // Navigate on success
    } catch (error) {
        console.error("Login failed:", error); // Log error for debugging
        dispatch(loginFailed());
        alert("Login failed! Please check your credentials."); // User feedback
    }
};

