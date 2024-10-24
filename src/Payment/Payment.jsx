import React, { useState, useEffect } from 'react';
import Header from '../header1/Header';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);
  const navigate = useNavigate();

  // Lấy dữ liệu từ localStorage
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));
  const user = JSON.parse(localStorage.getItem("userNav"));
  const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));
  const guestInfo = JSON.parse(localStorage.getItem("guestInfo"));
  const selectedDates = JSON.parse(localStorage.getItem("selectedDates"));
  const token = localStorage.getItem('token');

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      alert('Thời gian thanh toán đã hết. Vui lòng đặt lại vé.');
      navigate('/');
    }
  }, [timeRemaining, navigate]);

  const getPaymentButtonLabel = () => {
    switch (selectedPaymentMethod) {
      case 'wallet':
        return 'Thanh toán bằng ví điện tử';
      case 'atm':
        return 'Thanh toán bằng ATM';
      case 'credit':
        return 'Thanh toán bằng thẻ';
      default:
        return 'Thanh toán tại cửa hàng';
    }
  };
  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán.');
      return;
    }
  
    if (!user || !bookingData) {
      alert('Dữ liệu không hợp lệ. Vui lòng thử lại.');
      return;
    }
  
    const token = localStorage.getItem('token');  // Lấy token từ localStorage
  
    const orderData = {
      userId: user.id,
      tourId: bookingData.tourId,
      adultCount: bookingData.adultCount,
      childCount: bookingData.childCount,
      totalPrice: bookingData.totalPrice,
      paymentMethod: selectedPaymentMethod,
      selectedDates,
      guestInfo,
      contactInfo,
    };
  
    try {
      const response = await fetch('http://localhost:8081/orders/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Gửi token trong header
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        alert('Thanh toán thành công!');
        navigate('/confirmation');
      } else if (response.status === 401) {
        alert('Bạn không có quyền thực hiện hành động này. Vui lòng đăng nhập lại.');
        navigate('/login');  // Điều hướng tới trang đăng nhập nếu token hết hạn
      } else {
        alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Lỗi khi kết nối đến server. Vui lòng thử lại.');
    }
  };
  
  return (
    <>
      <Header />
      <div className="min-h-full my-28 w-7xl flex flex-col items-center">
        <div className="w-full max-w-6xl bg-trek-color-1 bg-opacity-15 text-trek-color-1 p-4 rounded-lg shadow-lg mt-6">
          <p className="text-xl font-bold">
            Thời gian còn lại để hoàn thành thanh toán: {formatTime(timeRemaining)}
          </p>
        </div>

        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Bạn muốn thanh toán thế nào?</h2>
          <div className="flex">
            <div className="w-2/3 pr-4">
              <h3 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h3>

              <div className="mb-4">
                <input
                  type="radio"
                  id="wallet"
                  name="payment"
                  value="wallet"
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label htmlFor="wallet" className="font-semibold">Ví điện tử khác</label>
              </div>

              <div className="mb-4">
                <input
                  type="radio"
                  id="atm"
                  name="payment"
                  value="atm"
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label htmlFor="atm" className="font-semibold">ATM Cards/Mobile Banking</label>
              </div>

              <div className="mb-4">
                <input
                  type="radio"
                  id="credit"
                  name="payment"
                  value="credit"
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label htmlFor="credit" className="font-semibold">Thẻ thanh toán</label>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tổng giá tiền</h3>
              <p className="text-xl font-bold">{bookingData.totalPrice.toLocaleString()} VND</p>
            </div>
            <button
              className="w-full bg-trek-color-1 bg-opacity-20 text-trek-color-1 text-opacity-50 py-3 font-bold rounded-md hover:text-white hover:bg-trek-color-1"
              onClick={handlePaymentSubmit}
            >
              {getPaymentButtonLabel()}
            </button>

            <p className="text-sm text-gray-600 mt-2">
              Bằng cách tiếp tục thanh toán, bạn đã đồng ý với{" "}
              <a href="#" className="text-trek-color-1 font-bold">Điều khoản & Điều kiện</a>{" "}
              của chúng tôi và bạn đã đọc{" "}
              <a href="#" className="text-trek-color-1 font-bold">Chính Sách Quyền Riêng Tư</a>{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
