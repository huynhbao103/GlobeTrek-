/* eslint-disable react/prop-types */
import  { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchTourById } from '../API/apiService.js';

function SidebarCalendar({ selectedDate, onDateChange, tourPrices }) {
    const sliderRef = useRef(null);
    const [availabilities, setAvailabilities] = useState([]);
    const [storedDates, setStoredDates] = useState([]);
    const [loading, setLoading] = useState(true);

    const selectedTourId = window.location.pathname.split('/').pop();

    // Fetch the selected tour's data from API (only future dates)
    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const tour = await fetchTourById(selectedTourId);
                // Filter the availabilities to show only today and future dates
                const today = new Date().toISOString().split('T')[0];  // Get today's date in 'YYYY-MM-DD' format
                const futureAvailabilities = tour.availabilities.filter(item => {
                    const availabilityDate = new Date(item.date).toISOString().split('T')[0];
                    return availabilityDate >= today;  // Only show today and future dates
                });
                setAvailabilities(futureAvailabilities); 
            } catch (error) {
                console.error('Error fetching tour data:', error);
            }
            setLoading(false);
        };

        fetchTourData();
    }, []);

    useEffect(() => {
        const loadedDates = JSON.parse(localStorage.getItem('selectedDates')) || [];
        setStoredDates(loadedDates.map(date => new Date(date)));
    }, []);

    // Get availability for a specific date
    const getAvailabilityForDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        const availability = availabilities.find(item => {
            const availabilityDate = new Date(item.date).toISOString().split('T')[0];
            return availabilityDate === formattedDate;
        });
        return availability ? availability.availableSeats : 0;
    };

    // Handle date selection and update selected date
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        const adjustedPrice = tourPrices.special[formattedDate] || tourPrices.regular;
        onDateChange(date, adjustedPrice);
        saveSelectedDateToLocal(date);
    };

    // Save selected date to localStorage
    const saveSelectedDateToLocal = (date) => {
        const formattedDate = date.toISOString();
        if (!storedDates.includes(formattedDate)) {
            const updatedDates = [...storedDates, formattedDate];
            localStorage.setItem('selectedDates', JSON.stringify(updatedDates));
            setStoredDates(updatedDates);
        }
    };

    // Sort available dates and set up the slider
    const availableDates = availabilities.map(item => new Date(item.date));
    const slideCount = availableDates.length;

    const settings = {
        infinite: false,
        slidesToShow: slideCount < 6 ? slideCount : 6,
        slidesToScroll: 2,
        swipeToSlide: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                dots: false,
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
        ]
    };

    // Sync the selected date with the slider
    useEffect(() => {
        const sortedAvailableDates = [...availableDates].sort((a, b) => a - b);
        const selectedDateIndex = sortedAvailableDates.findIndex(date => date.toDateString() === selectedDate.toDateString());
        if (selectedDateIndex !== -1 && sliderRef.current) {
            sliderRef.current.slickGoTo(selectedDateIndex);
        }
    }, [selectedDate, availableDates]);

    return (
        <div className="w-[100%] mx-auto">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Slider {...settings} ref={sliderRef}>
                    {availableDates.map((date, index) => {
                        const availableSeats = getAvailabilityForDate(date);
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        const buttonClasses = `
                            flex flex-col items-center p-2 m-2 rounded border transition duration-200 ease-in-out 
                            ${isSelected ? 'bg-[#4CA771] text-white font-bold' : 'font-bold text-gray-800 hover:bg-gray-200'}
                        `;
                        return (
                            <div key={index} className="flex justify-center">
                                <button
                                    id={date.toDateString()}
                                    className={buttonClasses}
                                    onClick={() => handleDateChange(date)}
                                >
                                    <div>{date.getDate()} tháng {date.getMonth() + 1}</div>
                                    <div>{availableSeats} ghế còn lại</div>
                                </button>
                            </div>
                        );
                    })}
                </Slider>
            )}
        </div>
    );
}

export default SidebarCalendar;
