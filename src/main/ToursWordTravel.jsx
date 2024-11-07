import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { fetchTours } from '../API/apiService';

const BestsalerTour = () => {
  const [tours, setTours] = useState([]);
  const [uniqueDestinations, setUniqueDestinations] = useState([]);
  const [activeLocation, setActiveLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tourTypeId, setTourTypeId] = useState("672ce5e90bcd6b65981569ad");
  const sliderRef = useRef(null);

  const getToursData = async () => {
    setLoading(true);
    try {
      const fetchedTours = await fetchTours();
      // Lọc tours ngay khi lấy dữ liệu
      const filteredTours = fetchedTours.filter(
        (tour) => tour.tourType === tourTypeId // Lọc theo tourType đã chọn
      );
      setTours(filteredTours);
      // Lấy danh sách các điểm đến duy nhất
      const destinations = filteredTours.reduce((acc, tour) => {
        if (!acc.find(dest => dest.name === tour.destination.name)) {
          acc.push(tour.destination);
        }
        return acc;
      }, []);
      setUniqueDestinations(destinations);
      setActiveLocation(destinations.length > 0 ? destinations[0] : null);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    getToursData();
  }, [tourTypeId]); 
  const filteredToursByLocation = tours.filter(
    (tour) => tour.destination?.name === activeLocation?.name
  );

  return (
    <div className="w-full flex justify-center pb-10">
      <div className="max-w-[1280px] w-[68%]">
        <h1 className="font-bold text-2xl">Tour theo chủ đề</h1>
        <p className="text-slate-500">Khám phá loại tour bạn yêu thích</p>
        <div className="w-full mx-auto pt-10">
          <div className="flex overflow-x-auto space-x-4 mb-6 hide-scrollbar">
            {loading ? (
              <Skeleton count={5} width={120} height={30} className="flex-shrink-0 rounded-md" />
            ) : (
              uniqueDestinations.map((destination, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 flex-shrink-0 rounded-md cursor-pointer ${
                    activeLocation?.name === destination.name
                      ? 'bg-[#4CA771] text-white font-bold'
                      : 'bg-[#FFFF] text-[#4CA771] font-bold'
                  }`}
                  onClick={() => setActiveLocation(destination)}
                >
                  {destination.name}
                </button>
              ))
            )}
          </div>

          <div className="relative">
            <Slider ref={sliderRef} {...settings}>
              {loading ? (
                Array(5)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="pr-2">
                      <div className="block bg-white rounded-lg overflow-hidden h-72">
                        <Skeleton height={160} className="w-full" />
                        <div className="p-4 h-32">
                          <Skeleton height={20} width={150} className="mb-2" />
                          <Skeleton height={20} width={100} />
                        </div>
                      </div>
                    </div>
                  ))
              ) : filteredToursByLocation.length === 0 ? (
                <div className="text-center w-full">Không có tour nào phù hợp.</div>
              ) : (
                filteredToursByLocation.map((tour, index) => (
                  <div key={index} className="pr-2">
                    <Link
                      to={`/ProDetail/${tour._id}`}
                      className="block bg-white rounded-lg overflow-hidden h-72 hover:border-[#4CA771] cursor-pointer"
                    >
                      <img
                        src={tour.images[0]}
                        alt={tour.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 h-32">
                        <h3 className="sm:text-md text-[#013237] text-sm font-semibold">
                          {tour.title}
                        </h3>
                        <p className="text-[#4CA771]">
                          {tour.price.toLocaleString()} VND
                        </p>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </Slider>

            <button
              className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 bg-white bg-opacity-50 p-2 rounded-full cursor-pointer"
              onClick={prevSlide}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 bg-white bg-opacity-50 p-2 rounded-full cursor-pointer"
              onClick={nextSlide}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestsalerTour;
