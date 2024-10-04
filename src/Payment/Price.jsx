import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Price = ({ adultCount, childCount, prices }) => {
  const [showDetails, setShowDetails] = useState(false);
  const totalPrice = (adultCount * prices.adultPrice) + (childCount * prices.childPrice);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className='mt-4 '>
       <h3 className="text-xl font-bold mb-2">Tóm tắt </h3>
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

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDetails ? 'max-h-40' : 'max-h-0'}`}>
        <div className="mt-4">
          <div className="mb-2 flex justify-between">
            <div className="font-semibold">Người lớn: <span>({adultCount}x)</span> </div> 
            {prices.adultPrice.toLocaleString()} VND
          </div>

          <div className="mb-2 flex justify-between">
            <div className="font-semibold">Trẻ em: <span>({childCount}x)</span> </div> 
            {prices.childPrice.toLocaleString()} VND
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Price;
