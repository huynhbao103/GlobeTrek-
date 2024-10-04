import React from 'react';
import logo1 from '../assets/Logo1.png'
import { Link } from 'react-router-dom';

function Header({ currentStep }) {
  const steps = ['Đặt', 'Xem lại', 'Thanh toán', 'Vé điện tử'];

  return (
    <div className=" top-0 z-50 w-full bg-white  flex  shadow-md">
      <div className=' w-[20%] '>
        <Link to='/'>
          <img className='h-28 w-40 py-2 px-2 ml-auto' src={logo1} alt="Logo" />
          </Link>
      </div>
    </div>
  );
}

export default Header;
