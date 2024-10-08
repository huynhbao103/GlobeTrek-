import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {  useParams } from 'react-router-dom'; // Sử dụng useParams để lấy ID từ URL
import { Link } from 'react-scroll'; // Import Link từ react-scroll
import { fetchTourById } from '../API/apiService';

const SeachDetour = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState(null);
  const [error, setError] = useState(null); // Khai báo biến lỗi

  useEffect(() => {
    const loadTour = async () => {
      setLoading(true);
      try {
        const tourData = await fetchTourById(id); // Lấy dữ liệu tour
        if (!tourData) {
          throw new Error('Tour not found');
        }
        setTour(tourData); // Cập nhật dữ liệu tour
      } catch (error) {
        setError('Error fetching tour: ' + error.message); // Cập nhật lỗi nếu có
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTour(); // Gọi hàm tải dữ liệu tour
  }, [id]); // Chỉ gọi lại khi id thay đổi

  // Hiển thị loading hoặc lỗi nếu có
  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className="text-red-500">
      {error}
      <button onClick={() => loadTour()} className="ml-2 text-blue-500">Try Again</button>
    </div>
  );

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
          <p className='font-bold text-lg text-[#4CA771]'>{tour?.price} VND</p>
        )}
      </div>
      <div className='flex items-center justify-center'>
        {loading ? (
          <Skeleton width={100} height={40} borderRadius={4} />
        ) : (
          <Link
            to="tourCardSection" 
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
