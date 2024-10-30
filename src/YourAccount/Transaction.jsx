import React, { useEffect, useState } from 'react';
import { Select, Typography, Card, Pagination, message } from 'antd';

const { Title, Text } = Typography;

const Transaction = () => {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Số đơn hàng hiển thị trên mỗi trang
  const [dateFilter, setDateFilter] = useState(''); // Lọc theo thời gian

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('userNav')); 
        const accessToken = user?.accessToken;

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch('http://localhost:8081/orders/api/list', {
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

  // Phân trang
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xác định các đơn hàng hiển thị trên trang hiện tại
  const displayOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>   
     <div className="p-6 bg-white shadow-md rounded-lg">
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
              <Text className="text-lg font-bold block mt-2">{order.totalValue.toLocaleString()} VND</Text>
              
              {order.status === 'canceled' && (
                <Text className="text-red-500">Đơn hàng đã bị hủy</Text>
              )}
            </Card>
          ))}
          
          {/* Phân trang */}
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
    </>

  );
};

export default Transaction;
