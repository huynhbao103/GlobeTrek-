import React, { useState, useEffect } from 'react';
import Header from '../header1/Header';
import Footer from '../footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';

function Payment() {
  const { id } = useParams(); // id is tourId from URL
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);
  const navigate = useNavigate();

  const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};
  const user = JSON.parse(localStorage.getItem("userNav")) || {};
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo")) || {};
  const passengerInfo = JSON.parse(localStorage.getItem("passengerInfo")) || {};
  const selectedDates = JSON.parse(localStorage.getItem("selectedDates")) || [];

  const token = user?.accessToken || user.token;  
  console.log("Token:", token);

  useEffect(() => {
    if (id) {
      const bookingDataWithTourId = { ...bookingData, tourId: id };
      localStorage.setItem("bookingData", JSON.stringify(bookingDataWithTourId));
    }
  }, [id, bookingData]);

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
      alert('Thời gian thanh toán đã hết, vui lòng thử lại.');
      navigate('/'); // Redirect to home when time is up
    }
  }, [timeRemaining, navigate]);

  const getPaymentButtonLabel = () => {
    switch (selectedPaymentMethod) {
      case 'pointer-wallet':
        return 'Thanh toán bằng ví điện tử';
      default:
        return 'Thanh toán';
    }
  };

  const processPayment = async (orderData) => {
    try {
      const response = await fetch('https://pointer.io.vn/api/v1/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer pk_presspay_82fad953e33c472656094ab3b6a3d7d3553d3215ea09fda4e7d363caae555811`,
        },
        body: JSON.stringify({
          private_key: "pk_presspay_62849c1e70084b1d3372ad5a8913f918fab3d64324a9de6a7b4adbbfdcf8e70d",
          amount: orderData.totalPrice,
          currency: "VND",
          message: "Tour Payment",
          userID: user._id || user.userId,
          OrderID: orderData.orderId,
          return_url: `http://localhost:5173`,
        }),
      });

      const data = await response.json();
      if (response.ok && data.data?.url) {
        alert('Redirecting to payment gateway');
        window.location.href = data.data.url;
      } else {
        throw new Error(data.message || 'Lỗi khi tạo thanh toán.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Lỗi khi kết nối đến server. Vui lòng thử lại.');
    }
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán.');
      return;
    }

    if (!user || !bookingData || !passengerInfo || !customerInfo || selectedDates.length === 0 || !bookingData.tourId) {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    const orderData = {
      orderId: `Order_${new Date().getTime()}`,
      userId: user._id || user.userId,
      tour: bookingData.tourId, 
      adultCount: bookingData.adultCount,
      childCount: bookingData.childCount,
      totalPrice: bookingData.totalPrice,
      paymentMethod: selectedPaymentMethod,
      selectedDates: selectedDates[0],
      passengerInfo,
      customerInfo: {
        fullName: customerInfo.fullName,
        phone: customerInfo.phone,
        email: customerInfo.email,
      },
      adultPrice: bookingData.adultPrice,
      childPrice: bookingData.childPrice,
      bookingDate: selectedDates[0],
    };

    await processPayment(orderData);
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
                  id="pointer-wallet"
                  name="pointer-wallet"
                  value="pointer-wallet"
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label htmlFor="pointer-wallet" className="font-semibold">Thanh toán với Pointer Wallet</label>
              </div>
            </div>
          </div>  

          <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tổng giá tiền</h3>
              <p className="text-xl font-bold">{bookingData.totalPrice.toLocaleString()} VND</p>
            </div>
            <button
              className={`w-full bg-trek-color-1 text-white py-3 font-bold rounded-md hover:text-white hover:bg-trek-color-1 hover:opacity-50 ${!selectedPaymentMethod && 'opacity-50 cursor-not-allowed'}`}
              onClick={handlePaymentSubmit}
              disabled={!selectedPaymentMethod}
            >
              {getPaymentButtonLabel()}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Bằng cách tiếp tục thanh toán, bạn đã đồng ý với{" "}
              <a href="#" className="text-blue-500 underline">Điều khoản và Điều kiện</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
