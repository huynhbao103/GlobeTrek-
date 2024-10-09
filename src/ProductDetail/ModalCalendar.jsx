// ModalCalendar.js
import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDate } from '../Context/DateContext';
import { fetchTourById } from '../API/apiService';
import { isSpecialDay } from '../API/utils';

function ModalCalendar({ setShowModal, onDateChange }) {
    const { setSelectedDate } = useDate();
    const [date, setDate] = useState(new Date());
    const [tourPrice, setTourPrice] = useState(null);
    const [specialAdultPrice, setSpecialAdultPrice] = useState(null);
    const [childPrice, setChildPrice] = useState(null);
    const [loading, setLoading] = useState(true);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const selectedTourId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const tour = await fetchTourById(selectedTourId);
                setTourPrice(tour.price);
                setSpecialAdultPrice(tour.specialAdultPrice);
                setChildPrice(tour.childPrice);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tour data:', error);
                setLoading(false);
            }
        };

        fetchTourData();
    }, [selectedTourId]);

    // Hàm xử lý khi chọn ngày
    const handleDateChange = useCallback((newDate) => {
        if (newDate >= minDate) {
            setDate(newDate);
            setSelectedDate(newDate);
            setShowModal(false);
            const selectedPrice = getPriceForDate(newDate); // Lấy giá từ API
            onDateChange(newDate, selectedPrice); // Truyền giá về component cha
        }
    }, [setShowModal, minDate, setSelectedDate, onDateChange]);

    // Hàm định dạng giá
    const formatPrice = (price) => {
        if (price < 1000) return price;
        return `${Math.round(price / 1000)}k`;
    };

    // Lấy giá theo ngày (dựa trên ngày đặc biệt hoặc không)
    const getPriceForDate = (date) => {
        if (tourPrice === null) return 'N/A';

        // Kiểm tra xem ngày có phải là ngày đặc biệt không
        if (isSpecialDay(date)) {
            return formatPrice(specialAdultPrice); // Nếu là ngày đặc biệt, trả về giá đặc biệt
        }

        return formatPrice(tourPrice); // Nếu không, trả về giá thường
    };

    // Hiển thị giá trên mỗi ô lịch
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const price = getPriceForDate(date);
            return <p className="text-sm text-center mt-1">{price}</p>;
        }
        return null;
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-auto relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowModal(false)}
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Chọn ngày</h2>
                {loading ? (
                    <p>Đang tải dữ liệu giá...</p>
                ) : (
                    <div className="my-4">
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            tileContent={tileContent}
                            showNeighboringMonth={true}
                            minDetail="year"
                            minDate={minDate}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalCalendar;
