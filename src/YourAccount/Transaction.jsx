import React, { useEffect, useState } from 'react';
import { Select, Typography, Card, Pagination, message } from 'antd';
import SidebarMenu from './SidebarMenu';
import Header from '../header1/Header';
import Footer from '../footer/Footer';

const { Title, Text } = Typography;

const Transaction = () => {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const [dateFilter, setDateFilter] = useState(''); 
  const BASE_URL = import.meta.env.VITE_BASE_URL;

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
        setGroupedOrders(data);
        filterOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        message.error('Không thể tải dữ liệu đơn hàng');
      }
    };

    fetchOrders();
  }, []);

  const filterOrders = (orders) => {
    const filtered = Object.entries(orders).reduce((acc, [monthYear, orderList]) => {
      orderList.forEach(order => {
        const orderDate = new Date(order.bookingDate);
        const today = new Date();

        if (dateFilter === '90-days' || dateFilter === '3-months') {
          if ((today - orderDate) / (1000 * 60 * 60 * 24) <= 90) {
            acc.push(order);
          }
        } else if (dateFilter === '6-months') {
          if ((today - orderDate) / (1000 * 60 * 60 * 24) <= 180) {
            acc.push(order);
          }
        } else {
          acc.push(order);
        }
      });
      return acc;
    }, []);

    setFilteredOrders(filtered);
  };

  const handleFilterChange = (value) => {
    setDateFilter(value);
    filterOrders(groupedOrders);
  };

  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
    <Header/>
    <div className="w-full mt-36 h-auto">
      <div className="flex max-w-[1280px] justify-center mx-auto flex-row items-start pb-10">
        <SidebarMenu />
        
        <div className="w-full max-w-5xl ml-5 mx-auto rounded-lg bg-white p-6 shadow-lg">
          <Title level={2} className="mb-4 text-center">Lịch sử giao dịch của tôi</Title>
          
          <div className="mb-4 text-center">
            <Select 
              onChange={handleFilterChange} 
              value={dateFilter} 
              className="w-60"
              placeholder="Chọn thời gian"
            >
              <Select.Option value="">Tất cả</Select.Option>
              <Select.Option value="90-days">90 ngày trước</Select.Option>
              <Select.Option value="3-months">3 tháng trước</Select.Option>
              <Select.Option value="6-months">6 tháng trước</Select.Option>
            </Select>
          </div>

          {displayOrders.length === 0 ? (
            <Text className="text-center">Không có đơn hàng nào.</Text>
          ) : (
            <div>
              {displayOrders.map((order) => (
                <Card 
                  key={order._id} 
                  className="mb-4 shadow-md hover:shadow-lg transition duration-300"
                  style={{ borderRadius: '8px' }}
                >
                  <Title level={4}>Mã đặt chỗ: {order._id}</Title>
                  <Text>{order.tour?.description}</Text>
                  <Text className="text-lg font-bold block mt-2">
                    {order.totalValue.toLocaleString()} VND
                  </Text>
                  
                  {order.status === 'canceled' && (
                    <Text className="text-red-500">Đơn hàng đã bị hủy</Text>
                  )}
                </Card>
              ))}
              
              <Pagination 
                current={currentPage} 
                pageSize={itemsPerPage} 
                total={filteredOrders.length} 
                onChange={handlePageChange} 
                showSizeChanger={false} 
                className="mt-4 text-center"
              />
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Transaction;
