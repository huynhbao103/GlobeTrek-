import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ModalCalendar from './ModalCalendar';
import SidebarCalendar from './SidebarCalendar';
import { useDate } from '../Context/DateContext'; // Import useDate hook

function CalendarApp() {
  const { selectedDate, setSelectedDate } = useDate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-white border-2 w-full justify-center items-center'>
      <div className="calendar-app max-w-6xl justify-between items-center sm:flex">
        {loading ? (
          <Skeleton height={64} width={100} borderRadius={8} />
        ) : (
          <button onClick={openModal} className="bg-[#f7f9fa] px-4 h-16 sm:mr-6 ml-2 border-gray-100 border text-[#4CA771] font-bold rounded-lg">
            Xem lịch
          </button>
        )}
        {loading ? (
          <Skeleton height={64} width={200} borderRadius={8} />
        ) : (
          <SidebarCalendar selectedDate={selectedDate} onDateChange={handleDateChange} />
        )}
        {showModal && (
          <ModalCalendar setShowModal={setShowModal} onDateChange={handleDateChange} />
        )}
      </div>
    </div>
  );
}

export default CalendarApp;
