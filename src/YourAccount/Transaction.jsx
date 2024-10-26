import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Transaction = () => {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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
        filterOrders(data); // Lọc đơn hàng ngay sau khi nhận dữ liệu
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Hàm lọc đơn hàng theo ngày
  const filterOrders = (orders) => {
    const filtered = Object.entries(orders).reduce((acc, [monthYear, orderList]) => {
      orderList.forEach(order => {
        const orderDate = new Date(order.bookingDate);
        const today = new Date();
        
        // Kiểm tra theo từng tùy chọn lọc
        if (dateFilter === '90-days') {
          if ((today - orderDate) / (1000 * 60 * 60 * 24) <= 90) {
            acc.push(order);
          }
        } else if (dateFilter === '3-months') {
          if ((today - orderDate) / (1000 * 60 * 60 * 24) <= 90) {
            acc.push(order);
          }
        } else if (dateFilter === '6-months') {
          if ((today - orderDate) / (1000 * 60 * 60 * 24) <= 180) {
            acc.push(order);
          }
        } else {
          acc.push(order); // Nếu không có lọc thì thêm tất cả
        }
      });
      return acc;
    }, []);

    setFilteredOrders(filtered);
  };

  // Xử lý thay đổi filter
  const handleFilterChange = (event) => {
    setDateFilter(event.target.value);
    filterOrders(groupedOrders);
  };

  // Phân trang
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Xác định các đơn hàng hiển thị trên trang hiện tại
  const displayOrders = filteredOrders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Lịch sử giao dịch của tôi</h1>

      {/* Chọn bộ lọc thời gian */}
      <div className="mb-4">
        <label className="mr-2">Lọc theo thời gian:</label>
        <select onChange={handleFilterChange} value={dateFilter} className="border rounded p-2">
          <option value="">Tất cả</option>
          <option value="90-days">90 ngày trước</option>
          <option value="3-months">3 tháng trước</option>
          <option value="6-months">6 tháng trước</option>
        </select>
      </div>

      {displayOrders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div>
          {displayOrders.map((order) => (
            <div key={order._id} className="mb-6">
              <h2 className="text-lg font-semibold">Mã đặt chỗ: {order._id}</h2>
              <p>{order.tour?.description}</p>
              <p className="text-lg font-bold">{order.totalValue} VND</p>
              
              {order.status === 'canceled' && (
                <p className="text-red-500">Đơn hàng đã bị hủy</p>
              )}
              <hr className='w-full h-full'/>
            </div>
          ))}
          
          {/* Phân trang */}
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      )}
    </div>
  );
};

export default Transaction;
