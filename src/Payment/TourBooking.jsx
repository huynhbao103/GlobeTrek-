import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import tour1 from '../assets/tour1.png';
import { useDate } from '../Context/DateContext';
import backicon from '../assets/backicon.png';
import { Link, useParams } from 'react-router-dom';
import { fetchTourById } from '../API/apiService'; 
import { isSpecialDay, calculateTotalPrice } from '../API/utils'; 

const TourBooking = () => {
    const { id } = useParams();
    const { selectedDate, setSelectedDate } = useDate();
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [prices, setPrices] = useState({ adultPrice: 0, specialAdultPrice: 0, childPrice: 0, specialChildPrice: 0 });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const tour = await fetchTourById(id); 
                setPrices({
                    adultPrice: tour.price, 
                    specialAdultPrice: tour.specialAdultPrice,
                    childPrice: tour.childPrice, 
                    specialChildPrice: tour.specialChildPrice,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching prices:', error);
                setErrorMessage('Không thể tải thông tin giá.');
                setLoading(false);
            }
        };

        fetchPrices();
    }, [id]);

    useEffect(() => {
        const savedDate = localStorage.getItem('selectedDate');
        if (savedDate) {
            const parsedDate = new Date(savedDate);
            setSelectedDate(parsedDate);
            updateTotalPrice(parsedDate);
        }
    }, [setSelectedDate]);

    const updateTotalPrice = (date) => {
        const updatedTotalPrice = calculateTotalPrice(adultCount, childCount, prices, date);
        setTotalPrice(updatedTotalPrice);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        localStorage.setItem('selectedDate', date.toISOString());
        updateTotalPrice(date);
    };

    const increaseCount = (setter, count) => {
        if (adultCount + childCount < 30) {
            setter(count + 1);
            setErrorMessage('');
            updateTotalPrice(selectedDate);
        } else {
            setErrorMessage('Tổng số vé không được vượt quá 30 vé.');
        }
    };

    const decreaseCount = (setter, count, isAdult = false) => {
        if (isAdult && count > 1) {
            setter(count - 1);
            setErrorMessage('');
            updateTotalPrice(selectedDate);
        } else if (!isAdult && count > 0) {
            setter(count - 1);
            setErrorMessage('');
            updateTotalPrice(selectedDate);
        }
    };

    const handleBooking = () => {
        const bookingData = {
            adultCount,
            childCount,
            totalPrice,
        };

        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        window.location.href = '/BookingForm';
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
                                {loading ? <Skeleton width={300} /> : 'Tour chi tiết'}
                            </h2>
                        </div>
                    </div>

                    <div className="sm:w-2/3 p-4 ml-4">
                        <div className="mt-4">
                            <div className="mt-4 bg-green-100 p-4 rounded-lg">
                                <p className="text-lg">{loading ? <Skeleton width={200} /> : 'Ngày tham quan đã chọn'}</p>
                                <h3 className="text-xl font-bold">
                                    {loading ? <Skeleton width={250} /> : (selectedDate ? selectedDate.toLocaleDateString('vi-VN') : 'Chưa chọn ngày')}
                                </h3>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-xl font-bold">{loading ? <Skeleton width={150} /> : 'Người lớn'}</h4>
                                    <p className="text-green-500">
                                        {loading ? <Skeleton width={80} /> : (isSpecialDay(selectedDate) ? prices.specialAdultPrice.toLocaleString() : prices.adultPrice.toLocaleString())} VND
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() => decreaseCount(setAdultCount, adultCount, true)}>
                                        {loading ? <Skeleton width={20} height={20} /> : '-' }
                                    </button>
                                    <span className="mx-2">{loading ? <Skeleton width={30} /> : adultCount}</span>
                                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() => increaseCount(setAdultCount, adultCount, true)}>
                                        {loading ? <Skeleton width={20} height={20} /> : '+' }
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <h4 className="text-xl font-bold">{loading ? <Skeleton width={150} /> : 'Trẻ em'}</h4>
                                    <p className="text-green-500">
                                        {loading ? <Skeleton width={80} /> : (isSpecialDay(selectedDate) ? prices.specialChildPrice.toLocaleString() : prices.childPrice.toLocaleString())} VND
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() => decreaseCount(setChildCount, childCount)}>
                                        {loading ? <Skeleton width={20} height={20} /> : '-' }
                                    </button>
                                    <span className="mx-2">{loading ? <Skeleton width={30} /> : childCount}</span>
                                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() => increaseCount(setChildCount, childCount)}>
                                        {loading ? <Skeleton width={20} height={20} /> : '+' }
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <h3 className="text-xl font-bold">{loading ? <Skeleton width={200} /> : 'Tổng cộng'}</h3>
                                <h3 className="text-xl font-bold text-green-500">
                                    {loading ? <Skeleton width={100} /> : totalPrice.toLocaleString()} VND
                                </h3>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button onClick={handleBooking} className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
                                {loading ? <Skeleton width={100} /> : 'Đặt vé'}
                            </button>
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourBooking;
