import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Header from './header1/Header';
import Footer from './footer/Footer';
import LoadingLogin from '../src/assets/LoadingLogin.jpg'

const NotLoggedIn = () => {
  return (
    <>
      <Header />
      <div className='max-w-screen-full  items-center justify-center flex '>
        <div 
          className="items-center min-h-screen mt-20 bg-cover object-contain bg-center" 
          style={{ backgroundImage: `url(${LoadingLogin})` }}
        >
          <div className="text-center p-6 mt-32 bg-opacity-80 rounded-lg max-w-md">
            <h1 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập</h1>
            <p className="text-gray-600 mb-4">Để tiếp tục sử dụng các tính năng, bạn cần phải đăng nhập vào hệ thống.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotLoggedIn;
