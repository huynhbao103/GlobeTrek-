import React, { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import iconlocation from '../assets/iconlocation.svg';
import clock from '../assets/clock.png';
import { useParams } from 'react-router-dom';
import { fetchTourById, toggleFavoriteTour, checkIfFavorite } from '../API/apiService';
import { PushpinOutlined } from '@ant-design/icons';
import '../index.css';
import { message } from "antd";

const TravelTour = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const loadTour = async () => {
      try {
        const tourData = await fetchTourById(id);
        setTour(tourData);
        setImages(tourData.images);
        setVideos(tourData.videos);

        const userId = getUserId();
        if (userId) {
          const favoriteStatus = await checkIfFavorite(userId, tourData._id);
          setIsFavorite(favoriteStatus);
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [id]);

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

  const handleSaveTour = async () => {
    setFavoriteLoading(true);
    try {
      const userId = getUserId();
      const result = await toggleFavoriteTour(userId, tour._id, !isFavorite);
      setIsFavorite(result.isFavorite);
      if (result.isFavorite) {
        message.success("Thêm tour yêu thích thành công");
      } else {
        message.success("Xóa tour khỏi yêu thích thành công");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };


  const getUserId = () => {
    const storedUser = JSON.parse(localStorage.getItem('userNav'));
    return storedUser?._id || storedUser?.userId;
  };

  return (
    <div className="relative container mx-auto mt-8 p-4">
      <div className="mt-4">
        <button
          onClick={handleSaveTour}
          disabled={favoriteLoading}
          className={`px-4 py-2 rounded ${isFavorite ? 'bg-green-600 text-white' : 'bg-white text-black'} hover:bg-green-700`}
        >
          <PushpinOutlined />
        </button>
      </div>
      <h1 className="text-xl text-white font-bold mb-4 md:text-4xl max-md:text-[#013237]">
        {loading ? <Skeleton width={300} /> : tour?.title}
      </h1>
      <p className="text-white max-md:text-[#013237] text-lg mb-2">
        <div className="flex flex-row">
          <img src={iconlocation} className="pr-2" />
          {loading ? <Skeleton width={200} /> : tour?.location}
        </div>
      </p>
      <div className="flex gap-4 mb-4">
        <img src={clock} className="max-w-8 max-h-6 filter grayscale" />
        <p className="text-white max-md:text-[#013237] text-sm md:text-lg mb-4">
          {loading ? <Skeleton width={200} /> : `Thời gian tour | ${tour?.duration} days`}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="relative mb-4">
          {loading ? (
            <Skeleton height={256} />
          ) : (
            videos.length > 0 && (
              <div>
                <video controls className="w-full h-full object-cover rounded">
                  <source src={videos[0]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">

          <div className="relative">
            {loading ? (
              <Skeleton height={256} />
            ) : (
              images.length > 0 && (
                <img
                  src={images[0]}
                  alt="Tour Image"
                  className="w-full h-64 object-cover rounded cursor-pointer"
                  onClick={() => openModal(0)}
                />
              )
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

          <div className="grid grid-cols-2 gap-4 mb-4">
            {loading ? (
              <Skeleton count={2} height={128} />
            ) : (
              images.slice(1, 3).map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt="Tour Image"
                    className="w-full h-64 object-cover rounded cursor-pointer"
                    onClick={() => openModal(index + 1)}
                  />
                </div>
              ))
            )}
          </div>


          {images.length > 3 && (
            <div
              className="flex items-center justify-center text-white font-bold text-lg bg-black bg-opacity-50 rounded cursor-pointer"
              onClick={() => openModal(4)}
            >
              Xem Tất Cả Hình Ảnh
            </div>
          )}
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
                className="w-auto h-auto max-h-screen rounded transition duration-500 ease-in-out transform"
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
  );
};

export default TravelTour;
