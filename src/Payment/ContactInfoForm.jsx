import React, { useState, useEffect } from 'react';
// import { customerInfo as saveContactInfo } from '../API/apiService'; // Import hàm từ apiService.js

const ContactInfoForm = ({ onSave, orderData }) => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const customerInfo = JSON.parse(localStorage.getItem('contactInfo'));
    if (customerInfo) {
      setContactName(customerInfo.contactName || '');
      setContactPhone(customerInfo.contactPhone || '');
      setContactEmail(customerInfo.contactEmail || '');
    }
  }, []);

  const validatePhoneNumber = (phone) => {
    return phone.startsWith('0') && phone.length === 10;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveContactInfo = () => {
    if (!validatePhoneNumber(contactPhone)) {
      setError('Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số.');
      return;
    }

    if (!validateEmail(contactEmail)) {
      setError('Email không hợp lệ.');
      return;
    }

    setError('');

    const customerInfo = {
      contactName,
      contactPhone,
      contactEmail,
    };

    // Lưu thông tin vào local storage
    localStorage.setItem('contactInfo', JSON.stringify(customerInfo));

    // Nếu có hàm onSave thì gọi hàm đó
    if (onSave) {
      onSave(customerInfo);
    }
    
    setIsEditing(false);
  };

  const handleEditContactInfo = () => {
    setIsEditing(true);
  };

  return (
    <section className="bg-white p-4 mt-4 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-2">Thông tin liên hệ</h3>
        <button
          type="button"
          onClick={isEditing ? handleSaveContactInfo : handleEditContactInfo}
          className="bg-[#4CA771] text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isEditing ? 'Lưu thông tin liên hệ' : 'Chỉnh sửa chi tiết'}
        </button>
      </div>

      {isEditing ? (
        <div>
          <p>Thông tin liên hệ (nhận vé/phiếu thanh toán)</p>
          <div className="mb-4">
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
              Họ tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contactName"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="sm:flex w-full justify-between">
            <div className="mb-4 w-1/2 pr-2">
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                Điện thoại di động<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 w-1/2 pl-2">
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p><strong>Họ tên:</strong> {contactName || 'Chưa có thông tin'}</p>
          </div>
          <div className="sm:w-[80%] sm:flex justify-between items-center">
            <div className="mb-4">
              <p><strong>Điện thoại di động:</strong> {contactPhone || 'Chưa có thông tin'}</p>
            </div>
            <div className="mb-4">
              <p><strong>Email:</strong> {contactEmail || 'Chưa có thông tin'}</p>
            </div>
          </div>
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
    </section>
  );
};

export default ContactInfoForm;
