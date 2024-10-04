import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import tour1 from '../assets/tour1.png';
import SidebarCalendar from '../ProductDetail/SidebarCalendar';
import { useDate } from '../Context/DateContext';
import backicon from '../assets/backicon.png';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests

const TourBooking = () => {
  const { selectedDate, setSelectedDate } = useDate();
  const [adultCount, setAdultCount] = useState(1); // Initialize with 1
  const [childCount, setChildCount] = useState(0); // Initialize with 0
  const [prices, setPrices] = useState({ adultPrice: 3000000, childPrice: 2000000 });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch price data from API
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/prices'); // URL of your API
        setPrices(response.data.prices);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching prices:', error);
        setLoading(false); // Also set loading to false on error
      }
    };

    fetchPrices();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const increaseCount = (setter, count) => {
    if (adultCount + childCount < 30) {
      setter(count + 1);
      setErrorMessage('');
    } else {
      setErrorMessage('Tổng số vé không được vượt quá 30 vé.');
    }
  };

  const decreaseCount = (setter, count, isAdult = false) => {
    if (isAdult) {
      // For adult tickets, do not allow decrease below 1
      if (count > 1) {
        setter(count - 1);
        setErrorMessage('');
      }
    } else {
      // For child tickets, allow decrease to 0
      if (count > 0) {
        setter(count - 1);
        setErrorMessage('');
      }
    }
  };

  // Calculate total price based on selected counts and prices
  const totalPrice = (adultCount * prices.adultPrice) + (childCount * prices.childPrice);

  const handleBooking = () => {
    // Create an object with ticket details
    const bookingData = {
      adultCount,
      childCount,
      totalPrice
    };
  
    // Save to local storage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
  
    // Redirect to BookingForm page
    window.location.href = '/BookingForm'; // Redirect to BookingForm page
  };

  return (
    <div className='max-w-7xl'>
      <div className="p-4 mx-auto">
        <div className="w-[100%] mx-auto items-center mt-8 max-sm:mb-4">
          <Link to='/ProDetail' className='sm:mb-5 shadow-md'>
            <img className='w-4 h-4' src={backicon} alt="Back" />
          </Link>
        </div>

        <div className="sm:flex w-[100%] sm:w-full mx-auto">
          {/* Tour Information Section */}
          <div className="sm:w-1/3 sm:mt-16 sm:shadow-xl rounded-md">
            {loading ? (
              <Skeleton height={200} />
            ) : (
              <img src={tour1} alt="Tour" className="w-full rounded-lg" />
            )}
            <div className="ml-4">
              <h2 className="text-xl font-bold mb-2">
                {loading ? <Skeleton width={300} /> : 'Tour ghép cho tối đa 40 khách - Khởi hành TPHCM cùng Vietjet Air'}
              </h2>
              <p>{loading ? <Skeleton width={150} /> : 'Không thể hoàn tiền'}</p>
              <button className="mt-4 bg-green-100 text-green-500 py-2 px-4 rounded-lg">
                {loading ? <Skeleton width={150} height={30} /> : 'Xem thông tin vé'}
              </button>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="sm:w-2/3 p-4 ml-4">
            <div className="mt-4">
              <div className="w-full justify-center items-center">
                {loading ? (
                  <Skeleton height={300} />
                ) : (
                  <SidebarCalendar selectedDate={selectedDate} onDateChange={handleDateChange} />
                )}
              </div>
              <div className="mt-4 bg-green-100 p-4 rounded-lg">
                <p className="text-lg">{loading ? <Skeleton width={200} /> : 'Ngày tham quan đã chọn'}</p>
                <h3 className="text-xl font-bold">
                  {loading ? <Skeleton width={250} /> : (selectedDate ? selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Chưa chọn ngày')}
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold">{loading ? <Skeleton width={150} /> : 'Người lớn'}</h4>
                  <p className="text-green-500">
                    {loading ? <Skeleton width={80} /> : prices.adultPrice.toLocaleString()} {loading ? <Skeleton width={50} /> : 'VND'}
                  </p>
                  <p className="text-gray-500">{loading ? <Skeleton width={150} /> : 'Nhận 14.535 xu'}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-lg"
                    onClick={() => decreaseCount(setAdultCount, adultCount, true)}
                  >
                    {loading ? <Skeleton width={20} height={20} /> : '-'}
                  </button>
                  <span className="mx-2">{loading ? <Skeleton width={30} /> : adultCount}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-lg"
                    onClick={() => increaseCount(setAdultCount, adultCount)}
                  >
                    {loading ? <Skeleton width={20} height={20} /> : '+'}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h4 className="text-xl font-bold">{loading ? <Skeleton width={150} /> : 'Trẻ em'}</h4>
                  <p className="text-green-500">
                    {loading ? <Skeleton width={80} /> : prices.childPrice.toLocaleString()} {loading ? <Skeleton width={50} /> : 'VND'}
                  </p>
                  <p className="text-gray-500">{loading ? <Skeleton width={150} /> : 'Nhận 14.535 xu'}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-lg"
                    onClick={() => decreaseCount(setChildCount, childCount)}
                  >
                    {loading ? <Skeleton width={20} height={20} /> : '-'}
                  </button>
                  <span className="mx-2">{loading ? <Skeleton width={30} /> : childCount}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-lg"
                    onClick={() => increaseCount(setChildCount, childCount)}
                  >
                    {loading ? <Skeleton width={20} height={20} /> : '+'}
                  </button>
                </div>
              </div>
            </div>
            {errorMessage && (
              <div className="mt-4 p-4 bg-red-100 text-red-500 rounded-lg">
                {loading ? <Skeleton width={200} height={30} /> : errorMessage}
              </div>
            )}
            <div className="mt-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold">
                {loading ? <Skeleton width={150} /> : totalPrice.toLocaleString()} {loading ? <Skeleton width={50} /> : 'VND'}
              </h3>
              <Link 
                to='/BookingForm' 
                className="bg-[#4CA771] font-bold text-white py-2 px-4 rounded-lg"
                onClick={handleBooking}
              >
                {loading ? <Skeleton width={100} height={30} /> : 'Đặt ngay'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourBooking;
