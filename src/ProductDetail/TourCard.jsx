import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import easyRefundIcon from '../assets/easyRefundIcon.png';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TourCard({ title, price, points, link }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="tourCardSection" className="border p-4 mb-4 rounded shadow flex items-center justify-between">
      <div>
        <h2 className="font-bold text-lg">
          {loading ? <Skeleton width={150} /> : title}
        </h2>
        {loading ? (
          <Skeleton width={100} height={20} />
        ) : (
          <a href={link} className="text-[#4CA771] block mt-1">Xem chi tiết</a>
        )}
        <div className="mt-2 flex items-center">
         
          {loading ? (
            <Skeleton width={100} height={24} />
          ) : (
            <span className="bg-[#4CA771] text-white py-1 items-start px-2 rounded-full">Easy Refund</span>
          )}
        </div>
      </div>
      <div className="text-center font-bold">
        <span className="font-bold text-xl">
          {loading ? <Skeleton width={80} /> : `${price} VND`}
        </span>
        <div className="text-sm text-gray-600">
          {loading ? (
            <Skeleton width={100} height={20} />
          ) : (
            <>
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-yellow-500 mr-1" />
              Nhận {points} xu
            </>
          )}
        </div>
        {loading ? (
          <Skeleton width={100} height={40} />
        ) : (
          <Link to='/bodyPay' className="bg-[#4CA771] text-white py-2 px-4 rounded mt-2 block">Chọn vé</Link>
        )}
      </div>
    </div>
  );
}

export default TourCard;
