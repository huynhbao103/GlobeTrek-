import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Refunds = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const renderContent = () => {
    switch (activeTab) {
      case 'pending':
        return (
          <div className='flex  flex-col justify-center items-center'>
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2024/06/04/1717498754170-a62f2c4d4cf6d68f6a0a7932fdb3d6f5.svg?tr=h-190,q-75,w-260" alt="Sloth" className="max-w-full h-auto" />
            <p className="text-lg font-bold">Bạn không có bất kỳ yêu cầu hoàn tiền nào</p>
          </div>
        );
      case 'processing':
        return (
          <div className=' flex flex-col justify-center items-center'>
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2024/06/04/1717498754170-a62f2c4d4cf6d68f6a0a7932fdb3d6f5.svg?tr=h-190,q-75,w-260" alt="Sloth" className="max-w-full h-auto" />
            <p className="text-lg font-bold">Bạn không có bất kỳ yêu cầu hoàn tiền nào</p>
          </div>
        );
      case 'completed':
        return (
          <div className=' flex flex-col justify-center items-center'>
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2024/06/04/1717498754170-a62f2c4d4cf6d68f6a0a7932fdb3d6f5.svg?tr=h-190,q-75,w-260" alt="Sloth" className="max-w-full h-auto" />
            <p className="text-lg font-bold">Bạn không có bất kỳ yêu cầu hoàn tiền nào</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" bg-white p-5 rounded-lg max-w-full justify-center  mx-auto">
      <div className="flex-grow p-5">
        <header className="bg-blue-500 text-white p-5 rounded-lg text-center">
          <h1 className="text-2xl">Quản lý hoàn tiền của bạn</h1>
          <p>Gửi chi tiết ngân hàng để tiết kiệm thời gian.</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg mt-3">Gửi chi tiết ngân hàng</button>
        </header>

        <nav className="flex justify-around my-5">
          <div className={`py-4 cursor-pointer border-b-2  ${activeTab === 'pending' ? 'border-green-500 font-bold ' : 'border-transparent'}`} onClick={() => setActiveTab('pending')}>Đang chờ xử lý</div>
          <div className={`py-4 cursor-pointer border-b-2 ${activeTab === 'processing' ? 'border-green-500 font-bold' : 'border-transparent'}`} onClick={() => setActiveTab('processing')}>Đang xử lý</div>
          <div className={`py-4 cursor-pointer border-b-2 ${activeTab === 'completed' ? 'border-green-500 font-bold' : 'border-transparent'}`} onClick={() => setActiveTab('completed')}>Hoàn tất</div>
        </nav>

        <div className="text-center mt-5">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Refunds;
