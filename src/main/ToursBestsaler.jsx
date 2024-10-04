// import React, { useState, useEffect, useRef } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// function BestsalerTour() {
//   const [activeLocation, setActiveLocation] = useState(null);
//   const [locations, setLocations] = useState([]);
//   const [error, setError] = useState(null);
//   const sliderRef = useRef(null);

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 5,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: false,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//     ],
//   };

//   const nextSlide = () => {
//     sliderRef.current.slickNext();
//   };

//   const prevSlide = () => {
//     sliderRef.current.slickPrev();
//   };

//   // Fetch API data
//   useEffect(() => {
//     const fetchTourDetails = async () => {
//       try {
//         const response = await fetch("http://localhost:8081/tourdetails");
//         if (!response.ok) {
//           throw new Error("Không thể tải dữ liệu.");
//         }
//         const data = await response.json();
//         const processedLocations = data.reduce((acc, item) => {
//           const destinationName = item.destination.Destination;
//           const tour = {
//             name: item.tourID.tourname,
//             price: item.norPrice,
//             image: item.images[0],
//           };

//           const locationIndex = acc.findIndex(
//             (location) => location.name === destinationName
//           );
//           if (locationIndex !== -1) {
//             acc[locationIndex].tours.push(tour);
//           } else {
//             acc.push({ name: destinationName, tours: [tour] });
//           }

//           return acc;
//         }, []);

//         setLocations(processedLocations);
//         if (processedLocations.length > 0) {
//           setActiveLocation(processedLocations[0]); // Set the first location as active
//         }
//       } catch (error) {
//         console.error("Error fetching tour data:", error);
//         setError(error.message);
//       }
//     };

//     fetchTourDetails();
//   }, []);

//   if (error) {
//     return <p className="text-red-500">{error}</p>; // Show error message if any
//   }

//   return (
//     <div className="w-full flex justify-center pb-10">
//       <div className="max-w-[1280px] w-[90%] sm:w-[68%]">
//         <h1 className="font-bold text-2xl mb-4">Các Tour bán chạy</h1>

//         <div className="w-full mx-auto pt-10">
//           <div className="flex overflow-x-auto space-x-4 mb-6 hide-scrollbar">
//             {locations.length === 0 ? (
//               <p className="text-red-500">Không có dữ liệu tour.</p>
//             ) : (
//               locations.map((location, index) => (
//                 <button
//                   key={index}
//                   className={`px-4 py-2 flex-shrink-0 rounded-md cursor-pointer ${
//                     activeLocation && activeLocation.name === location.name
//                       ? "bg-[#4CA771] text-white font-bold"
//                       : "bg-[#FFFF] text-[#4CA771] font-bold"
//                   }`}
//                   onClick={() => setActiveLocation(location)}
//                 >
//                   {location.name}
//                 </button>
//               ))
//             )}
//           </div>

//           <div className="relative">
//             {locations.length === 0 ? (
//               <p className="text-red-500">Không có dữ liệu tour.</p>
//             ) : (
//               <Slider ref={sliderRef} {...settings}>
//                 {activeLocation?.tours.map((tour, index) => (
//                   <Link to="/ProDetail" key={index}>
//                     <div className="pr-2">
//                       <div className="block bg-white rounded-lg overflow-hidden h-72 hover:border-[#4CA771] cursor-pointer">
//                         <img
//                           src={tour.image}
//                           alt={tour.name}
//                           className="w-full h-40 object-cover"
//                         />
//                         <div className="p-4 h-32">
//                           <h3 className="sm:text-md text-[#013237] text-sm font-semibold">
//                             {tour.name}
//                           </h3>
//                           <p className="text-[#4CA771]">VND {tour.price}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </Slider>
//             )}

//             <button
//               className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 bg-white bg-opacity-50 p-2 rounded-full cursor-pointer"
//               onClick={prevSlide}
//             >
//               <FontAwesomeIcon icon={faChevronLeft} />
//             </button>
//             <button
//               className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 bg-white bg-opacity-50 p-2 rounded-full cursor-pointer"
//               onClick={nextSlide}
//             >
//               <FontAwesomeIcon icon={faChevronRight} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BestsalerTour;

// import React, { useEffect, useState } from 'react';

// const BestsalerTour = () => {
//   const [tours, setTours] = useState([]);
//   const [tourDetails, setTourDetails] = useState([]);
//   const [selectedTourTypeId, setSelectedTourTypeId] = useState("66f5792b4f5271b270fcee3f"); // Thay đổi ID theo yêu cầu của bạn

//   useEffect(() => {
//     // Lấy danh sách tours
//     const fetchTours = async () => {
//       const response = await fetch('http://localhost:8081/tours');
//       const data = await response.json();
//       setTours(data.data.tours);
//     };

//     // Lấy thông tin chi tiết tours
//     const fetchTourDetails = async () => {
//       const response = await fetch('http://localhost:8081/tourdetails');
//       const data = await response.json();
//       setTourDetails(data);
//     };

//     fetchTours();
//     fetchTourDetails();
//   }, []);

//   // Lọc tours theo tourtype
//   const filteredTours = tours.filter(tour => tour.tourtype._id === selectedTourTypeId);

//   return (
//     <div>
//       <h2>Các Tour Bán Chạy</h2>
//       <div className="tour-list">
//         {filteredTours.map(tour => {
//           // Lấy chi tiết tour tương ứng
//           const tourDetail = tourDetails.filter(detail => detail.tourID._id === tour._id);
          
//           return (
//             <div key={tour._id} className="tour-item">
//               <h3>{tour.tourname}</h3>
//               {tourDetail.length > 0 && tourDetail.map(detail => (
//                 <div key={detail._id}>
//                   <p>Giá: {detail.norPrice} VNĐ</p>
//                   <p>Địa chỉ: {detail.address}</p>
//                   <p>Thời gian: {detail.tourDuration} ngày</p>
//                   <img src={detail.images[0]} alt={tour.tourname} />
//                   <p>{detail.description}</p>
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function BestsalerTour() {
  const [tours, setTours] = useState([]);
  const [tourDetails, setTourDetails] = useState([]);
  const [selectedTourTypeId, setSelectedTourTypeId] = useState("66f598614f5271b270fcf4dd");
  const [activeLocation, setActiveLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

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

  // Fetch API data
  useEffect(() => {
    const fetchToursAndDetails = async () => {
      try {
        const [tourResponse, detailResponse] = await Promise.all([
          fetch("http://localhost:8081/tours"),
          fetch("http://localhost:8081/tourdetails"),
        ]);
  
        const tourData = await tourResponse.json();
        const detailData = await detailResponse.json();
        setTours(tourData.data.tours);
        setTourDetails(detailData);
  
        // Tạo danh sách các địa điểm dựa trên tourtype đã chọn
        const processedLocations = detailData.reduce((acc, detail) => {
          const tour = tourData.data.tours.find(t => t._id === detail.tourID._id);
          if (tour && tour.tourtype._id === selectedTourTypeId) {
            const destinationName = detail.destination?.Destination || "Unknown";
            const tourItem = {
              name: tour.tourname,
              price: detail?.norPrice || "N/A",
              image: detail?.images[0] || "default_image_url", // Sử dụng ảnh mặc định nếu không có
            };
  
            const locationIndex = acc.findIndex(location => location.name === destinationName);
            if (locationIndex !== -1) {
              acc[locationIndex].tours.push(tourItem);
            } else {
              acc.push({ name: destinationName, tours: [tourItem] });
            }
          }
          return acc;
        }, []);
  
        setLocations(processedLocations);
        if (processedLocations.length > 0) {
          setActiveLocation(processedLocations[0]); // Đặt địa điểm đầu tiên làm active
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
        setError(error.message);
      }
    };
  
    fetchToursAndDetails();
  }, [selectedTourTypeId]);
  
  if (error) {
    return <p className="text-red-500">{error}</p>; // Hiển thị thông báo lỗi nếu có
  }
  

  return (
    <div className="w-full flex justify-center pb-10">
      <div className="max-w-[1280px] w-[90%] sm:w-[68%]">
        <h1 className="font-bold text-2xl mb-4">Các Tour bán chạy</h1>

        <div className="w-full mx-auto pt-10">
          <div className="flex overflow-x-auto space-x-4 mb-6 hide-scrollbar">
            {locations.length === 0 ? (
              <p className="text-red-500">Không có dữ liệu tour.</p>
            ) : (
              locations.map((location, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 flex-shrink-0 rounded-md cursor-pointer ${
                    activeLocation && activeLocation.name === location.name
                      ? "bg-[#4CA771] text-white font-bold"
                      : "bg-[#FFFF] text-[#4CA771] font-bold"
                  }`}
                  onClick={() => setActiveLocation(location)}
                >
                  {location.name}
                </button>
              ))
            )}
          </div>

          <div className="relative">
            {locations.length === 0 ? (
              <p className="text-red-500">Không có dữ liệu tour.</p>
            ) : (
              <Slider ref={sliderRef} {...settings}>
                {activeLocation?.tours.map((tour, index) => (
                  <Link to="/ProDetail" key={index}>
                    <div className="pr-2">
                      <div className="block bg-white rounded-lg overflow-hidden h-72 hover:border-[#4CA771] cursor-pointer">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4 h-32">
                          <h3 className="sm:text-md text-[#013237] text-sm font-semibold">
                            {tour.name}
                          </h3>
                          <p className="text-[#4CA771]">VND {tour.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            )}

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
}

export default BestsalerTour;
