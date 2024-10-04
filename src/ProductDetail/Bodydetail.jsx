import React, { useState, useEffect } from 'react'; // Thêm import useState và useEffect
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

function Bodyprodetail() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập việc tải dữ liệu
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Thay đổi thời gian nếu cần
  }, []);

  return (
    <div>
      <Header />
  
        <div className="background-cover max-md:hidden w-full"></div>
    
      <div className="max-w-[1280px] mx-auto">
        <div className="mt-40">
          <Inforimage />

          <div className="flex justify-center items-center max-md:flex-col">
            <TourInfo />
            <Mapview />
            <SearchDetour />
          </div>

          <ReadMoreText />

          <Calendar />

          <GoogleMap />

          <PriceTour />

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
