/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Pagination, Button, message } from 'antd';
import SidebarMenu from './SidebarMenu';
import Header from '../header1/Header';
import Footer from '../footer/Footer';
import { Pointer } from "pointer-wallet";
const secretKey = import.meta.env.VITE_POINTER_SECRET_KEY;
const pointerPayment = new Pointer(secretKey); 

const { Title, Text } = Typography;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SetPlace = ({ setSelectedSection }) => {
  const [todayOrders, setTodayOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

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
        filterRecentOrders(data); // Lọc các đơn hàng gần đây
      } catch (error) {
        console.error('Error fetching orders:', error);
        message.error('Không thể tải dữ liệu đơn hàng');
      }
    };

    const filterRecentOrders = (orders) => {
      const today = new Date();
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);

      const todayISOString = today.toISOString().split('T')[0];
      const twoDaysAgoISOString = twoDaysAgo.toISOString().split('T')[0];

      const filteredOrders = Object.values(orders).flat().filter(order => {
        const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
        return createdAtDate === todayISOString || createdAtDate === twoDaysAgoISOString;
      });

      filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setTodayOrders(filteredOrders);
    };

    fetchOrders();
  }, []);

  const handleClick = () => {
    setSelectedSection('Transaction');
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
  const cancelOrder = async (orderId) => {
    try {
      const response = await pointerPayment.cancelOrder(orderId);
      console.log('Order canceled successfully:', response);
      message.success('Hủy đơn hàng thành công');
      setTodayOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error canceling order:', error.message);
      message.error('Không thể hủy đơn hàng');
    }
  };
  return (
    <>
      <Header />
      <div className='w-full mt-36 h-auto'>
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
                      </Card>
                    ))}

                    <Pagination
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={todayOrders.length}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                      className="mt-4 text-center"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700">Lịch sử giao dịch</h3>
              <div className="bg-white shadow-lg rounded-xl p-4 mt-2 text-center">
                <p>
                  Xem <Link to='/Transaction'><span className="text-green-500 font-semibold cursor-pointer" onClick={handleClick}>Lịch sử giao dịch</span></Link> của bạn
                </p>
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
