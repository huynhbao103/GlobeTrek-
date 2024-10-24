import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";
import LoginFB from "./LoginFB";
import SsoPointerSignIn from "./GoogleSignIn";
import ReCaptcha from "../ReCaptcha/ReCaptcha";
import { useDispatch } from "react-redux"; // Redux Hook
import { registerUser, signinUser,verifyAccount  } from "../redux/apiRequest"; // Your async action creator
import { useSelector } from "react-redux";
import { checkUserEmail } from "../API/apiService"
// const registeredUsers = [{ email: "giakhoi2004@gmail.com", role: "admin" }];

export default function Modal({ onRecaptchaToken = () => {} }) {
    const [showModal, setShowModal] = useState(false);
    const [isRegistered, setIsRegistered] = useState(null);
    const [email, setEmail] = useState("");
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [inputError, setInputError] = useState("");
    const [showVerification, setShowVerification] = useState(false);
    const userNav = useSelector((state) => state.auth?.login?.currentUser);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (recaptchaToken) {
            onRecaptchaToken(recaptchaToken);
        }
    }, [recaptchaToken, onRecaptchaToken]);

    useEffect(() => {
        setSubmitEnabled(recaptchaToken.length > 0);
    }, [recaptchaToken]);

    useEffect(() => {
        if (userNav?.email) {
            // Save userNav to local storage after login
            localStorage.setItem("userNav", JSON.stringify(userNav));
            setIsLoggedIn(true); // Mark the user as logged in
            setUser(userNav);
        }
    }, [userNav?.email]);
    
    useEffect(() => {
        const storedUserNav = localStorage.getItem("userNav");
        if (userNav?.email) {
            // setUser(userNav);
            // setIsLoggedIn(true);
            const parsedUserNav = JSON.parse(storedUserNav);
            setUser(parsedUserNav);
            setIsLoggedIn(true);
        }
    }, [userNav?.email]);
    

    const closeModal = () => {
        if (showVerification) {
            setShowVerification(false);
        } else {
            window.location.reload();
            setShowModal(false); 
            resetForm();
        }
    };
    
    const resetForm = () => {
        setIsRegistered(null);
        setEmail("");
        setShowPasswordInput(false);
        setPassword("");
        setConfirmPassword("");
        setInputError("");
    };

    const validateInput = (input) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
        // Kiểm tra số điện thoại: bắt đầu bằng 0 và có 10 chữ số
        
        
        if (emailPattern.test(input)) {
            return "email";
        } 
    };

    const [otp, setOtp] = useState(Array(6).fill("")); // Mảng chứa giá trị của từng ô

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Chỉ lấy ký tự cuối cùng
        setOtp(newOtp);
    
        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus(); // Chuyển đến ô tiếp theo
        }
    };
    
    
    const handleVerifyOTP = () => {
        const enteredOTP = otp.join(""); // Combine OTP input values
        verifyAccount(email, enteredOTP, dispatch,() => setShowModal(false), setShowVerification); // Make sure this is correct
    };
    

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    
        const validationResult = validateInput(value);
        if (validationResult === "invalid") {
            setInputError("Vui lòng nhập địa chỉ email hợp lệ.");
        } else if (!validationResult === "phoneInvalidStart") {
            setInputError("Số điện thoại phải bắt đầu bằng 0.");
        } else if (validationResult === "phoneTooLong") {
            setInputError("Số điện thoại không được vượt quá 10 chữ số.");
        } else {
            setInputError("");
        }
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleContinue = async (e) => {
        e.preventDefault();
        if (inputError || !email) return; // Check for input errors and empty email
    
        try {
          const result = await checkUserEmail(email); // Use your new function here
          if (result.exists) {
            setIsRegistered(true); // Show login form
          } else {
            setIsRegistered(false); // Show registration form
          }
          setShowPasswordInput(true); // Show the password input field after email check
        } catch (error) {
          console.error("Error checking email:", error);
          setInputError("Đã xảy ra lỗi khi kiểm tra email. Vui lòng thử lại sau.");
        }
      };
    
    const handleLogin = (e) => {
        e.preventDefault();
        
        const newUser = {
            email: email.trim(),
            password: password,
        };
    
        // Call the signinUser function
        signinUser(newUser, dispatch, () => {
            setShowModal(false);
            window.location.reload();
        });
    };
    
    
    const handleRegister = (e) => {
        e.preventDefault();
        if (inputError) return;

        if (password !== confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp!");
            return;
        }
        const newUser = {
            email: email.trim(), // Trim to avoid whitespace issues
            password: password,
        };
        registerUser(newUser,dispatch,setShowVerification)
       
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("userNav");
        setIsLoggedIn(false);
        setUser(null);
        setShowLogoutModal(false);
        window.location.reload();

    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleRecaptcha = (token) => {
        setRecaptchaToken(token);
    };
    console.log(isLoggedIn)
    return (
        <>
          {/* Conditionally display user email or login/register button */}
          <div className="flex items-center justify-center pr-2">
            {isLoggedIn ? (
              <div className="flex px-10 items-center">
                <p className="text-black text-sm font-medium mr-4">
                  {userNav?.email || "Guest"}
                </p>
                <button
                  className="text-blue-500 text-sm font-medium"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                className="
                  bg-white text-black
                  md:px-6 md:py-2
                  px-4 py-1
                  rounded shadow hover:bg-slate-100
                  sm:text-sm font-medium
                  border border-[#4CA771]
                  md:text-base text-xs
                "
                type="button"
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon={faUser} style={{ color: "#4CA771" }} /> Đăng
                Nhập / Đăng ký
              </button>
            )}
          </div>
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={closeModal}
                    />
                    <div className="flex items-center justify-center min-h-screen px-4 py-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10 relative transition-transform transform">
                        <button
                            className="absolute top-2 right-2 bg-transparent text-gray-500 hover:text-black"
                            onClick={closeModal} // Gọi hàm closeModal
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
                            <h2 className="text-2xl text-trek-color-1 font-bold mb-3">Đăng nhập / Đăng ký</h2>
                            <form
                                onSubmit={
                                    isRegistered === null
                                        ? handleContinue
                                        : isRegistered
                                        ? handleLogin
                                        : handleRegister
                                }
                            >
                                <p className="p-2 text-gray-700">Email của bạn</p>
                                <input
                                    type="text"
                                    placeholder="Ví dụ: abccba@gmail.com" 
                                    className={`w-full p-2 mb-4 border border-trek-color-1 rounded-md focus:border-blue-500 ${inputError ? "border-red-500" : ""}`}
                                    value={email}
                                    onChange={handleChange}
                                />
                                {inputError && (
                                    <p className="text-red-500 mb-2">{inputError}</p>
                                )}
                                
                                {showPasswordInput && (
                                    <>
                                        <input
                                            type="password"
                                            placeholder="Mật khẩu"
                                            className="w-full p-2 mb-4 border border-trek-color-1 rounded-md focus:border-blue-500"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        {!isRegistered && (
                                            <input
                                                type="password"
                                                placeholder="Xác nhận mật khẩu"
                                                className="w-full p-2 mb-4 border border-trek-color-1 rounded-md focus:border-blue-500"
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                            />
                                        )}
                                    </>
                                )}
                                <button
                                    disabled={!submitEnabled || !email || inputError}
                                    type="submit"
                                    className={`w-full p-2 mb-4 ${
                                        isRegistered === null
                                            ? "bg-gray-100 hover:bg-trek-color-1 hover:text-white text-slate-300 cursor-auto"
                                            : isRegistered
                                            ? "bg-gray-100 hover:bg-trek-color-1 hover:text-white text-slate-300"
                                            : "bg-gray-100 hover:bg-trek-color-1 hover:text-white text-slate-300"
                                    } rounded-md font-bold cursor-pointer`}
                                >
                                    {isRegistered === null
                                        ? "Tiếp tục"
                                        : isRegistered
                                        ? "Đăng nhập"
                                        : "Đăng ký"}
                                </button>
                                {isRegistered !== null && !inputError && (
                                    <p
                                        className={`mb-2 ${
                                            isRegistered ? "text-[#00875A]" : "text-[#FF5E1F]"
                                        }`}
                                    >
                                        {isRegistered
                                            ? "Email này đã được kết nối với tài khoản. Bạn có thể chỉ cần nhập mật khẩu của bạn dưới đây để đăng nhập."
                                            : "Email này chưa được đăng ký. Vui lòng nhập mật khẩu để đăng ký."}
                                    </p>
                                )}
                            </form>
                            { <div className="flex flex-col gap-2 mb-6">
                                <SsoPointerSignIn   />
                                
                            </div> }
                            <div className="flex mx-auto mb-6 justify-center items-center">
                                <ReCaptcha
                                    sitekey="6Le4TBoqAAAAAPQljcyv-mNasoIjpAgJGkR6g534"
                                    callback={handleRecaptcha}
                                    size="normal"
                                />
                            </div>
                            <div className="text-sm text-gray-600 mt-2 text-center">
                                Bằng cách đăng ký, bạn đồng ý với{" "}
                                <a href="#" className="text-trek-color-1 font-bold">
                                    Điều khoản & Điều kiện
                                </a>{" "}
                                của chúng tôi và bạn đã đọc{" "}
                                <a href="#" className="text-trek-color-1 font-bold">
                                    Chính Sách Quyền Riêng Tư
                                </a>{" "}
                                của chúng tôi.
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showVerification && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={closeModal}
                    />
                    <div className="flex items-center justify-center min-h-screen px-4 py-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10 relative transition-transform transform">
                            <h2 className="text-xl font-bold mb-4">Xác minh tài khoản</h2>
                            <p className="mb-4">Vui lòng kiểm tra email xác minh tài khoản của bạn.</p>
                            <div className="flex justify-between mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        id={`otp-input-${index}`} // Đặt ID cho từng ô
                                        className="w-12 h-12 border-2 text-center text-xl rounded-md focus:border-[#4CA771] outline-none"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                    />
                                ))}
                            </div>
                            <button
                                className="w-full bg-trek-color-1 bg-opacity-50 hover:bg-[#4CA771] text-white py-2 mt-4 rounded-md"
                                onClick={handleVerifyOTP}
                            >
                                Xác minh
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg text-trek-color-1 font-bold mb-4">Đăng xuất</h3>
                        <p className="mb-4">Bạn có chắc chắn muốn đăng xuất không?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-200 hover:bg-gray-400 text-black px-4 py-2 rounded w-1/2"
                                onClick={cancelLogout}
                            >
                                Không
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded w-1/2"
                                onClick={confirmLogout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
