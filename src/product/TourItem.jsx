import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS for Skeleton

const TourItem = ({ tour, loading }) => {
  // Kiểm tra xem tour có hợp lệ không
  if (!tour) {
    return null; // Hoặc có thể trả về một thông báo khác
  }

  // Lấy ảnh đầu tiên từ mảng images
  const firstImage = tour.images && tour.images.length > 0 ? tour.images[0] : ''; // Cung cấp giá trị mặc định

  return (
    <Link to={`/ProDetail/${tour._id}`}> {/* Cập nhật đường dẫn với ID tour */}
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {loading ? (
          <>
            <Skeleton height={200} width="100%" />
            <div className="p-4">
              <Skeleton width="100%" height={20} className="mb-2" />
              <Skeleton width="80%" height={20} className="mb-2" />
              <Skeleton width="60%" height={20} className="mb-2" />
              <Skeleton width="40%" height={20} />
            </div>
          </>
        ) : (
          <>
            <img className="w-full h-auto sm:h-96 object-cover bg-cover" src={firstImage} alt={tour.title} />
            <div className="p-4">
              <div className="text-gray-600">{tour.location}</div>
              <div className="font-bold text-lg">{tour.title}</div>
              <div className="text-red-500 font-bold">{tour.price.toLocaleString()} VND</div>
              <div className="text-[#4CA771]">{tour.rating} ⭐</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default TourItem;
