import React, { useState, useEffect } from 'react';
import Header from '../header1/Header';
import Footer from '../footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';

function Payment() {
  const { id } = useParams(); // id là tourId từ URL
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);
  const navigate = useNavigate();

  const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};
  const user = JSON.parse(localStorage.getItem("userNav")) || {};
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo")) || {};
  const passengerInfo = JSON.parse(localStorage.getItem("passengerInfo")) || {};
  const selectedDates = JSON.parse(localStorage.getItem("selectedDates")) || [];

  const token = user?.accessToken || user.token ;  
  console.log("Token:", token);
  useEffect(() => {
    if (id) {
      const bookingDataWithTourId = {
        ...bookingData,
        tourId: id,
      };
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
      navigate('/'); // Điều hướng về trang chủ khi thời gian kết thúc
    }
  }, [timeRemaining, navigate]);

  const getPaymentButtonLabel = () => {
    switch (selectedPaymentMethod) {
      case 'pointer-wallet':
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

    // Kiểm tra xem tất cả các trường có dữ liệu hay không
    if (!user || !bookingData || !passengerInfo || !customerInfo || selectedDates.length === 0 || !bookingData.tourId) {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
      console.log({ user, bookingData, passengerInfo, customerInfo, selectedDates });
      return;
    }
    const orderData = {
      userId: user._id || user.userId,
      tour: bookingData.tourId, 
      adultCount: bookingData.adultCount,
      childCount: bookingData.childCount,
      totalPrice: bookingData.totalPrice,
      paymentMethod: selectedPaymentMethod,
      selectedDates: selectedDates[0], // Giả sử chỉ lấy ngày đầu tiên
      passengerInfo,
      customerInfo: {
        fullName: customerInfo.fullName,
        phone: customerInfo.phone,
        email: customerInfo.email,
      },
      totalValue: bookingData.totalPrice,
      adultPrice: bookingData.adultPrice, // Đảm bảo thêm trường này
      childPrice: bookingData.childPrice, // Đảm bảo thêm trường này
      bookingDate: selectedDates[0], // Hoặc trường khác phù hợp
    };
    
    console.log(orderData); // Xem dữ liệu trước khi gửi

    try {
      const response = await fetch('http://localhost:8081/orders/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Đang chờ xác nhân thanh toán ');
        navigate('/');
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          alert('Bạn không có quyền thực hiện hành động này. Vui lòng đăng nhập lại.');
          navigate('/login');
        } else if (response.status === 403) {
          alert('Bạn không có quyền truy cập vào hành động này.'); 
        } else {
          alert(`Có lỗi xảy ra: ${errorData.message || 'Vui lòng thử lại.'}`);
        }
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
                  id="pointer-wallet"
                  name="pointer-wallet"
                  value="pointer-wallet"
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label htmlFor="pointer-wallet" className="font-semibold">Ví điện tử khác</label>
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
              className={`w-full bg-trek-color-1 bg-opacity-20 text-trek-color-1 text-opacity-50 py-3 font-bold rounded-md hover:text-white hover:bg-trek-color-1 ${!selectedPaymentMethod && 'opacity-50 cursor-not-allowed'}`}
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
