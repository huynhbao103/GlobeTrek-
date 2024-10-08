import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

function SidebarCalendar({ selectedDate, onDateChange, tourPrices }) {
    const sliderRef = useRef(null);

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

    const settings = {
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 7,
        swipeToSlide: false,
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
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
        const adjustedPrice = tourPrices[date.toDateString()] || null; // Lấy giá tương ứng với ngày đã chọn
        onDateChange(date, adjustedPrice); // Gọi hàm onDateChange để cập nhật ngày và giá
    };

    return (
        <div className="w-[90%]">
            <Slider {...settings} ref={sliderRef}>
                {dates.map((date, index) => (
                    <button
                        id={date.toDateString()}
                        key={index}
                        className={`p-2 m-4 rounded border ${
                            date.toDateString() === selectedDate.toDateString() ? 'bg-[#4CA771] text-white font-bold' : 'font-bold'
                        }`}
                        onClick={() => handleDateChange(date)} // Sử dụng hàm handleDateChange
                    >
                        <div>{weekdays[date.getDay()]}</div>
                        <div>{date.getDate()} tháng {date.getMonth() + 1}</div>
                    </button>
                ))}
            </Slider>
        </div>
    );
}

export default SidebarCalendar;
