import { useState, useEffect } from "react";
import { Input, Button, message, Spin } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../../footer/Footer";

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate(); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");  
  const [isLoading, setIsLoading] = useState(false);  
  const [isError, setIsError] = useState(false);  
  useEffect(() => {
    if (!token) { 
      message.error("Invalid or expired token.");
      setIsError(true);
    }
  }, [token]);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      message.error("Both password fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      message.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/reset-password/${token}`, 
        { password }
      );

      if (response.data.success) {
        message.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        message.error(response.data.message);  
      }
    } catch (error) {
      message.error("Something went wrong!"); 
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  if (isError) {
    return <div className="text-center text-lg text-red-600">Invalid or expired token. Please try again later or contact support.</div>;
  }

  return (
    <div>
    <Header/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-trek-color-1 mb-6">Reset Password</h2>
        
        <Input.Password
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full"
          style={{ borderRadius: '8px' }}
        />
        
        <Input.Password
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-6 w-full"
          style={{ borderRadius: '8px' }}
        />

        <Button
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
          className="w-full bg-trek-color-1 hover:bg-trek-color-2 text-white font-semibold py-2 rounded-lg"
        >
          {isLoading ? <Spin /> : "Reset Password"}
        </Button>
      </div>
    
    </div>
    <Footer/>
    </div>
  );
};

export default ResetPassword;
