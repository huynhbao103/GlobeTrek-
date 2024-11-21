import { useState } from 'react';
import { useDispatch } from 'react-redux'; // Để sử dụng Redux (nếu cần)
import { Button, Input, message } from 'antd';
import { motion } from 'framer-motion';
import { forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailed } from '../../redux/authSlice';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch(); // Dispatch từ Redux để cập nhật trạng thái

  // Hàm xử lý gửi yêu cầu quên mật khẩu
  const handleSubmit = async () => {
  if (!email) {
    message.error("Vui lòng nhập email!");
    return;
  }

  setIsLoading(true); // Đánh dấu đang xử lý
  dispatch(forgotPasswordStart()); // Dispatch bắt đầu yêu cầu quên mật khẩu

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/forgot-password`, { email });
    
    // Sử dụng response để lấy dữ liệu trả về, ví dụ:
    console.log(response.data);  // Log dữ liệu từ API
    
    // Nếu gửi email thành công
    dispatch(forgotPasswordSuccess());
    message.success("Email khôi phục đã được gửi!");
    setIsSubmitted(true); // Đánh dấu là đã gửi thành công
  } catch (error) {
    // Xử lý lỗi khi gửi yêu cầu
    console.error("Lỗi khi gửi email:", error);
    dispatch(forgotPasswordFailed());
    message.error("Gửi email thất bại, vui lòng thử lại.");
  } finally {
    setIsLoading(false); // Dừng trạng thái loading
  }
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: "20px", textAlign: "center" }}
    >
      {!isSubmitted ? (
        <>
          <h2>Quên mật khẩu?</h2>
          <p>Nhập email của bạn để nhận liên kết khôi phục mật khẩu.</p>
          <Input
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "10px", width: "300px" }}
          />
          <Button
            className='bg-trek-color-1 hover:bg-trek-color-1'
            type="primary"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!email || isLoading}
          >
            Gửi yêu cầu
          </Button>
        </>
      ) : (
        <p>Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.</p>
      )}
    </motion.div>
  );
};

export default ForgotPassword;
