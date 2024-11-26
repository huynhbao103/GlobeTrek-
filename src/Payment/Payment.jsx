/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Header from '../header1/Header';
import Footer from '../footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { Pointer } from "pointer-wallet";
import { message, Button } from 'antd'; 
const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const secretKey = import.meta.env.VITE_POINTER_SECRET_KEY;
const pointerPayment = new Pointer(secretKey); 

function Payment() {
  const { id } = useParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get booking data and user information from localStorage
  const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};
  const user = JSON.parse(localStorage.getItem("userNav")) || {};
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo")) || {};
  const passengerInfo = JSON.parse(localStorage.getItem("passengerInfo")) || {};
  const selectedDates = JSON.parse(localStorage.getItem("selectedDates")) || [];

  const token = user.accessToken || user?.accessToken || user?.accesstoken || user?.token?.accessToken || user?.token;

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
      case 'connected-wallet':
        return 'Thanh toán qua ví liên kết';
      default:
        return 'Thanh toán';
    }
  };

  const processPointerPayment = async (orderData) => {
    try {
      const { url } = await pointerPayment.createPayment({
        amount: orderData.totalPrice,
        currency: "VND",
        message: "Payment with Pointer",
        userID: user._id || user.userId,
        orderID: orderData.orderId,
        returnUrl: `${VITE_REDIRECT_URL}/setplace`,
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

  const processConnectedPayment = async (orderData) => {
    try {
      if (!pointerPayment) {
        throw new Error("Pointer Payment instance is not initialized.");
      }
  
      if (!orderData.orderId || !orderData.totalPrice) {
        throw new Error("Order data is incomplete.");
      }
      const response = await pointerPayment.connectedPayment({
        signature: user?.signature,
        amount: orderData.totalPrice,
        currency: "VND",
        message: `Payment for order ${orderData.orderId}`,
        userID: user._id || user.userId,
        orderID: orderData.orderId,
        returnUrl: `${VITE_REDIRECT_URL}/setplace`,
      });
  console.log(response);
      // Kiểm tra phản hồi từ API
      if (response?.status === 200 ) {
        message.success("Thanh toán qua ví liên kết thành công!");
      } else {
        throw new Error("Lỗi khi thực hiện thanh toán qua ví liên kết.");
      }
    } catch (error) {
      console.error("Connected Payment Error:", error);
      message.error("Lỗi khi thanh toán qua ví liên kết. Vui lòng thử lại.");
    }
  };
  

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      message.warning('Vui lòng chọn phương thức thanh toán.');
      return;
    }

    if (!user) {
      message.error('Thông tin người dùng không hợp lệ. Vui lòng đăng nhập lại.');
      return;
    }

    if (!token) {
      message.error('Không có token. Vui lòng thử lại.');
      return;
    }

    if (!bookingData) {
      message.error('Dữ liệu đặt chỗ không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    if (!customerInfo) {
      message.error('Thông tin khách hàng không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    if (selectedDates.length === 0) {
      message.error('Vui lòng chọn ngày đặt.');
      return;
    }

    if (!bookingData.tourId) {
      message.error('Mã tour không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    const orderData = {
      signature: user?.signature,
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
      bookingDate: selectedDates[selectedDates.length - 1],
      orders: bookingData.orders || [],
    };

    try {
      setLoading(true);
      if (!token) {
        console.error("Access token is missing");
        return;
      }
      const response = await fetch(`${VITE_BASE_URL}/orders/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const orderId = data.order._id;
      localStorage.setItem('orderID', orderId); 

      message.success('Đơn hàng đã được tạo thành công!');

      if (selectedPaymentMethod === 'pointer-wallet') {
        await processPointerPayment({ ...orderData, orderId });
      } else if (selectedPaymentMethod === 'connected-wallet') {
        await processConnectedPayment({...orderData, orderId}); 
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Lỗi khi kết nối đến server. Vui lòng thử lại.');
    } finally {
      setLoading(false);
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
              <h3 className="text-lg font-medium">Chọn phương thức thanh toán</h3>
              <div className='mt-5'>
                <input
                  type="radio"
                  id="pointer-wallet"
                  name="paymentMethod"
                  value="pointer-wallet"
                  checked={selectedPaymentMethod === 'pointer-wallet'}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="pointer-wallet">Ví điện tử Pointer</label>
              </div>
              <div className='mt-5'>
                <input
                  type="radio"
                  id="connected-wallet"
                  name="paymentMethod"
                  value="connected-wallet"
                  checked={selectedPaymentMethod === 'connected-wallet'}
                  onChange={handlePaymentChange}
                />
                <label htmlFor="connected-wallet">Thanh toán nhanh với Pointer</label>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 w-full">
            <Button
             className='bg-green-500 text-white font-bold'
              size="large"
              loading={loading}
              onClick={handlePaymentSubmit}
            >
              {getPaymentButtonLabel()}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
