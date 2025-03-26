/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Header from '../header1/Header';
import Footer from '../footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { Pointer } from "pointer-wallet";
import { message, Button, Card } from 'antd'; 
import { WalletOutlined, CreditCardOutlined, PayCircleOutlined } from '@ant-design/icons';
import partner from '../assets/partner.png';

// Add PayPal base URL constant
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
      case 'paypal':
          return 'Thanh toán qua ví liên kết paypal';
      default:
        return 'Thanh toán';
    }
  };

  const processPointerPayment = async (orderData) => {
    try {
      const { url } = await pointerPayment.createPayment({
        amount: orderData.totalPrice,
        currency: "VND",
        message: "thanh toán ví điện tử",
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


  // Add PayPal processing function
  const processPayPalPayment = async (orderData) => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/orders/api/paypal/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderID: orderData.orderId
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create PayPal payment');
      }
  
      if (data.paypalUrl) {
        window.location.href = data.paypalUrl;
      }
    } catch (error) {
      message.error('Payment processing failed. Please try again.');
    }
  };
  // Modify handlePaymentSubmit to include PayPal
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

      // Add PayPal condition
      if (selectedPaymentMethod === 'pointer-wallet') {
        await processPointerPayment({ ...orderData, orderId });
      } else if (selectedPaymentMethod === 'connected-wallet') {
        await processConnectedPayment({...orderData, orderId});
      } else if (selectedPaymentMethod === 'paypal') {
        await processPayPalPayment({...orderData, orderId});
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Server connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update the return JSX part
  return (
    <>
      <Header />
      <div className="min-h-full my-28 w-7xl flex flex-col items-center bg-gray-50">
        <div className="w-full max-w-6xl bg-trek-color-1 bg-opacity-15 text-trek-color-1 p-6 rounded-lg shadow-lg mt-6">
          <p className="text-xl font-bold flex items-center justify-center">
            <CreditCardOutlined className="mr-2" />
            Thời gian còn lại để hoàn thành thanh toán: {formatTime(timeRemaining)}
          </p>
        </div>
  
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mt-6">
          <h2 className="text-2xl font-bold mb-8 text-center text-trek-color-1">
            Chọn phương thức thanh toán
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pointer Wallet Payment */}
            <Card 
              hoverable 
              className={`border-2 ${selectedPaymentMethod === 'pointer-wallet' ? 'border-green-500' : 'border-gray-200'}`}
              onClick={() => setSelectedPaymentMethod('pointer-wallet')}
            >
              <div className="flex flex-col items-center">
                <WalletOutlined style={{ fontSize: '2rem', color: '#4CAF50' }} />
                <img 
                  src={partner}
                  alt="Pointer Wallet" 
                  className="h-12 my-4"
                />
                <input
                  type="radio"
                  id="pointer-wallet"
                  name="paymentMethod"
                  value="pointer-wallet"
                  checked={selectedPaymentMethod === 'pointer-wallet'}
                  onChange={handlePaymentChange}
                  className="mt-2"
                />
                <label htmlFor="pointer-wallet" className="font-medium mt-2">
                  Ví điện tử Pointer
                </label>
              </div>
            </Card>
  
            {/* Connected Wallet Payment */}
            <Card 
              hoverable 
              className={`border-2 ${selectedPaymentMethod === 'connected-wallet' ? 'border-green-500' : 'border-gray-200'}`}
              onClick={() => setSelectedPaymentMethod('connected-wallet')}
            >
              <div className="flex flex-col items-center">
                <PayCircleOutlined style={{ fontSize: '2rem', color: '#2196F3' }} />
                <img 
                 src={partner}
                  alt="Connected Wallet" 
                  className="h-12 my-4"
                />
                <input
                  type="radio"
                  id="connected-wallet"
                  name="paymentMethod"
                  value="connected-wallet"
                  checked={selectedPaymentMethod === 'connected-wallet'}
                  onChange={handlePaymentChange}
                  className="mt-2"
                />
                <label htmlFor="connected-wallet" className="font-medium mt-2">
                  Thanh toán nhanh với Pointer
                </label>
              </div>
            </Card>
  
            {/* PayPal Payment */}
            <Card 
              hoverable 
              className={`border-2 ${selectedPaymentMethod === 'paypal' ? 'border-green-500' : 'border-gray-200'}`}
              onClick={() => setSelectedPaymentMethod('paypal')}
            >
              <div className="flex flex-col items-center">
                <img 
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" 
                  alt="PayPal" 
                  className="h-12 mb-4"
                />
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={selectedPaymentMethod === 'paypal'}
                  onChange={handlePaymentChange}
                  className="mt-2"
                />
                <label htmlFor="paypal" className="font-medium mt-2">
                  Thanh toán với PayPal
                </label>
              </div>
            </Card>
          </div>
  
          <div className="flex justify-center mt-8">
            <Button
              className={`h-12 px-8 text-lg ${
                selectedPaymentMethod 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-300'
              } text-white font-bold`}
              size="large"
              loading={loading}
              onClick={handlePaymentSubmit}
              disabled={!selectedPaymentMethod}
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
