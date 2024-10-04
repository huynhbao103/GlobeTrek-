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
        className="cursor-pointer hover:bg-slate-100 rounded-md py-2 px-4 text-sm font-medium"onClick={toggleDropdown}> Hỗ trợ <FontAwesomeIcon icon="fa-solid fa-chevron-down" className="ml-1" />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border  border-gray-200 rounded shadow-lg">
          <a className="block px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 font-bold "> <FontAwesomeIcon icon="fa-regular fa-circle-question" /> Trợ giúp</a>
          <a  className="block px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 font-bold">Liên hệ với chúng tôi</a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
