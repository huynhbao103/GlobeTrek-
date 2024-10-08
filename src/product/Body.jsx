import React, { useState, useEffect } from 'react';
import SortandGrid from './SortandGrid';
import ToursList from './TourList';
import '../index.css';
import Header from '../header1/Header';
import Footer from '../footer/Footer';
import { fetchTours } from '../API/apiService'; // Import hàm fetchTours từ apiService

const App = () => {
  const [tours, setTours] = useState([]);
  const [sortOption, setSortOption] = useState('popular');
  const [view, setView] = useState('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu từ API
    const loadTours = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const response = await fetchTours(); // Gọi hàm fetchTours từ apiService
        // Lọc những tour có isDissnable = false
        const filteredTours = response.filter(tour => tour.isDisabled); // Sử dụng ! để lấy tour không bị vô hiệu hóa
        setTours(filteredTours); // Cập nhật danh sách tours
      } catch (error) {
        console.error('Failed to fetch tours:', error);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    loadTours();
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedTours;
    if (option === 'priceLowHigh') {
      sortedTours = [...tours].sort((a, b) => a.price - b.price);
    } else if (option === 'priceHighLow') {
      sortedTours = [...tours].sort((a, b) => b.price - a.price);
    } else {
      sortedTours = [...tours];
    }
    setTours(sortedTours);
  };

  return (
    <>
      <div className="bg-[rgba(174,249,231,0.2)] mt-40">
        <Header />
        <div className="max-w-[1280px] w-[100%] mx-auto justify-center items-center">
          <div className="justify-center items-center">
            <SortandGrid onSortChange={handleSortChange} view={view} setView={setView} loading={loading} />
            <ToursList tours={tours} view={view} loading={loading} />
          </div>
        </div>
        <div className="max-sm:hidden">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;