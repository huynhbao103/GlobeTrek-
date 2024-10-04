import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import QC1 from '../assets/QC1.png';
import QC2 from '../assets/QC2.png';

const locations = [
  {
    tours: [
      { image: QC1 },
      { image: QC2 }
    ]
  }
];

function ToursWordTravel() {
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time if needed
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <div className='sm:max-w-[1280px] flex mx-auto items-center justify-center pb-10'>
        <div className='w-full mx-auto'>
          <div className='w-[80%] mx-auto pt-10'>
            <div className='relative'>
              {loading ? (
                <Skeleton
                  className='w-full h-[300px] rounded-lg'
                  count={1}
                />
              ) : (
                <Slider ref={sliderRef} {...settings}>
                  {locations[0].tours.map((tour, index) => (
                    <div key={index} className='pr-2'>
                      <div className='rounded-lg overflow-hidden h-auto'>
                        <img src={tour.image} alt={`Tour ${index + 1}`} className='w-full rounded-lg h-auto object-cover' />
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
              {!loading && (
                <>
                  <button className='absolute top-1/2 transform -translate-y-1/2 left-0 z-10 bg-white bg-opacity-50 p-2 rounded-full' onClick={prevSlide}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button className='absolute top-1/2 transform -translate-y-1/2 right-0 z-10 bg-white bg-opacity-50 p-2 rounded-full' onClick={nextSlide}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToursWordTravel;
