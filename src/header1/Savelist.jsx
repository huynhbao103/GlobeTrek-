import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from './Header';
import Footer from '../footer/Footer';
import { message, Modal } from 'antd';
import { fetchFavoriteTours, removeFavoriteTour } from '../API/apiService'; 
import LoadingLogin from '../../src/LoadingLogin'; 

const getUserId = () => {
  const storedUser = JSON.parse(localStorage.getItem('userNav'));
  return storedUser?._id || storedUser?.userId;
};

const SavedList = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
     
    
      setIsModalVisible(true); 
      return;
    }

    const loadFavoriteTours = async () => {
      try {
        const data = await fetchFavoriteTours(userId);
        setSavedItems(data);
      } catch (error) {
        console.error("Lỗi fetch:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteTours();
  }, []);

  const handleRemoveItem = async (tourId) => {
    const userId = getUserId();
  
    try {
      await removeFavoriteTour(userId, tourId);
      setSavedItems(savedItems.filter(item => item.tour._id !== tourId));
      message.success("Tour đã bị xóa khỏi danh sách yêu thích!");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleViewDetails = (tourId) => {
    navigate(`/ProDetail/${tourId}`); 
  };

  const handleLoginModalClose = () => {
    setIsModalVisible(false); // Đóng modal nếu người dùng đóng
  };

  if (loading) {
    return <div>
      <LoadingLogin/>
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-40 p-4">
        <h1 className="text-2xl font-bold mb-4">Danh sách đã lưu</h1>
        <p className="mb-4">Nơi lưu giữ những sản phẩm yêu thích của bạn!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-10  border-gray-300 rounded-lg col-span-3">
              <h2 className="text-xl font-semibold mb-4">Chưa có sản phẩm nào trong danh sách đã lưu.</h2>
              <p className="text-gray-600 mb-4">Hãy khám phá các tour yêu thích và lưu chúng lại!</p>
              <button 
                onClick={() => window.location.href = '/product-body'} 
                className="mt-2 bg-green-700 text-white px-4 py-2 "
              >
                Xem Tour
              </button>
            </div>
          ) : (
            savedItems.map(item => (
              <div key={item.tour._id} className="p-4  rounded-lg ">
                <img 
                  src={item.tour.images[0]} 
                  alt={item.tour.title} 
                  className="w-full h-40 object-cover rounded-md mb-2" 
                  loading="lazy" 
                />
                <h2 className="font-semibold">{item.tour.title}</h2>
                <p className="text-sm text-gray-600">{item.tour.rating}</p>
                <p className="text-sm text-gray-600">{item.tour.location}</p>
                <p className="font-bold">{item.tour.price.toLocaleString()} VND</p>
                <div className="flex justify-between mt-2">
                  <button 
                    onClick={() => handleRemoveItem(item.tour._id)} 
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Xóa
                  </button>
                  <button 
                    onClick={() => handleViewDetails(item.tour._id)} 
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Xem chi tiết tour
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className='max-sm:hidden'>
        <Footer />
      </div>
    </div>
  );
};

export default SavedList;
