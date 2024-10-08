// TourCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function TourCard({ title, link, price }) {
    const points = price !== 'N/A' ? Math.round(price * 0.02) : 0; // Tính điểm thưởng

    return (
        <div id="tourCardSection" className="border p-4 mb-4 rounded shadow flex items-center justify-between">
            <div>
                <h2 className="font-bold text-lg">{title}</h2>
                <a href={link} className="text-[#4CA771] block mt-1">Xem chi tiết</a>
                <div className="mt-2 flex items-center">
                    <span className="bg-[#4CA771] text-white py-1 items-start px-2 rounded-full">Easy Refund</span>
                </div>
            </div>
            <div className="text-center font-bold">
                <span className="font-bold text-xl">
                    {price !== 'N/A' ? `${price} VND` : 'N/A'}
                </span>
                <div className="text-sm text-gray-600">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-yellow-500 mr-1" />
                    Nhận {points} xu
                </div>
                <Link to='/bodyPay' className={`bg-[#4CA771] text-white py-2 px-4 rounded mt-2 block ${price !== 'N/A' ? '' : 'opacity-50 cursor-not-allowed'}`} disabled={price === 'N/A'}>
                    Chọn vé
                </Link>
            </div>
        </div>
    );
}

export default TourCard;
