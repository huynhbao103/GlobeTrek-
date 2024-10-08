// Calendar.js
import React, { useState, useEffect } from 'react';
import ModalCalendar from './ModalCalendar';
import CalendarApp from './CalendarApp';
import { useDate } from '../Context/DateContext';
import { fetchTourById } from '../API/apiService'; // Nhập hàm fetchTourById

function Calendar() {
    const { selectedDate, setSelectedDate } = useDate(); // Lấy ngày đã chọn từ context
    const [showModal, setShowModal] = useState(false);
    const [tourPrice, setTourPrice] = useState(null); 

    // Lấy tour ID từ URL
    const selectedTourId = window.location.pathname.split('/').pop(); // Lấy ID từ đường dẫn URL

    // Fetch giá tour khi component mount
    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const tour = await fetchTourById(selectedTourId); // Gọi hàm fetchTourById để lấy dữ liệu tour
                setTourPrice(tour.price); // Lưu giá của tour vào state
            } catch (error) {
                console.error('Error fetching tour data:', error);
            }
        };

        fetchTourData();
    }, [selectedTourId]); // Chỉ fetch khi selectedTourId thay đổi

    // Mở modal
    const openModal = () => setShowModal(true);

    // Đóng modal
    const closeModal = () => setShowModal(false);

    // Xử lý thay đổi ngày từ modal và cập nhật giá tour
    const handleDateChange = (date, adjustedPrice) => {
        setSelectedDate(date);
        setTourPrice(adjustedPrice !== undefined ? adjustedPrice : tourPrice); // Cập nhật giá theo ngày đã chọn
        closeModal();
    };

    return (
        <div className="p-5 w-full justify-center items-center">
            <div className='w-[100%] mx-auto'>
                <CalendarApp selectedDate={selectedDate} />
                <div className="mt-4">
                
                </div>
            </div>
            {showModal && (
                <ModalCalendar setShowModal={setShowModal} onDateChange={handleDateChange} />
            )}
 
        </div>
    );
}

export default Calendar;
