import React from 'react';

const bookings = [
  { id: '1165379195', date: 'tháng 07 2024', price: '1.300.000 VND', description: 'Khám phá 2 đảo, Sun World Hòn Thơm, Bữa trưa buffet tại Phú Quốc - Tour 1 ngày của Rooty Trip' },
  { id: '1165346583', date: 'tháng 07 2024', price: '1.300.000 VND', description: 'Khám phá 2 đảo, Sun World Hòn Thơm, Bữa trưa buffet tại Phú Quốc - Tour 1 ngày của Rooty Trip' },
  { id: '1165346461', date: 'tháng 07 2024', price: '1.300.000 VND', description: 'Khám phá 2 đảo, Sun World Hòn Thơm, Bữa trưa buffet tại Phú Quốc - Tour 1 ngày của Rooty Trip' },
  { id: '1165346416', date: 'tháng 07 2024', price: '1.300.000 VND', description: 'Khám phá 2 đảo, Sun World Hòn Thơm, Bữa trưa buffet tại Phú Quốc - Tour 1 ngày của Rooty Trip' },
  { id: '1165346389', date: 'tháng 07 2024', price: '1.300.000 VND', description: 'Khám phá 2 đảo, Sun World Hòn Thơm, Bữa trưa buffet tại Phú Quốc - Tour 1 ngày của Rooty Trip' },
];

const Transaction = () => {
  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Xem tất cả vé máy bay và phiếu thanh toán trong Đặt chỗ của tôi</h1>
      <div className="mb-4 flex space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">90 ngày qua</button>
        <button className="bg-gray-200 px-4 py-2 rounded">thg 6 2024</button>
        <button className="bg-gray-200 px-4 py-2 rounded">thg 5 2024</button>
        <button className="bg-gray-200 px-4 py-2 rounded">Ngày tùy chọn</button>
        <button className="text-blue-500">Bộ lọc</button>
      </div>
      <h2 className="text-lg font-semibold">tháng 07 2024</h2>
      <ul className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <li key={booking.id} className="py-4">
            <p className="font-medium">Mã đặt chỗ Traveloka {booking.id}</p>
            <p>{booking.description}</p>
            <p className="text-lg font-bold">{booking.price}</p>
            <button className="text-blue-500">Xem chi tiết</button>
            <p className="text-red-500">Quá thời hạn quy định</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transaction;