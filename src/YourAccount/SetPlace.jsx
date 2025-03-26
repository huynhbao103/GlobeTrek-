/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, Typography, Pagination, Button, message } from 'antd';
import SidebarMenu from './SidebarMenu';
import Header from '../header1/Header';
import Footer from '../footer/Footer';

const { Title, Text } = Typography;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SetPlace = ({ setSelectedSection }) => {
  const [todayOrders, setTodayOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [paypalToken, setPaypalToken] = useState(null); // State để lưu token từ URL
  const navigate = useNavigate();
  const location = useLocation();

  // Xử lý redirect từ PayPal và lưu token
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token'); // paypalOrderId
    const payerId = query.get('PayerID');

    if (token && payerId) {
      setPaypalToken(token); // Lưu token vào state
      // Không gọi capture ngay, chờ người dùng nhấn nút
    }
  }, [location]);

  // Lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('userNav'));
        const accessToken = user?.accessToken;

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch(`${BASE_URL}/orders/api/list`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        filterRecentOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        message.error('Không thể tải dữ liệu đơn hàng');
      }
    };

    const filterRecentOrders = (orders) => {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      const filteredOrders = Object.values(orders).flat().filter((order) => {
        const createdAtDate = new Date(order.createdAt);
        return createdAtDate >= sevenDaysAgo && createdAtDate <= today;
      });

      filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTodayOrders(filteredOrders);
    };

    fetchOrders();
  }, []);

  // Hàm xác nhận thanh toán PayPal
  const capturePaypalPayment = async (orderId) => {
    try {
      const user = JSON.parse(localStorage.getItem('userNav'));
      const accessToken = user?.accessToken;

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      if (!paypalToken) {
        throw new Error("Không tìm thấy PayPal token");
      }

      const response = await fetch(`${BASE_URL}/orders/api/paypal/capture-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: orderId,
          paypalOrderId: paypalToken, // Sử dụng token từ URL
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Cập nhật trạng thái đơn hàng trong UI
        setTodayOrders((prevOrders) =>
          prevOrders.map((o) =>
            o._id === orderId ? { ...o, status: 'paid' } : o
          )
        );
        message.success('Thanh toán PayPal thành công!');
        setPaypalToken(null); // Xóa token sau khi sử dụng
        navigate('/setplace', { replace: true }); // Xóa query params khỏi URL
      } else {
        message.error('Xác nhận thanh toán thất bại');
      }
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      message.error('Không thể xác nhận thanh toán PayPal');
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const user = JSON.parse(localStorage.getItem('userNav'));
      const accessToken = user?.accessToken;

      const response = await fetch(`${BASE_URL}/orders/api/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTodayOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'canceled' } : order
        )
      );
      message.success('Hủy đơn hàng thành công');
    } catch (error) {
      console.error('Error canceling order:', error.message);
      message.error('Không thể hủy đơn hàng');
    }
  };

  const refundOrder = async (orderID) => {
    try {
      const user = JSON.parse(localStorage.getItem('userNav'));
      const accessToken = user?.accessToken;

      const response = await fetch(`${BASE_URL}/orders/api/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTodayOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderID ? { ...order, status: 'canceled' } : order
        )
      );
      message.success('Hoàn tiền thành công');
    } catch (error) {
      console.error('Error refunding order:', error.message);
      message.error('Không thể hoàn tiền');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayOrders = todayOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      case 'paid': return 'green';
      case 'canceled': return 'red';
      default: return 'gray';
    }
  };

  const canCancelTour = (status) => {
    return status !== 'canceled' && status !== 'paid';
  };

  const canRefundTour = (status, bookingDate) => {
    if (status !== 'paid') return false;
    const today = new Date();
    const booking = new Date(bookingDate);
    const diffDays = Math.ceil((booking - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 2;
  };

  return (
    <>
      <Header />
      <div className="w-full mt-36 h-auto">
        <div className="flex max-w-[1280px] justify-center mx-auto flex-row items-start pb-10">
          <SidebarMenu setSelectedSection={setSelectedSection} />
          <div className="w-full max-w-5xl ml-5 mx-auto rounded-lg">
            <h1 className="sm:text-2xl text-sm font-bold mb-4 text-gray-800">Traveloka Easy Reschedule</h1>

            <div className="bg-green-600 text-white flex justify-between p-4 rounded-xl mb-4 shadow-lg">
              <h1 className="text-2xl font-bold">Traveloka Easy Reschedule</h1>
              <div>
                <p className="text-white font-bold">Đổi lịch dễ như trở bàn tay.</p>
                <p className="text-white font-bold">Tìm hiểu thêm</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Vé điện tử & phiếu thanh toán hiện hành</h3>
              <div className="bg-white shadow-lg rounded-xl p-4 mt-2">
                {displayOrders.length === 0 ? (
                  <Text className="text-center text-gray-500">Không có đơn hàng nào.</Text>
                ) : (
                  <div>
                    {displayOrders.map((order) => (
                      <Card
                        key={order._id}
                        className="mb-4 shadow-md hover:shadow-lg transition duration-300"
                        style={{ borderRadius: '12px', backgroundColor: '#f9fafb' }}
                      >
                        <Title level={4} className="text-gray-800">Mã đặt chỗ: {order._id}</Title>
                        <Text>Ngày đặt: {new Date(order.bookingDate).toLocaleDateString()}</Text>
                        <Text className="text-gray-600 block mt-2">Mô tả Tour: {order.tour?.description}</Text>
                        <Text className="block mt-2">
                          Số lượng vé: {order.adultCount + order.childCount || 0}
                        </Text>
                        <Text className="text-lg font-bold block mt-2 text-green-600">
                          Tổng giá trị: {order.totalValue.toLocaleString()} VND
                        </Text>
                        <Text
                          className="text-lg font-bold block mt-2"
                          style={{ color: getStatusColor(order.status) }}
                        >
                          Trạng thái: {order.status === 'canceled' ? 'Đã hủy' : order.status}
                        </Text>

                        {/* Hiển thị nút "Thanh toán bằng PayPal" nếu có token và trạng thái phù hợp */}
                        {(order.status === 'pending' || order.status === 'processing') &&
                          order.paymentMethod === 'paypal' && paypalToken && (
                            <Button
                              type="primary"
                              size="middle"
                              className="max-w-xs mt-4"
                              block
                              onClick={() => capturePaypalPayment(order._id)}
                            >
                              Xác nhận thanh toán PayPal
                            </Button>
                          )}

                        {canCancelTour(order.status) && (
                          <Button
                            type="default"
                            danger
                            size="middle"
                            className="max-w-xs mt-4"
                            block
                            onClick={() => cancelOrder(order._id)}
                          >
                            Hủy Đơn Hàng
                          </Button>
                        )}

                        {canRefundTour(order.status, order.bookingDate) && (
                          <Button
                            type="default"
                            size="middle"
                            className="max-w-xs mt-4"
                            block
                            onClick={() => refundOrder(order._id)}
                          >
                            Hoàn Tiền
                          </Button>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
                <Pagination
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={todayOrders.length}
                  onChange={handlePageChange}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SetPlace;