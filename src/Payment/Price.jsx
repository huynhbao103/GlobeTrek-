import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Price = ({ adultCount, childCount, prices }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [bookingData, setBookingData] = useState({});

  // Lấy dữ liệu từ localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  // Input validation
  const adultPrice = prices.adultPrice || bookingData.adultPrice || 0;
  const childPrice = prices.childPrice || bookingData.childPrice || 0;
  const totalPrice = (adultCount * adultPrice) + (childCount * childPrice);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className='mt-4'>
      <h3 className="text-xl font-bold mb-2">Tóm tắt</h3>
      <div className="bg-white p-4 rounded-lg">
        <div
          className="font-bold text-2xl mt-4 flex shadow-sm justify-between cursor-pointer"
          onClick={toggleDetails}
        >
          Giá bạn trả:
          <div className="flex items-center">
            <span className="text-[#4CA771]">{totalPrice.toLocaleString()} VND</span>
            {showDetails ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${showDetails ? 'max-h-40' : 'max-h-0'}`}>
          <p className="mt-2 text-sm">{adultCount} người lớn x {adultPrice.toLocaleString()} VND</p>
          <p className="text-sm">{childCount} trẻ em x {childPrice.toLocaleString()} VND</p>
        </div>
      </div>
    </div>
  );
};

// Prop types definition
Price.propTypes = {
  adultCount: PropTypes.number.isRequired,
  childCount: PropTypes.number.isRequired,
  prices: PropTypes.shape({
    adultPrice: PropTypes.number.isRequired,
    childPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default Price;
