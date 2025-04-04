import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, message } from 'antd';
import { motion } from 'framer-motion';
import { forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailed } from '../../redux/authSlice';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn hành vi mặc định của form
    if (!email) {
      message.error("Vui lòng nhập email!");
      return;
    }

    setIsLoading(true);
    dispatch(forgotPasswordStart());

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/forgot-password`, { email });
      console.log(response.data);
      dispatch(forgotPasswordSuccess());
      message.success("Email khôi phục đã được gửi!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
      dispatch(forgotPasswordFailed());
      message.error("Gửi email thất bại, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-100"
    >
      <div className="justify-center items-center">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-trek-color-1">
              Quên mật khẩu?
            </h2>
            <p className="mb-4">Nhập email của bạn để nhận liên kết khôi phục mật khẩu.</p>
            <Input
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%" }}
            />
            <Button
              className="bg-trek-color-1 text-white mt-4"
              type="primary"
              htmlType="submit" 
              loading={isLoading}
              disabled={!email || isLoading}
            >
              Gửi yêu cầu
            </Button>
          </form>
        ) : (
          <p className="text-center text-gray-600">
            Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ForgotPassword;