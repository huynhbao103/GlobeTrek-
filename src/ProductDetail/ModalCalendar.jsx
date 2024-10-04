import React, { useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDate } from '../Context/DateContext'; // Import useDate hook

function ModalCalendar({ setShowModal }) {
    const { setSelectedDate } = useDate();
    const [date, setDate] = useState(new Date());

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);

    const handleDateChange = useCallback((newDate) => {
        if (newDate >= minDate) {
            setDate(newDate);
            setSelectedDate(newDate); // Cập nhật ngày đã chọn trong context
            setShowModal(false);
        }
    }, [setShowModal, minDate, setSelectedDate]);

    const isSpecialDay = (date) => {
        const dayOfWeek = date.getDay();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const vietnameseHolidays = [
            { day: 1, month: 1 },
            { day: 30, month: 4 },
            { day: 2, month: 9 },
        ];
        return (
            (dayOfWeek === 0 || dayOfWeek === 6) ||
            vietnameseHolidays.some(holiday => holiday.day === day && holiday.month === month)
        );
    };

    const getPriceForDate = (date) => {
        return isSpecialDay(date) ? '360k' : '300k';
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
            </div>
        </div>
    );
}

export default ModalCalendar;
