import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

function SidebarCalendar({ selectedDate, onDateChange, tourPrices }) {
    const sliderRef = useRef(null);
    const [storedDates, setStoredDates] = useState([]);

    const getDatesForCurrentMonth = () => {
        const dates = [];
        const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        const today = new Date();

        // Đặt ngày bắt đầu từ ngày mai
        const startDate = today.getDate() < endOfMonth.getDate() ? today.setDate(today.getDate() + 1) : startOfMonth;

        for (let date = new Date(startDate); date <= endOfMonth; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date));
        }
        return dates;
    };

    const dates = getDatesForCurrentMonth();

    useEffect(() => {
        const selectedDateIndex = dates.findIndex(date => date.toDateString() === selectedDate.toDateString());
        if (selectedDateIndex !== -1 && sliderRef.current) {
            sliderRef.current.slickGoTo(selectedDateIndex);
        }
    }, [selectedDate, dates]);

    useEffect(() => {
        const loadedDates = JSON.parse(localStorage.getItem('selectedDates')) || [];
        setStoredDates(loadedDates.map(date => new Date(date))); // Chuyển đổi các chuỗi thành Date objects
    }, []);

    const settings = {
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 7,
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

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        const adjustedPrice = tourPrices.special[formattedDate] || tourPrices.regular; 
        onDateChange(date, adjustedPrice);
        saveSelectedDateToLocal(date);
    };

    const saveSelectedDateToLocal = (date) => {
        const formattedDate = date.toISOString();
        if (!storedDates.includes(formattedDate)) {
            const updatedDates = [...storedDates, formattedDate];
            localStorage.setItem('selectedDates', JSON.stringify(updatedDates));
            setStoredDates(updatedDates);
        }
    };

    return (
        <div className="w-[90%] mx-auto">
            <Slider {...settings} ref={sliderRef}>
                {dates.map((date, index) => {
                    return (
                        <div key={index} className="flex justify-center">
                            <button
                                id={date.toDateString()}
                                className={`flex flex-col items-center p-2 m-2 rounded border transition duration-200 ease-in-out 
                                    ${date.toDateString() === selectedDate.toDateString() ? 'bg-[#4CA771] text-white font-bold' : 'font-bold text-gray-800 hover:bg-gray-200'}`}
                                onClick={() => handleDateChange(date)}
                            >
                                <div>{weekdays[date.getDay()]}</div>
                                <div>{date.getDate()} tháng {date.getMonth() + 1}</div>
                            </button>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default SidebarCalendar;
