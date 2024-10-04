import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TourInfo = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100 flex shadow-md h-28 w-[80%] p-6 m-6 cursor-pointer">
      {loading ? (
        <Skeleton circle={true} height={64} width={64} className="bg-[#165448]" />
      ) : (
        <div className='bg-[#165448] flex rounded-full w-16 h-16 justify-center items-center'>
          <p className='text-white font-bold text-3xl'>9.2</p>
        </div>
      )}
      <div className='flex flex-col justify-center ml-4'>
        <div className='flex flex-row'>
          {loading ? (
            <Skeleton width={50} height={20} />
          ) : (
            <>
              <p className='text-[#35845F] font-bold text-lg'>Tốt</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-[#35845F] font-bold"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </>
          )}
        </div>
        {loading ? (
          <Skeleton width={100} height={16} />
        ) : (
          <p className='font-bold text-md'>từ 26 đánh giá</p>
        )}
      </div>
    </div>
  );
};

export default TourInfo;
