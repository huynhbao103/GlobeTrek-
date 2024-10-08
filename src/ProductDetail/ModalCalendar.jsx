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
    const [loading, setLoading] = useState(true);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const selectedTourId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const tour = await fetchTourById(selectedTourId);
                setTourPrice(tour.price);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tour data:', error);
                setLoading(false);
            }
        };

        fetchTourData();
    }, [selectedTourId]);

    // ModalCalendar.js
const handleDateChange = useCallback((newDate) => {
    if (newDate >= minDate) {
        setDate(newDate);
        setSelectedDate(newDate);
        setShowModal(false);
        const adjustedPrice = getPriceForDate(newDate); // Lấy giá điều chỉnh
        onDateChange(newDate, adjustedPrice); // Truyền giá đã điều chỉnh
    }
}, [setShowModal, minDate, setSelectedDate, tourPrice, onDateChange]);

    const formatPrice = (price) => {
        if (price < 1000) return price;
        return `${Math.round(price / 1000)}k`;
    };

    const getPriceForDate = (date) => {
        if (tourPrice === null) return 'N/A';

        let price = tourPrice;

        if (isSpecialDay(date)) {
            price *= 1.1; // Tăng giá 10% cho ngày đặc biệt
        }

        return formatPrice(price);
    };

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
