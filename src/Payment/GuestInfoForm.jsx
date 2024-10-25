import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const GuestInfoForm = ({ onSave }) => {
  const [title, settitle] = useState('');
  const [fullName, setfullName] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const API_URL = "http://localhost:8081/orders/api"; // Example definition

  useEffect(() => {
    const savedGuestInfo = JSON.parse(localStorage.getItem('passengerInfo'));
    if (savedGuestInfo) {
      settitle(savedGuestInfo.title || '');
      setfullName(savedGuestInfo.fullName || '');
      setphone(savedGuestInfo.phone || '');
      setemail(savedGuestInfo.email || '');
      setSpecialRequest(savedGuestInfo.specialRequest || '');
    }
  }, []);


  const validatePhoneNumber = (phone) => {
    return phone.startsWith('09') && phone.length >= 10 && phone.length <= 11;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveGuestInfo = () => {
    if (!validatePhoneNumber(phone)) {
      setError('Số điện thoại phải bắt đầu bằng 09 và có từ 10 đến 11 ký tự.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email không hợp lệ.');
      return;
    }

    setError('');

    const passengerInfo = {
      title,
      fullName,
      phone,
      email,
      specialRequest
    };

    localStorage.setItem('passengerInfo', JSON.stringify(passengerInfo));
    console.log('Guest information saved locally:', passengerInfo);

    axios.post(`${API_URL}/saveGuestInfo`, passengerInfo)
      .then(response => {
        console.log('Guest information saved to database:', response.data);
      })
      .catch(error => {
        console.error('Error saving guest information to database:', error);
      });

    if (onSave) {
      onSave();
    }

    setIsEditing(false); // Sau khi lưu, chuyển sang chế độ xem
  };

  const handleEditGuestInfo = () => {
    setIsEditing(true); // Chuyển sang chế độ chỉnh sửa
  };

  const titleOptions = [
    { value: 'Ông', label: 'Ông' },
    { value: 'Bà', label: 'Bà' },
    { value: 'Cô', label: 'Cô' },
  ];

  return (
    <section className="bg-white p-4 rounded-md shadow-md mt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-2">Thông tin khách</h3>
        <button
          type="button"
          onClick={isEditing ? handleSaveGuestInfo : handleEditGuestInfo}
          className="bg-[#4CA771] text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isEditing ? 'Lưu thông tin khách' : 'Chỉnh sửa chi tiết'}
        </button>
      </div>
    
      {isEditing ? (
        <div>
              <p>Thông tin hành khách đi cùng</p>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Danh xưng
            </label>
            <Select
              options={titleOptions}
              value={titleOptions.find(option => option.value === title)}
              onChange={(selectedOption) => settitle(selectedOption ? selectedOption.value : '')}
              className="mt-1 block w-[50%] border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Họ tên <span className='text-red-500'>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className='sm:flex w-full justify-between'>
            <div className="mb-4 w-1/2 pr-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Điện thoại di động<span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                required
                placeholder="+84"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 w-1/2 pl-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className='text-red-500'>*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="specialRequest" className="block text-sm font-medium text-gray-700">
              Yêu cầu đặc biệt
            </label>
            <textarea
              id="specialRequest"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p><strong>Danh xưng:</strong> {title || 'Chưa có thông tin'}</p>
          </div>
          <div className="mb-4">
            <p><strong>Họ tên:</strong> {fullName || 'Chưa có thông tin'}</p>
          </div>
          <div className='sm:w-[80%] sm:flex justify-between items-center'>
          <div className="mb-4">
            <p><strong>Điện thoại di động:</strong> {phone || 'Chưa có thông tin'}</p>
          </div>
          <div className="mb-4">
            <p><strong>Email:</strong> {email || 'Chưa có thông tin'}</p>
          </div>
          </div>
          <div className="mb-4">
            <p><strong>Yêu cầu đặc biệt:</strong> {specialRequest || 'Chưa có thông tin'}</p>
          </div>
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
    </section>
  );
};

export default GuestInfoForm;
