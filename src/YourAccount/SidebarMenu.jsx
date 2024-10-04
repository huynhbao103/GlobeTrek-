import React, { useState } from 'react';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import icon5 from '../assets/icon5.png';
import icon6 from '../assets/icon6.png';
import icon7 from '../assets/icon7.png';
import icon8 from '../assets/icon8.png';
import icon9 from '../assets/icon9.png';
import User from "../assets/User.png";

const SidebarMenu = ({ setSelectedSection }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeSection, setActiveSection] = useState('Settings');
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>Chưa có người dùng đăng nhập</p>;
  }

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setActiveSection(section);
  };

  const menuItemClass = (section) =>
    `px-4 py-2 mt-2 cursor-pointer flex rounded-lg items-center hover:bg-green-100 ${
      activeSection === section ? 'bg-green-300' : ''
    }`;

  return (
    <div className="mt-2 w-auto p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className='flex items-center'>
        <img className="w-6 h-6 bg-[#00875A] rounded-full" src={User} alt="User" />
        <div className="p-4">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      <ul className="py-2">
        <li className="px-4 py-2 rounded-lg cursor-pointer hover:bg-green-100">0 Điểm</li>
    
        <hr/>
        <li
          className={menuItemClass('SetPlace')}
          onClick={() => handleSectionClick('SetPlace')}
        >
          <img src={icon4} alt="Đặt chỗ của tôi" className="w-4 h-4 mr-2" />
          Đặt chỗ của tôi
        </li>
        <li
          className={menuItemClass('Transaction')}
          onClick={() => handleSectionClick('Transaction')}
        >
          <img src={icon3} alt="Danh sách giao dịch" className="w-4 h-4 mr-2" />
          Danh sách giao dịch
        </li>
        <li
          className={menuItemClass('refunds')}
          onClick={() => handleSectionClick('refunds')}
        >
          <img src={icon5} alt="Hoàn tiền" className="w-4 h-4 mr-2" />
          Refunds <span className="mr-2 px-2 bg-yellow-200 rounded-full font-bold">New!</span>
        </li>
        <li
          className={menuItemClass('SavedPassengers')}
          onClick={() => handleSectionClick('SavedPassengers')}
        > 
          <img src={icon7} alt="Hành khách đã lưu" className="w-4 h-4 mr-2" />
          Hành khách đã lưu
        </li>
        {/* Add other sections */}
        <hr className='my-4'/>
        <li
          className={menuItemClass('Settings')}
          onClick={() => handleSectionClick('Settings')}
        >
          <img src={icon1} alt="Chỉnh sửa hồ sơ" className="w-4 h-4 mr-2" />
          Tài Khoản
        </li>
        <li className="px-4 py-2 cursor-pointer flex items-center hover:bg-green-100">
          <button
            className="flex items-center py-2 hover:bg-green-100 cursor-pointer"
            onClick={() => setShowLogoutModal(true)}
          >
            <img src={icon9} alt="Đăng xuất" className="w-4 h-4 mr-2" />
            Đăng xuất
          </button>
        </li>
      </ul>
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={cancelLogout} />
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10 relative transition-transform transform">
              <h2 className="text-2xl font-bold mb-3">Đang đăng xuất</h2>
              <p className="mb-4">
                Ôi không! Bạn sẽ bỏ lỡ rất nhiều điều khi đăng nhập: Điểm thưởng Traveloka, Passenger Quick Pick, Thông báo giá vé, và những quyền lợi khác chỉ dành cho thành viên. Bạn có chắc vẫn muốn đăng xuất?
              </p>
              <div className="flex justify-end">
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" onClick={cancelLogout}>Không</button>
                <button className="bg-[#4CA771] text-white px-4 py-2 rounded-md" onClick={confirmLogout}>Có</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
