import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Thêm useParams để lấy ID từ URL
import Inforimage from './InfoImage.jsx';
import '../index.css';
import TourInfo from './TourInfo.jsx';
import Mapview from './Mapview.jsx';
import SearchDetour from './SearchDetour.jsx';
import ReadMoreText from './ReadMoreText.jsx';
import Calendar from './Calendar.jsx';
import Header from '../header1/Header.jsx';
import Footer from '../footer/Footer.jsx';
import GoogleMap from './GoogleMap.jsx';
import PriceTour from './PriceTour.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchTourById } from '../API/apiService.js'; // Import hàm fetchTourById từ dịch vụ API

function Bodyprodetail() {
  const { id } = useParams(); 
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTour = async () => {
      try {
        const tourData = await fetchTourById(id); // Gọi API để lấy thông tin tour
        setTour(tourData);
      } catch (error) {
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };
    getTour();
  }, [id]); // Thực hiện lại khi ID thay đổi

  return (
    <div>
      <Header />
      <div className="background-cover max-md:hidden w-full"></div>
      <div className="max-w-[1280px] mx-auto">
        <div className="mt-40">
          {loading ? (
            <Skeleton count={5} height={200} /> // Hiển thị loading skeleton khi đang tải
          ) : (
            <>
              <Inforimage tour={tour} /> {/* Truyền thông tin tour vào các thành phần */}
              <div className="flex justify-center items-center max-md:flex-col">
                <TourInfo tour={tour} />
                <Mapview tour={tour} />
                <SearchDetour tour={tour} />
              </div>
              <ReadMoreText tour={tour} />
              <Calendar />
              <GoogleMap tour={tour} />
              <PriceTour tour={tour} />
            </>
          )}
          <div className="max-sm:hidden"></div>
        </div>
      </div>
      <div className="max-sm:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default Bodyprodetail;
