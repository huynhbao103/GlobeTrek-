import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontawesome'; // Ensure fontawesome is imported correctly

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button 
        className="cursor-pointer hover:bg-slate-100 text-slate-500 font-bold py-2 px-4 rounded flex items-center"
        onClick={toggleDropdown}
      >
        More
        <FontAwesomeIcon icon="fa-solid fa-chevron-down" className="ml-1" />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border  border-gray-200 rounded shadow-lg">
          <a className="block px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 font-bold ">Combo tiết kiệm</a>
          <a  className="block px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 font-bold">Bảo hiểm du lịch</a>
          <a  className="block px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 font-bold">Phiếu quà tặng</a>
          <a className="block px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 font-bold">Du thuyền</a>
          <a  className="block px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 font-bold">Cẩm nang du lịch</a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
