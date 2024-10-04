import React, { useState } from 'react';
import ModalCalendar from './ModalCalendar';
import TourCard from './TourCard';
import CalendarApp from './CalendarApp';
import { useDate } from '../Context/DateContext';

function TourPage() {
    const { selectedDate, setSelectedDate } = useDate(); // Lấy ngày đã chọn từ context
    const [showModal, setShowModal] = useState(false);

    // Tính giá dựa trên ngày đã chọn
    const getPriceForDate = (date) => {
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

        const isSpecial = isSpecialDay(date);
        return isSpecial ? '360k' : '300k';
    };

    const price = getPriceForDate(selectedDate);

    // Mở modal
    const openModal = () => setShowModal(true);

    // Đóng modal
    const closeModal = () => setShowModal(false);

    // Xử lý thay đổi ngày từ modal
    const handleDateChange = (date) => {
        setSelectedDate(date);
        closeModal();
    };

    return (
        <div className="p-5 w-full justify-center items-center">
            <div className='w-[100%] mx-auto'>

                    <CalendarApp selectedDate={selectedDate} />
                    <div className="mt-4">
                        <TourCard
                            title="Tour Đặc Biệt"
                            price={price}
                            points="500 điểm"
                            linkToDetails="/tour-details"
                            linkToTickets="/bodyPay"
                        />
                    </div>
                </div>
            {showModal && (
                <ModalCalendar setShowModal={setShowModal} />
            )}
        </div>
    );
}

export default TourPage;
