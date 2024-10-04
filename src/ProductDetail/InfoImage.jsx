import React, { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import tour from '../assets/tour.png';
import tour1 from '../assets/tour1.png';
import '../index.css';

const TravelTour = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const images = [tour, tour1, tour, tour1, tour, tour1, tour, tour1, tour, tour1];

  const openModal = (index) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  // Simulate image loading
  setTimeout(() => setLoading(false), 1000);

  return (
    <>
      <div className="relative container mx-auto mt-8 p-4">
        <h1 className="text-xl text-white font-bold mb-4 md:text-4xl max-md:text-[#013237]">
          {loading ? <Skeleton width={300} /> : 'Tour 3 đảo bằng Cano Nam Phú Quốc - 1 ngày'}
        </h1>
        <p className="text-white max-md:text-[#013237] text-lg mb-2">
          <span className="font-bold">
            {loading ? <Skeleton width={200} /> : '143 Trần Hưng Đạo, KP 7, TT Dương Đông, H.Phú Quốc, tỉnh Kiên Giang, Vietnam'}
          </span>
          <span className="text-[#4CA771] ml-2 cursor-pointer">
            {loading ? <Skeleton width={100} /> : 'Xem bản đồ'}
          </span>
        </p>
        <div className="flex">
          <p className="text-white max-md:text-[#013237] text-sm md:text-lg mb-2">
            {loading ? <Skeleton width={200} /> : 'Ngày tour gần nhất | Thứ, 13 Jul 2024'}
          </p>
          <p className="text-white max-md:text-[#013237] text-sm md:text-lg ml-3 mb-4">
            {loading ? <Skeleton width={200} /> : 'Thời gian tour | 8 Hours 30 Minutes'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative">
            {loading ? (
              <Skeleton height={256} />
            ) : (
              <img
                src={tour}
                alt="Tour Image"
                className="w-full h-64 object-cover rounded cursor-pointer"
                onClick={() => openModal(0)}
              />
            )}
            {loading ? null : (
              <div
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg rounded cursor-pointer"
                onClick={() => openModal(0)}
              >
                <i className="fas fa-play-circle text-4xl"></i>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <div className="relative" key={index}>
                {loading ? (
                  <Skeleton height={128} />
                ) : (
                  <img
                    src={image}
                    alt="Tour Image"
                    className={`w-96 h-32 object-cover rounded cursor-pointer ${index === 3 ? 'opacity-50' : ''}`}
                    onClick={() => openModal(index + 1)}
                  />
                )}
                {index === 3 && !loading && (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg bg-black bg-opacity-50 rounded cursor-pointer"
                    onClick={() => openModal(4)}
                  >
                    Xem Tất Cả Hình Ảnh
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <button
              className="absolute left-4 text-white text-2xl"
              onClick={prevImage}
            >
              &#10094;
            </button>
            <div className="relative">
              {loading ? (
                <Skeleton height={500} />
              ) : (
                <img
                  src={images[currentImage]}
                  alt="Tour Image"
                  className="w-96 h-auto max-h-screen rounded transition duration-500 ease-in-out transform"
                />
              )}
              <div className="absolute bottom-4 text-white w-full text-center">
                {loading ? <Skeleton width={50} /> : `${currentImage + 1} / ${images.length}`}
              </div>
            </div>
            <button
              className="absolute right-4 text-white text-2xl"
              onClick={nextImage}
            >
              &#10095;
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TravelTour;
