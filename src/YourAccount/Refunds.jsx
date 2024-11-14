import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import Footer from '../footer/Footer';
import Header from '../header1/Header';

const Refunds = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const renderContent = () => {
    return (
      <div className='flex flex-col justify-center items-center'>
        <img
          src="https://ik.imagekit.io/tvlk/image/imageResource/2024/06/04/1717498754170-a62f2c4d4cf6d68f6a0a7932fdb3d6f5.svg?tr=h-190,q-75,w-260"
          alt="Sloth"
          className="max-w-full h-auto"
        />
        <p className="text-lg font-bold">Bạn không có bất kỳ yêu cầu hoàn tiền nào</p>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="w-full mt-36 h-auto">
        <div className="flex max-w-[1280px] justify-center mx-auto flex-row items-start pb-10">
          <SidebarMenu />

          <div className="w-full max-w-5xl ml-5 mx-auto rounded-lg bg-white p-5">
            <header className="bg-green-400 text-white p-5 rounded-lg text-center mb-5">
              <h1 className="text-2xl">Quản lý hoàn tiền của bạn</h1>
              <p>Gửi chi tiết ngân hàng để tiết kiệm thời gian.</p>
              <button className="bg-orange-500 text-white py-2 px-4 rounded-lg mt-3">
                Gửi chi tiết ngân hàng
              </button>
            </header>

            <nav className="flex justify-around my-5">
              <div
                className={`py-4 cursor-pointer border-b-2 ${activeTab === 'pending' ? 'border-green-500 font-bold' : 'border-transparent'}`}
                onClick={() => setActiveTab('pending')}
              >
                Đang chờ xử lý
              </div>
              <div
                className={`py-4 cursor-pointer border-b-2 ${activeTab === 'processing' ? 'border-green-500 font-bold' : 'border-transparent'}`}
                onClick={() => setActiveTab('processing')}
              >
                Đang xử lý
              </div>
              <div
                className={`py-4 cursor-pointer border-b-2 ${activeTab === 'completed' ? 'border-green-500 font-bold' : 'border-transparent'}`}
                onClick={() => setActiveTab('completed')}
              >
                Hoàn tất
              </div>
            </nav>

            <div className="text-center mt-5">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default Refunds;
