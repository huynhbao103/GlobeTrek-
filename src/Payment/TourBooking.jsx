import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import backicon from '../assets/backicon.png';
import { Link, useParams } from 'react-router-dom';
import { fetchTourById } from '../API/apiService'; 
import { isSpecialDay } from '../API/utils'; 
import { useDate } from '../Context/DateContext';

const TourBooking = () => {
    const { id } = useParams();
    const { selectedDate, setSelectedDate } = useDate();
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [prices, setPrices] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [firstImage, setFirstImage] = useState('');
    const [tour, setTour] = useState({});

    useEffect(() => {
        // Lấy ngày từ localStorage
        const savedDate = localStorage.getItem('selectedDate');
        if (savedDate) {
            const parsedDate = new Date(savedDate);
            setSelectedDate(parsedDate); // Cập nhật selectedDate
        }
    }, [setSelectedDate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tourData = await fetchTourById(id);
                setTour(tourData);
                setPrices({
                    adultPrice: tourData.price,
                    specialAdultPrice: tourData.specialAdultPrice,
                    childPrice: tourData.childPrice,
                    specialChildPrice: tourData.specialChildPrice,
                });
                if (tourData.images && tourData.images.length > 0) {
                    setFirstImage(tourData.images[0]);
                }
            } catch (error) {
                console.error('Error fetching tour data:', error);
                setErrorMessage('Không thể tải thông tin tour.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        localStorage.setItem('selectedDate', date.toISOString());
        updateTotalPrice(date);
    };

    useEffect(() => {
        const isSpecial = isSpecialDay(selectedDate);
        const adultPrice = isSpecial ? prices.specialAdultPrice : prices.adultPrice;
        const childPrice = isSpecial ? prices.specialChildPrice : prices.childPrice;
        setTotalPrice((adultCount * adultPrice) + (childCount * childPrice));
    }, [adultCount, childCount, selectedDate, prices]);

    const handleBooking = () => {
        const bookingData = { adultCount, childCount, totalPrice }; 
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        window.location.href = '/BookingForm';
    };

    const adjustCount = (setter, count, increment) => {
        const newCount = count + increment;
        if (newCount >= 0 && (adultCount + childCount + increment) <= 30) {
            setter(newCount);
            setErrorMessage('');
        } else if (newCount < 0) {
            setErrorMessage('Số lượng không thể nhỏ hơn 0.');
        } else {
            setErrorMessage('Tổng số vé không được vượt quá 30 vé.');
        }
    };

    const getDayName = (date) => {
        const dayNames = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        return dayNames[date.getUTCDay()];
    };

    return (
        <div className="max-w-7xl">
            <div className="p-4 mx-auto">
                <div className="w-[100%] mx-auto items-center mt-8 max-sm:mb-4">
                    <Link to={`/ProDetail/${id}`} className="sm:mb-5 shadow-md">
                        <img className="w-4 h-4" src={backicon} alt="Back" />
                    </Link>
                </div>

                <div className="sm:flex w-[100%] sm:w-full mx-auto">
                    <div className="sm:w-1/3 sm:mt-16 sm:shadow-xl rounded-md">
                        {loading ? (
                            <Skeleton height={200} />
                        ) : (
                            <img src={firstImage} alt="Tour" className="w-full rounded-lg" />
                        )}
                        <div className="ml-4">
                            <h2 className="text-xl font-bold mb-2">
                                {loading ? <Skeleton width={300} /> : <>{tour.title}</>}
                            </h2>
                        </div>
                    </div>

                    <div className="sm:w-2/3 p-4 ml-4">
                        <div className="mt-4">
                            <div className="mt-4 bg-green-100 p-4 rounded-lg">
                                <p className="text-lg">{loading ? <Skeleton width={200} /> : 'Ngày tham quan đã chọn'}</p>
                                <h3 className="text-xl font-bold">
                                {loading ? <Skeleton width={250} /> : (selectedDate ? `${getDayName(selectedDate)}, ${selectedDate.toLocaleDateString('vi-VN')}` : 'Chưa chọn ngày')}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-xl font-bold">{loading ? <Skeleton width={150} /> : 'Người lớn'}</h4>
                                    <p className="text-green-500">
                                        {loading ? <Skeleton width={80} /> : (isSpecialDay(selectedDate) ? prices.specialAdultPrice.toLocaleString('vi-VN') : prices.adultPrice.toLocaleString('vi-VN'))} VND
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() => adjustCount(setAdultCount, adultCount, -1)}>-</button>
                                    <span className="mx-2">{adultCount}</span>
                                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() => adjustCount(setAdultCount, adultCount, 1)}>+</button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <h4 className="text-xl font-bold">{loading ? <Skeleton width={150} /> : 'Trẻ em'}</h4>
                                    <p className="text-green-500">
                                        {loading ? <Skeleton width={80} /> : (isSpecialDay(selectedDate) ? prices.specialChildPrice.toLocaleString('vi-VN') : prices.childPrice.toLocaleString('vi-VN'))} VND
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() => adjustCount(setChildCount, childCount, -1)}>-</button>
                                    <span className="mx-2">{childCount}</span>
                                    <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() => adjustCount(setChildCount, childCount, 1)}>+</button>
                                </div>
                            </div>

                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

                            <h4 className="text-lg font-bold mt-4">Tổng giá: {totalPrice.toLocaleString('vi-VN')} VND</h4>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4" onClick={handleBooking}>Đặt vé</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourBooking;
