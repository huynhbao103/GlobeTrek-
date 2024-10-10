// TourBooking.js

import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import tour1 from '../assets/tour1.png';
import SidebarCalendar from '../ProductDetail/SidebarCalendar';
import { useDate } from '../Context/DateContext';
import backicon from '../assets/backicon.png';
import { Link, useParams } from 'react-router-dom';
import { fetchTourById } from '../API/apiService'; // Nhập hàm fetchTourById

const TourBooking = () => {
    const { id } = useParams();
    const { selectedDate, setSelectedDate } = useDate();
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [prices, setPrices] = useState({ adultPrice: 0, childPrice: 0 });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Lấy ID tour từ URL
    const selectedTourId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const tour = await fetchTourById(id); 
                setPrices({
                    adultPrice: tour.price, // API trả về thuộc tính price cho người lớn
                    childPrice: tour.childPrice, //  API trả về thuộc tính childPrice cho trẻ em
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching prices:', error);
                setErrorMessage('Không thể tải thông tin giá.'); // Thêm thông báo lỗi nếu cần
                setLoading(false);
            }
        };

        fetchPrices();
    }, [id]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const updatedPrices = updatePrices(); // Cập nhật giá khi thay đổi ngày
        setPrices(updatedPrices);
    };

    const increaseCount = (setter, count) => {
        if (adultCount + childCount < 30) {
            setter(count + 1);
            setErrorMessage('');
        } else {
            setErrorMessage('Tổng số vé không được vượt quá 30 vé.');
        }
    };

    const decreaseCount = (setter, count, isAdult = false) => {
        if (isAdult) {
            if (count > 1) {
                setter(count - 1);
                setErrorMessage('');
            }
        } else {
            if (count > 0) {
                setter(count - 1);
                setErrorMessage('');
            }
        }
    };

    const totalPrice = (adultCount * prices.adultPrice) + (childCount * prices.childPrice);

    const handleBooking = () => {
        const bookingData = {
            adultCount,
            childCount,
            totalPrice
        };

        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        window.location.href = '/BookingForm'; // Redirect to BookingForm page
    };

    return (
        <div className='max-w-7xl'>
            <div className="p-4 mx-auto">
                <div className="w-[100%] mx-auto items-center mt-8 max-sm:mb-4">
                    <Link to={`/ProDetail/${id}`} className='sm:mb-5 shadow-md'>
                        <img className='w-4 h-4' src={backicon} alt="Back" />
                    </Link>
                </div>

                <div className="sm:flex w-[100%] sm:w-full mx-auto">
                    <div className="sm:w-1/3 sm:mt-16 sm:shadow-xl rounded-md">
                        {loading ? (
                            <Skeleton height={200} />
                        ) : (
                            <img src={tour1} alt="Tour" className="w-full rounded-lg" />
                        )}
                        <div className="ml-4">
                            <h2 className="text-xl font-bold mb-2">
                                {loading ? <Skeleton width={300} /> : 'Tour ghép cho tối đa 40 khách - Khởi hành TPHCM cùng Vietjet Air'}
                            </h2>
                            <p>{loading ? <Skeleton width={150} /> : 'Không thể hoàn tiền'}</p>
                            <button className="mt-4 bg-green-100 text-green-500 py-2 px-4 rounded-lg">
                                {loading ? <Skeleton width={150} height={30} /> : 'Xem thông tin vé'}
                            </button>
                        </div>
                    </div>

                    <div className="sm:w-2/3 p-4 ml-4">
                        <div className="mt-4">
                            <div className="w-full justify-center items-center">
                                {loading ? (
                                    <Skeleton height={300} />
                                ) : (
                                    <SidebarCalendar selectedDate={selectedDate} onDateChange={handleDateChange} />
                                )}
                            </div>
                            <div className="mt-4 bg-green-100 p-4 rounded-lg">
                                <p className="text-lg">{loading ? <Skeleton width={200} /> : 'Ngày tham quan đã chọn'}</p>
                                <h3 className="text-xl font-bold">
                                    {loading ? <Skeleton width={250} /> : (selectedDate ? selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Chưa chọn ngày')}
                                </h3>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-xl font-bold">{loading ? <Skeleton width={150} /> : 'Người lớn'}</h4>
                                    <p className="text-green-500">
                                        {loading ? <Skeleton width={80} /> : prices.adultPrice.toLocaleString()} {loading ? <Skeleton width={50} /> : 'VND'}
                                    </p>
                                    <p className="text-gray-500">{loading ? <Skeleton width={150} /> : 'Nhận N/A xu'}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded-lg"
                                        onClick={() => decreaseCount(setAdultCount, adultCount, true)}
                                    >
                                        {loading ? <Skeleton width={20} height={20} /> : '-' }
                                    </button>
                                    <span className="mx-2">{loading ? <Skeleton width={30} /> : adultCount}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded-lg"
                                        onClick={() => increaseCount(setAdultCount, adultCount)}
                                    >
                                        {loading ? <Skeleton width={20} height={20} /> : '+' }
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <h4 className="text-xl font-bold">{loading ? <Skeleton width={150} /> : 'Trẻ em'}</h4>
                                    <p className="text-green-500">
                                        {loading ? <Skeleton width={80} /> : prices.childPrice.toLocaleString()} {loading ? <Skeleton width={50} /> : 'VND'}
                                    </p>
                                    <p className="text-gray-500">{loading ? <Skeleton width={150} /> : 'Nhận N/A xu'}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded-lg"
                                        onClick={() => decreaseCount(setChildCount, childCount)}
                                    >
                                        {loading ? <Skeleton width={20} height={20} /> : '-' }
                                    </button>
                                    <span className="mx-2">{loading ? <Skeleton width={30} /> : childCount}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded-lg"
                                        onClick={() => increaseCount(setChildCount, childCount)}
                                    >
                                        {loading ? <Skeleton width={20} height={20} /> : '+' }
                                    </button>
                                </div>
                            </div>
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                            <div className="mt-4">
                                <h4 className="text-xl font-bold">Tổng giá:</h4>
                                <p className="text-green-500 text-xl">{totalPrice.toLocaleString()} VND</p>
                                <button
                                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
                                    onClick={handleBooking}
                                >
                                    Đặt Tour
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourBooking;
