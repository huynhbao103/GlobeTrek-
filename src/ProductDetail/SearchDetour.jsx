import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-scroll'; // Import Link từ react-scroll

const SeachDetour = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-opacity-60 bg-[#d5ffe7] items-center justify-between flex shadow-md h-28 w-[80%] p-6 m-6">
      <div className='flex flex-col ml-4 justify-between'>
        <div className='flex flex-row'>
          {loading ? (
            <Skeleton width={100} height={20} />
          ) : (
            <p className='text-gray-800 text-sm mb-3'>Bắt đầu từ </p>
          )}
        </div>
        {loading ? (
          <Skeleton width={150} height={30} />
        ) : (
          <p className='font-bold text-lg text-[#4CA771]'>300.000 VND</p>
        )}
      </div>
      <div className='flex items-center justify-center'>
        {loading ? (
          <Skeleton width={100} height={40} borderRadius={4} />
        ) : (
          <Link
            to="tourCardSection" // ID của phần TourCard
            smooth={true}
            duration={500}
            offset={-340}
          >
            <button className='bg-[#4CA771] text-white px-4 py-2 rounded-md ml-3'>
              Tìm tour
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SeachDetour;
