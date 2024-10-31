import React from 'react';
import SetplaceImage from '../assets/Setplace.png';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import Header from '../header1/Header';
import Footer from '../footer/Footer';

const SetPlace = ({ setSelectedSection }) => {
  const handleClick = () => {
    setSelectedSection('Transaction');
  };

  return (
    <>
    <Header/>
      <div className='w-full mt-36 h-auto'>
        <div className="flex max-w-[1280px] justify-center mx-auto flex-row items-start pb-10">
          <SidebarMenu setSelectedSection={setSelectedSection} />
          <div className="w-full max-w-5xl ml-5 mx-auto rounded-lg">
            <h1 className="sm:text-2xl text-sm font-bold mb-4">Traveloka Easy Reschedule</h1>
            
            <div className="bg-green-600 text-white flex justify-between p-4 rounded mb-4">
              <h1 className="text-2xl font-bold">Traveloka Easy Reschedule</h1>
              <div>
                <p className="text-white font-bold">Đổi lịch dễ như trở bàn tay.</p>
                <p className="text-white font-bold">Tìm hiểu thêm</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Vé điện tử & phiếu thanh toán hiện hành</h3>
              <div className="bg-white shadow rounded p-4 mt-2">
                <div className="text-center flex flex-col items-center">
                  <img src={SetplaceImage} alt="No Booking" className="mx-auto mb-4" />
                  <h4 className="text-lg font-bold">Không tìm thấy đặt chỗ</h4>
                  <p className="text-gray-700 font-semibold">
                    Mọi chỗ bạn đặt sẽ được hiển thị tại đây. Hiện bạn chưa có bất kỳ đặt chỗ nào, hãy đặt trên trang chủ ngay!
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">Lịch sử giao dịch</h3>
              <div className="bg-white shadow rounded p-4 mt-2 text-center">
                <p>
                  Xem <Link to='/Transaction'><span className="text-green-500 font-semibold cursor-pointer" onClick={handleClick}>Lịch sử giao dịch</span></Link> của bạn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SetPlace;
