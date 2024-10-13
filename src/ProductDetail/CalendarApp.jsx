import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ModalCalendar from './ModalCalendar';
import SidebarCalendar from './SidebarCalendar';
import TourCard from './TourCard';
import { useDate } from '../Context/DateContext';
import { fetchTourById } from '../API/apiService';

function Calendar() {
    const { selectedDate, setSelectedDate } = useDate();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tourPrice, setTourPrice] = useState(null);
    const [specialPrices, setSpecialPrices] = useState({});

    const selectedTourId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const tour = await fetchTourById(selectedTourId);
                setTourPrice(tour.price);
                setSpecialPrices(tour.specialPrices || {}); // Giả định tour.specialPrices chứa giá cho các ngày đặc biệt
                localStorage.setItem('tourPrice', tour.price);
                localStorage.setItem('specialPrices', JSON.stringify(tour.specialPrices || {}));
            } catch (error) {
                console.error('Error fetching tour data:', error);
            }
            setLoading(false);
        };

        fetchTourData();
    }, [selectedTourId]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('selectedData')) || {};
        const latestDate = Object.keys(storedData).pop(); // Lấy ngày cuối cùng
        if (latestDate) {
            setSelectedDate(new Date(latestDate));
            setTourPrice(storedData[latestDate]); // Lấy giá tương ứng
        }
    }, [setSelectedDate]);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleDateChange = (date, adjustedPrice) => {
        setSelectedDate(date);
        if (adjustedPrice !== undefined) {
            setTourPrice(adjustedPrice);
            localStorage.setItem('tourPrice', adjustedPrice);
        }
        localStorage.setItem('selectedData', JSON.stringify({ ...JSON.parse(localStorage.getItem('selectedData') || '{}'), [date.toISOString()]: adjustedPrice }));
        closeModal();
    };

    return (
        <div className="p-5 w-full justify-center items-center">
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
                        <SidebarCalendar selectedDate={selectedDate} onDateChange={handleDateChange} tourPrices={{ regular: tourPrice, special: specialPrices }} />
                    )}
                    {showModal && (
                        <ModalCalendar setShowModal={setShowModal} onDateChange={handleDateChange} tourPrices={{ regular: tourPrice, special: specialPrices }} />
                    )}
                </div>
            </div>
            <div className="mt-4">
                <TourCard
                    title="Tour Đặc Biệt"
                    price={tourPrice !== null ? tourPrice : 'N/A'}
                    link="/tour-details"
                />
            </div>
        </div>
    );
}

export default Calendar;
