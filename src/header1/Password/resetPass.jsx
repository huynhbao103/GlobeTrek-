// import { useState, useEffect } from "react";
// import { Input, Button, message, Spin } from "antd";
// import axios from "../../";
// import { useParams} from "react-router-dom";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     if (!token) {
//       message.error("Invalid or expired token.");
//       setIsError(true);
//     }
//   }, [token]);

//   const handleSubmit = async () => {
//     if (!password || !confirmPassword) {
//       message.error("Both password fields are required.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       message.error("Passwords do not match.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/reset-password/${token}`, // Sử dụng VITE_BASE_URL cho Vite
//         { password }
//       );

//       if (response.data.success) {
//         message.success(response.data.message);
//         // Redirect về trang login sau khi reset thành công
//         setTimeout(() => {
//           history.push("/login");
//         }, 2000);
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       message.error("Something went wrong!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Nếu có lỗi (token không hợp lệ), không hiển thị form reset password
//   if (isError) {
//     return <div>Invalid or expired token.</div>;
//   }

//   return (
//     <div className="reset-password-container" style={{ padding: "20px", textAlign: "center" }}>
//       <h2>Reset Password</h2>
//       <Input.Password
//         placeholder="New Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ width: "300px", marginBottom: "10px" }}
//       />
//       <Input.Password
//         placeholder="Confirm New Password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         style={{ width: "300px", marginBottom: "10px" }}
//       />
//       <Button
//         type="primary"
//         onClick={handleSubmit}
//         loading={isLoading}
//         style={{ width: "300px" }}
//       >
//         {isLoading ? <Spin /> : "Reset Password"}
//       </Button>
//     </div>
//   );
// };

// export default ResetPassword;
