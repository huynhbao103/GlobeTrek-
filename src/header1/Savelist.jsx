import React from 'react';
import Header from './Header';
import Footer from '../footer/Footer';
import tour from '../assets/tour1.png'
const savedItems = [
  {
    id: 1,
    title: "Khám phá 2 đảo, Sun World Hòn Thơm, Bữa trưa buffet tại Phú Quốc - Tour 1 ngày của Rooty Trip",
    rating: "10/10 (1)",
    location: "xã Của Dương",
    price: "1.300.000 VND",
    imageUrl: tour, // Thay thế bằng URL ảnh thực tế
  },
  {
    id: 2,
    title: "Tour du thuyền vịnh Hạ Long - 1 ngày",
    rating: "9.4/10 (106)",
    location: "Thành phố Hạ Long",
    price: "759.000 VND",
    imageUrl: tour, // Thay thế bằng URL ảnh thực tế
  },
];

const SavedList = () => {
  return (
    <div>
      <Header/>
    <div className="container mx-auto mt-40 p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách đã lưu</h1>
      <p className="mb-4">Nơi lưu giữ những sản phẩm yêu thích của bạn!</p>
      <div className="space-y-4">
        {savedItems.map(item => (
          <div key={item.id} className="p-4 border rounded-lg shadow">
            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover  rounded-md mb-2" />
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.rating}</p>
            <p className="text-sm text-gray-600">{item.location}</p>
            <p className="font-bold">{item.price} /pax</p>
          </div>
        ))}
      </div>
    </div>
    <div className='max-sm:hidden'>
      <Footer/>
    </div>
    </div>
  );
};

export default SavedList;