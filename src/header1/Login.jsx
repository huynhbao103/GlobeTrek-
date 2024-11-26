import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SsoPointerSignIn from "./GoogleSignIn";
import { useDispatch } from "react-redux"; // Redux Hook
import { registerUser, signinUser, verifyAccount } from "../redux/apiRequest";
import { useSelector } from "react-redux";
import { checkUserEmail } from "../API/apiService";
import { message } from 'antd';
import { Input, Row, Col } from "antd";

import ForgotPassword from './Password/ForgotPassword';

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(null);
  const [email, setEmail] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [,setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [inputError, setInputError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const userNav = useSelector((state) => state.auth?.login?.currentUser);
  const [otp, setOtp] = useState(Array(6).fill("")); 

  const dispatch = useDispatch();
  useEffect(() => {
    if (userNav?.email) {
      localStorage.setItem("userNav", JSON.stringify(userNav));
      setIsLoggedIn(true);
      setUser(userNav);
    }
  }, [userNav, userNav?.email]);

  useEffect(() => {
    const storedUserNav = localStorage.getItem("userNav");
    if (userNav?.email) {
      const parsedUserNav = JSON.parse(storedUserNav);
      setUser(parsedUserNav);';;'
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
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(input)) {
      return "email"; // return email if it's valid
    } else {
      return "invalid"; // return invalid if not a valid email
    }
  };
  
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  // Hàm xử lý khi xóa ký tự
  const handleKeyDown = (index, event) => {
    // Nếu người dùng nhấn Backspace và ô hiện tại trống, chuyển focus đến ô trước đó
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  // const handleVerifyOTP = () => {
  //   const enteredOTP = otp.join("");
  //   verifyAccount(email, enteredOTP, dispatch, () => setShowModal(false), setShowVerification);
  // };
  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length === 6) {
      verifyAccount(email, enteredOTP,dispatch, () => setShowModal(false), setShowVerification);
    } else {
      message.error("Vui lòng nhập đầy đủ OTP.");
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  
    const validationResult = validateInput(value);
    if (validationResult === "invalid") {
      setInputError("Vui lòng nhập địa chỉ email hợp lệ.");
    } else {
      setInputError(""); // Clear the error when the email is valid
    }
  };

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);  // Mở modal
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false); // Đóng modal
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if (inputError || !email) return;

    try {
      const result = await checkUserEmail(email);
      if (result.exists) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
      setShowPasswordInput(true);
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

    signinUser(newUser, dispatch, () => {
      setShowModal(false);
      window.location.reload();
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (inputError) return;

    if (password !== confirmPassword) {
      message.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    const newUser = {
      email: email.trim(),
      password: password,
    };
    registerUser(newUser, dispatch, setShowVerification);
  };

  // const handleLogout = () => {
  //   setShowLogoutModal(true);
  // };

  // const confirmLogout = () => {
  //   localStorage.removeItem("userNav");
  //   setIsLoggedIn(false);
  //   setUser(null);
  //   setShowLogoutModal(false);
  //   window.location.reload();
  // };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  
  const confirmLogout = () => {
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  
    // Clear local storage
    localStorage.clear();
  
    // Clear session storage (if used)
    sessionStorage.clear();
  
    // Clear URL parameters without page reload
    const url = new URL(window.location.href);
    url.search = ""; // Clear all query parameters
    window.history.replaceState({}, '', url.href); // Update URL in browser without reload
  
    // Clear state variables
    setIsLoggedIn(false);
    setUser(null);
    setShowLogoutModal(false);
  
    // Reload the page
    window.location.reload(); // Page will reload to clear everything and reset the state
  };
  
  
  

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
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
            className="bg-white text-black md:px-6 md:py-2 px-4 py-1 rounded shadow hover:bg-slate-100 sm:text-sm font-medium border border-[#4CA771] md:text-base text-xs"
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
                    <button
                      className="text-trek-color-1 text-sm"
                      onClick={openForgotPasswordModal}
                    >
                      Quên mật khẩu?
                    </button>
                  </>
                )}
                <button
                  disabled={!email || inputError}
                  type="submit"
                  className={`w-full py-2 text-white font-semibold rounded-lg ${email && !inputError ? "bg-trek-color-1 hover:bg-trek-color-2" : "bg-gray-400 cursor-not-allowed"}`}
                >
                  {isRegistered === null
                    ? "Tiếp tục"
                    : isRegistered
                      ? "Đăng nhập"
                      : "Đăng ký"}
                </button>
              </form>
              
              <div className="flex items-center justify-between mt-4">
                <div className="h-px bg-gray-300 flex-grow" />
                <span className="mx-4 text-gray-500">Hoặc</span>
                <div className="h-px bg-gray-300 flex-grow" />
              </div>
              <SsoPointerSignIn />
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
            {showForgotPasswordModal && (
              <div className="fixed inset-0 z-50 flex justify-center items-center">
                <div
                  className="fixed inset-0 w-full h-full opacity-40"
                  onClick={closeModal}
                />
                <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10 border-2 border-trek-color-1 border-opacity-50 ">
                  <ForgotPassword closeModal={closeForgotPasswordModal} />
                </div>
              </div>
            )}


          </div>
          
        </div>
      )}
      
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={cancelLogout}
          />
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10 relative">
              <h2 className="text-2xl font-bold mb-3">Xác nhận đăng xuất</h2>
              <p>Bạn có chắc chắn muốn đăng xuất không?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 mr-2 text-sm font-semibold text-gray-500 hover:text-gray-700"
                  onClick={cancelLogout}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 text-sm font-semibold text-white bg-trek-color-1 rounded-md hover:bg-trek-color-2"
                  onClick={confirmLogout}
                >
                  Đăng xuất
                </button>
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
              <h2 className="text-2xl text-trek-color-1 font-bold mb-3">Xác minh mã OTP</h2>
              <p>Vui lòng nhập mã OTP đã được gửi đến email của bạn</p>
              <Row gutter={[8, 8]} justify="center">
          {otp.map((digit, index) => (
            <Col key={index}>
              <Input
              className="mt-5"
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)} // Xử lý sự kiện xóa
                style={{ width: "50px", height: "50px", textAlign: "center" }}
              />
            </Col>
          ))}
        </Row>
              <button
                onClick={handleVerifyOTP}
                className="w-full py-2 mt-4 text-white font-semibold rounded-lg bg-trek-color-1 hover:bg-trek-color-2"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
  }