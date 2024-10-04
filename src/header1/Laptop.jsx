import React, { useState, useEffect } from "react";
import axios from 'axios';
import Traveloka from '../assets/Logo1.png'; 
import Laugues from './Laugues'; 
import Suppor from './Suppor';
import Login from './Login';
import More from './More';
import UserInfo from './UserInfo';
import Savelist from './Savelist'; 
import { Link } from "react-router-dom";

function Laptop() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [selectedSection, setSelectedSection] = useState('Settings'); // Add state for selectedSection

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(userData.token); 
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
  };

  return (
    <div>
      <div className="fixed top-0 z-50 w-full bg-white shadow-md">
        <div className='container max-w-[1280px] w-[68%] mx-auto'>
          <div className="mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href='/'>
                <img src={Traveloka} alt="Traveloka" className='h-28 w-40 py-2 px-2' />
              </a>
            </div>

            <div className='flex justify-between items-center'>
              <Laugues />
              <div className='flex items-center'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcMarketingPromoBadge"><circle cx="12" cy="12" r="10" stroke="#0194f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M8.5 17.5L15.5 6.5C15.5 6.5 14 8.00002 12 8.00002C10 8.00002 8 7.05 8 7.05M8 7.00002V7.00002C9.10457 7.00002 10 7.89545 10 9.00002V9.00002C10 10.1046 9.10457 11 8 11V11C6.89543 11 6 10.1046 6 9.00002V9.00002C6 7.89545 6.89543 7.00002 8 7.00002V7.00002ZM18 15V15C18 16.1046 17.1046 17 16 17V17C14.8954 17 14 16.1046 14 15V15C14 13.8954 14.8954 13 16 13V13C17.1046 13 18 13.8954 18 15Z" stroke="#91EC00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <a className='cursor-pointer hover:bg-slate-100 rounded-md py-2 px-2 text-sm font-medium'>Khuyến Mãi</a>
              </div>
              <Suppor />
              <a className='cursor-pointer hover:bg-slate-100 rounded-md py-2 px-2 text-sm font-medium'>Hợp tác với chúng tôi</a>
              
              <Link to='/Savelist'><a className='cursor-pointer hover:bg-slate-100 rounded-md py-2 px-2 text-sm font-medium'>Đã lưu</a></Link>
              <a className='cursor-pointer hover:bg-slate-100 rounded-md py-2 px-2 text-sm font-medium' onClick={() => setSelectedSection('SetPlace')}>Đặt chỗ của tôi</a>
              {user ? <UserInfo  /> : <Login />}
              {/* <Register/> */}
            </div>
          </div>
          <div className="flex space-x-4 mt-2">
            <a className="cursor-pointer hover:bg-slate-100 text-slate-500 font-bold py-2 px-2 rounded">Khách sạn</a>
            <a className="cursor-pointer hover:bg-slate-100 text-slate-500 font-bold py-2 px-2 rounded">Vé máy bay</a>
            <a className="cursor-pointer hover:bg-slate-100 text-slate-500 font-bold py-2 px-2 rounded">Vé xe khách</a>
            <a className="cursor-pointer hover:bg-slate-100 text-slate-500 font-bold py-2 px-2 rounded">Đưa đón sân bay</a>
            <a className="cursor-pointer hover:bg-slate-100 text-slate-500 font-bold py-2 px-2 rounded">Cho thuê xe</a>
            <a className="cursor-pointer hover:bg-slate-100 text-slate-500 font-bold py-2 px-2 rounded">Hoạt động & Vui chơi</a>
            <More />
          </div>
        </div>
      </div>
      <div className="pt-20">
         {/* Render MainContent with selectedSection */}
      </div>
    </div>
  );
}

export default Laptop;
