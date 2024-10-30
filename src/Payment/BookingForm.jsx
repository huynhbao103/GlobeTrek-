import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import User from "../assets/User.png";
import ContactInfoForm from "./ContactInfoForm";
import GuestInfoForm from "./GuestInfoForm";
import Map from "./Map.jsx";
import Header from "./header";
import Footer from "../footer/Footer";
import Price from "./Price"; 
import ConfirmBookingModal from "./ConfirmBookingModal";
import ProcessingModal from "./ProcessingModal"; 
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import {  message } from 'antd';

const BookingForm = () => {
  const { id } = useParams(); 
  const user = JSON.parse(localStorage.getItem("userNav"));
  const navigate = useNavigate();
  const userNav = useSelector((state) => state.auth?.login?.currentUser);

  // Khởi tạo state
  const [bookingData, setBookingData] = useState({
    adultCount: 1,
    childCount: 0,
    prices: { adultPrice: 0, childPrice: 0 }
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingData"));
    if (data) {
      setBookingData(prevData => ({
        ...prevData,
        adultCount: data.adultCount || prevData.adultCount,
        childCount: data.childCount || prevData.childCount,
        prices: {
          adultPrice: data.prices?.adultPrice || prevData.prices.adultPrice,
          childPrice: data.prices?.childPrice || prevData.prices.childPrice,
        }
      }));
    } 
  }, []);

  // Xử lý khi nhấn "Tiếp tục"
  const handleContinueClick = () => {
    if (bookingData.adultCount < 1) {
      message.error("Bạn cần ít nhất 1 người lớn để đặt chỗ.");
      return;
    }
    setIsConfirmModalOpen(true);
  };

  // Xử lý khi xác nhận
  const handleConfirm = () => {
    setIsConfirmModalOpen(false);
    setIsProcessingModalOpen(true);

    setTimeout(() => {
      setIsProcessingModalOpen(false);
      navigate(`/Payment/${id}`); 
    }, 3000); 
  };

  return (
    <>
      <Header />
      <div className="bg-[rgba(174,249,231,0.2)]">
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Đặt chỗ của tôi</h2>
          <h2 className="text-lg mb-6">Điền thông tin và xem lại đặt chỗ.</h2>
          
          {/* Thông tin người dùng */}
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <div className="flex items-center">
              <img
                className="w-12 h-12 bg-[#00875A] rounded-full mr-4"
                src={User}
                alt="User"
              />
              <div>
                <h2 className="font-semibold text-xl">
                  {user ? `Đăng nhập với  ${user.name || user.email}` : "Chưa đăng nhập"}
                </h2>
                {/* {user && <p className="text-sm text-gray-600">{user.email}</p>} */}
              </div>
            </div>
          </div>

        
          <ContactInfoForm />
          
         
          <GuestInfoForm 
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
              Xác nhận thanh toán 
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Modal xác nhận */}
      <ConfirmBookingModal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
      />
      
      {/* Modal xử lý */}
      <ProcessingModal
        isOpen={isProcessingModalOpen}
      />
    </>
  );
};

// Prop types
BookingForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default BookingForm;
