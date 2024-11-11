import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Pagination, Button, message } from 'antd';
import SidebarMenu from './SidebarMenu';
import Header from '../header1/Header';
import Footer from '../footer/Footer';

const { Title, Text } = Typography;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SetPlace = ({ setSelectedSection }) => {
  const [todayOrders, setTodayOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
      twoDaysAgo.setDate(today.getDate() - 2); // Lấy ngày 2 ngày trước

      const todayISOString = today.toISOString().split('T')[0];
      const twoDaysAgoISOString = twoDaysAgo.toISOString().split('T')[0];

      // Lọc các đơn hàng được tạo trong 1-2 ngày gần nhất
      const filteredOrders = Object.values(orders).flat().filter(order => {
        const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0]; // Ngày tạo đơn hàng
        return createdAtDate === todayISOString || createdAtDate === twoDaysAgoISOString;
      });

      // Sắp xếp các đơn hàng theo ngày tạo (mới nhất lên đầu)
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

  // Xử lý màu sắc dựa trên trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue'; 
      case 'paid': return 'green'; 
      case 'canceled': return 'red'; 
      default: return 'gray'; 
    }
  };

  const canCancelTour = (bookingDate) => {
    const currentDate = new Date(); // Ngày hiện tại
    currentDate.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00 để chỉ so sánh ngày
  
    const bookingDateObj = new Date(bookingDate); // Ngày đặt từ đơn hàng
    bookingDateObj.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00 để chỉ so sánh ngày
  
    // Log để kiểm tra giá trị ngày hiện tại và ngày đặt
    console.log("Ngày hiện tại:", currentDate);
    console.log("Ngày đặt (bookingDateObj):", bookingDateObj);
  
    const timeDifference = bookingDateObj - currentDate;
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 ngày tính bằng millisecond
  
    return timeDifference > twoDaysInMillis; // Kiểm tra có còn đủ 2 ngày để hủy không
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
                    {displayOrders.map((order) => {
                      const bookingDate = new Date(order.bookingDate); // Lấy ngày đặt cho mỗi đơn hàng
                      return (
                        <Card 
                          key={order._id} 
                          className="mb-4 shadow-md hover:shadow-lg transition duration-300"
                          style={{ borderRadius: '12px', backgroundColor: '#f9fafb' }}
                        >
                          <Title level={4} className="text-gray-800">Mã đặt chỗ: {order._id}</Title>
                          <Text>Ngày đặt: {bookingDate.toLocaleDateString()}</Text>
                          <Text className="text-gray-600 block mt-2">Mô tả Tour: {order.tour?.description}</Text>
                          <Text className="text-lg font-bold block mt-2 text-green-600">
                            Tổng giá trị: {order.totalValue.toLocaleString()} VND
                          </Text>
                          <Text 
                            className="text-lg font-bold block mt-2"
                            style={{ color: getStatusColor(order.status) }}
                          >
                            Trạng thái: {order.status === 'canceled' ? 'Đã hủy' : order.status === 'pending' ? 'Đang chờ' : order.status === 'processing' ? 'Đang xử lý' : 'Đã thanh toán'}
                          </Text>

                          {order.status === 'paid' && canCancelTour(order.bookingDate) ? (
  <Button type="primary" danger size="middle" className="max-w-xs mt-4" block>
    Hủy Tour & Hoàn Tiền
  </Button>
) : order.status === 'paid' ? (
  <Text className="text-red-500 font-semibold mt-4">Không thể hủy tour vì ngày đi đã cách 2 ngày trước</Text>
) : (
  <Button type="default" danger size="middle" className="max-w-xs mt-4" block>
    Hủy Đơn Hàng
  </Button>
)}

                        </Card>
                      );
                    })}

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
