import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../assets/User.png";
import ContactInfoForm from "./ContactInfoForm";
import GuestInfoForm from "./GuestInfoForm";
import Map from "./Map.jsx";
import Header from "./header";
import Footer from "../footer/Footer";
import Price from "./Price"; // Import Price component
import ConfirmBookingModal from "./ConfirmBookingModal"; // Import ConfirmBookingModal component
import ProcessingModal from "./ProcessingModal"; // Import ProcessingModal component

const BookingForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    return <p>Chưa có người dùng đăng nhập</p>;
  }

  const [bookingData, setBookingData] = useState({
    adultCount: 1,
    childCount: 0,
    prices: { adultPrice: 3000000, childPrice: 2000000 } // Default values
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);

  useEffect(() => {
    // Load booking data from localStorage
    const data = JSON.parse(localStorage.getItem('bookingData'));
    if (data) {
      setBookingData(prevData => ({
        ...prevData,
        adultCount: data.adultCount,
        childCount: data.childCount,
        prices: prevData.prices // Use default prices or fetched prices if applicable
      }));
    }
  }, []);

  const handleContinueClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmModalOpen(false);
    setIsProcessingModalOpen(true);

    setTimeout(() => {
      setIsProcessingModalOpen(false);
      navigate('/Payment'); 
    }, 3000); 
  };

  return (
    <>
      <Header />
      <div className="bg-[rgba(174,249,231,0.2)]">
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Đặt chỗ của tôi</h2>
          <h2 className="text-lg mb-6">Điền thông tin và xem lại đặt chỗ.</h2>
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <div className="flex items-center">
              <img
                className="w-12 h-12 bg-[#00875A] rounded-full mr-4"
                src={User}
                alt="User"
              />
              <div>
                <h2 className="font-semibold text-xl">
                  Đăng nhập với tên {user.name}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          <ContactInfoForm />

          <GuestInfoForm 
            setAdultCount={(count) => setBookingData(prevData => ({ ...prevData, adultCount: count }))}
            setChildCount={(count) => setBookingData(prevData => ({ ...prevData, childCount: count }))}
          />

          <Map />
          
          <Price 
            adultCount={bookingData.adultCount} 
            childCount={bookingData.childCount} 
            prices={bookingData.prices}
          />

          <div className="flex items-end justify-end mt-4">
            <button
              onClick={handleContinueClick}
              className="bg-[#4CA771] hover:bg-[#00875A] font-bold text-white py-4 px-16 rounded-lg"
            >
             Xác nhận thanh toán bằng PressPay
            </button>
          </div>
        </div>
      </div>
      <Footer />
      
      <ConfirmBookingModal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
      />
      
      <ProcessingModal
        isOpen={isProcessingModalOpen}
      />
    </>
  );
};

export default BookingForm;
