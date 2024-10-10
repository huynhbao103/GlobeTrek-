// import React, { useState, useEffect } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import ModalCalendar from './ModalCalendar';
// import SidebarCalendar from './SidebarCalendar';
// import TourCard from './TourCard';
// import { useDate } from '../Context/DateContext'; 
// import { fetchTourById } from '../API/apiService'; 

// function Calendar() {
//     const { selectedDate, setSelectedDate } = useDate(); // Lấy ngày đã chọn từ context
//     const [showModal, setShowModal] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [tourPrice, setTourPrice] = useState(null); 

//     // Lấy tour ID từ URL
//     const selectedTourId = window.location.pathname.split('/').pop(); 

//     // Fetch giá tour khi component mount
//     useEffect(() => {
//         const fetchTourData = async () => {
//             try {
//                 const tour = await fetchTourById(selectedTourId); // Gọi hàm fetchTourById để lấy dữ liệu tour
//                 setTourPrice(tour.price); // Lưu giá của tour vào state
//             } catch (error) {
//                 console.error('Error fetching tour data:', error);
//             }
//         };

//         fetchTourData();
//     }, [selectedTourId]);

//     // Simulate loading delay
//     useEffect(() => {
//         const timer = setTimeout(() => setLoading(false), 1000);
//         return () => clearTimeout(timer);
//     }, []);

//     // Mở modal
//     const openModal = () => setShowModal(true);

//     // Đóng modal
//     const closeModal = () => setShowModal(false);

//     // Xử lý thay đổi ngày từ modal và cập nhật giá tour
//     const handleDateChange = (date, adjustedPrice) => {
//         setSelectedDate(date);
//         setTourPrice(adjustedPrice !== undefined ? adjustedPrice : tourPrice); 
//         closeModal();
//     };

//     return (
//         <div className="p-5 w-full justify-center items-center">
//             <div className='bg-white border-2 w-full justify-center items-center'>
//                 <div className="calendar-app max-w-6xl justify-between items-center sm:flex">
//                     {loading ? (
//                         <Skeleton height={64} width={100} borderRadius={8} />
//                     ) : (
//                         <button onClick={openModal} className="bg-[#f7f9fa] px-4 h-16 sm:mr-6 ml-2 border-gray-100 border text-[#4CA771] font-bold rounded-lg">
//                             Xem lịch
//                         </button>
//                     )}
//                     {loading ? (
//                         <Skeleton height={64} width={200} borderRadius={8} />
//                     ) : (
//                         <SidebarCalendar 
//                             selectedDateProp={selectedDate} // Truyền selectedDate vào SidebarCalendar
//                             onDateChange={handleDateChange} 
//                         />
//                     )}
//                     {showModal && (
//                         <ModalCalendar setShowModal={setShowModal} onDateChange={handleDateChange} />
//                     )}
//                 </div>
//             </div>
//             <div className="mt-4">
//                 <TourCard
//                     title="Tour Đặc Biệt"
//                     price={tourPrice !== null ? tourPrice : 'N/A'} 
//                     link="/tour-details"
//                 />
//             </div>
//             {showModal && (
//                 <ModalCalendar setShowModal={setShowModal} onDateChange={handleDateChange} />
//             )}
//         </div>
//     );
// }

// export default Calendar;
