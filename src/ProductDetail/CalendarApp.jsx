import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SidebarCalendar from './SidebarCalendar';
import TourCard from './TourCard';
import { useDate } from '../Context/DateContext';
import { fetchTourById } from '../API/apiService';

function Calendar() {
    const { selectedDate, setSelectedDate } = useDate();
    const [loading, setLoading] = useState(true);
    const [tourPrice, setTourPrice] = useState(null);
    const [specialPrices, setSpecialPrices] = useState({});

    const selectedTourId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const tour = await fetchTourById(selectedTourId);
                setTourPrice(tour.price);
                setSpecialPrices(tour.specialPrices || {});
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
        const latestDate = Object.keys(storedData).pop();
        if (latestDate) {
            setSelectedDate(new Date(latestDate));
            setTourPrice(storedData[latestDate]);
        }
    }, [setSelectedDate]);
    
    const handleDateChange = (date, adjustedPrice) => {
        setSelectedDate(date);
        if (adjustedPrice !== undefined) {
            setTourPrice(adjustedPrice);
            localStorage.setItem('tourPrice', adjustedPrice);
        }
        localStorage.setItem('selectedData', JSON.stringify({ ...JSON.parse(localStorage.getItem('selectedData') || '{}'), [date.toISOString()]: adjustedPrice }));
    };

    return (
        <div className="p-5 w-full justify-center items-center">
            <div className='bg-white border-2 w-full justify-center items-center'>
                <div className="calendar-app max-w-7xl justify-between items-center sm:flex">    
                    {loading ? (
                        <Skeleton height={64} width={200} borderRadius={8} />
                    ) : (
                        <SidebarCalendar selectedDate={selectedDate} onDateChange={handleDateChange} tourPrices={{ regular: tourPrice, special: specialPrices }} />
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
