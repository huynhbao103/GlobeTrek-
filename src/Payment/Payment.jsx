import React, { useState, useEffect } from 'react';
import Header from '../header1/Header';
import Footer from '../footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { Pointer } from "pointer-wallet";
import { message } from 'antd';
import LoadingLogin from '../../src/LoadingLogin';
const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function Payment() {
  const { id } = useParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);

  const navigate = useNavigate();

  const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};
  const user = JSON.parse(localStorage.getItem("userNav")) || {};
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo")) || {};
  const passengerInfo = JSON.parse(localStorage.getItem("passengerInfo")) || {};
  const selectedDates = JSON.parse(localStorage.getItem("selectedDates")) || [];

  const pointerPayment = new Pointer(import.meta.env.VITE_POINTER_SECRET_KEY);
  const token = user?.accessToken || user?.accesstoken || user?.token?.accessToken || user?.token;

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
      message.error('Thời gian thanh toán đã hết, vui lòng thử lại.');
      navigate('/');
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
      const { url } = await pointerPayment.createPayment({
        amount: orderData.totalPrice,
        currency: "VND",
        message: "Payment with Pointer",
        userID: user._id || user.userId,
        orderID: orderData.orderId,
        returnUrl: `${VITE_REDIRECT_URL}`,
        orders: orderData.orders?.map(order => ({
          name: order.name,
          image: order.images,
          description: order.description,
          quantity: order.quantity,
          price: order.price,
        })) || [],
      });

      if (url) {
        message.success('Đang chuyển hướng đến ví điện tử...');
        window.location.href = url;

      } else {
        throw new Error('Lỗi khi tạo thanh toán.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Lỗi khi kết nối đến server. Vui lòng thử lại.');
    }
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      message.warning('Vui lòng chọn phương thức thanh toán.');
      return;
    }

    if (!user) {
      message.error('Thông tin người dùng không hợp lệ. Vui lòng đăng nhập lại.');
      console.log('User:', user);
      return;
    }

    if (!bookingData) {
      message.error('Dữ liệu đặt chỗ không hợp lệ. Vui lòng kiểm tra lại.');
      console.log('Booking Data:', bookingData);
      return;
    }

    if (!customerInfo) {
      message.error('Thông tin khách hàng không hợp lệ. Vui lòng kiểm tra lại.');
      console.log('Customer Info:', customerInfo);
      return;
    }

    if (selectedDates.length === 0) {
      message.error('Vui lòng chọn ngày đặt.');
      console.log('Selected Dates:', selectedDates);
      return;
    }

    if (!bookingData.tourId) {
      message.error('Mã tour không hợp lệ. Vui lòng kiểm tra lại.');
      console.log('Booking Tour ID:', bookingData.tourId);
      return;
    }

    const orderData = {
      userId: user._id || user.userId,
      tour: bookingData.tourId,
      adultCount: bookingData.adultCount,
      childCount: bookingData.childCount,
      totalPrice: bookingData.totalPrice,
      paymentMethod: selectedPaymentMethod,
      selectedDates: selectedDates[selectedDates.length - 1],
      passengerInfo,
      customerInfo: {
        fullName: customerInfo.fullName,
        phone: customerInfo.phone,
        email: customerInfo.email,
      },
      totalValue: bookingData.totalPrice,
      adultPrice: bookingData.adultPrice,
      childPrice: bookingData.childPrice,
      bookingDate: selectedDates[0],
    };

    console.log(orderData);

    try {
      const response = await fetch(`${VITE_BASE_URL}/orders/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data); // Kiểm tra phản hồi

        const orderId = data.order._id;
        localStorage.setItem('orderID', orderId);

        message.success('Đơn hàng đã được tạo thành công!');
        await processPayment({ ...orderData, orderId });
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          message.error('Bạn không có quyền thực hiện hành động này. Vui lòng đăng nhập lại.');
          navigate('/LoadingLogin');
        } else if (response.status === 403) {
          message.error('Bạn không có quyền truy cập vào hành động này.');
          navigate('/LoadingLogin');
        } else {
          message.error(`Có lỗi xảy ra: ${errorData.message || 'Vui lòng thử lại.'}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Lỗi khi kết nối đến server. Vui lòng thử lại.');
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
                  name="payment"
                  value="pointer-wallet"
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label htmlFor="pointer-wallet" className="font-semibold">Ví điện tử khác</label>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tổng giá tiền</h3>
              <p className="text-xl font-bold">{bookingData.totalPrice.toLocaleString()} VND</p>
            </div>
            <button
              className={`w-full bg-trek-color-1 text-white py-3 px-6 rounded-lg hover:bg-trek-color-1-dark transition duration-300 ${selectedPaymentMethod ? '' : 'opacity-50 cursor-not-allowed'
                }`}
              onClick={handlePaymentSubmit}
              disabled={!selectedPaymentMethod}
            >
              {getPaymentButtonLabel()}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
