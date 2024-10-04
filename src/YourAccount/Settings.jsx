import React, { useState } from 'react';

import Security from './SecurityPassword';
import Newsletter from './Newsletter';
import UserAccount from './UserAccount';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('UserAccount'); // Trạng thái lưu tab hiện tại

  // Hàm xử lý việc chuyển đổi giữa các tab
  const renderContent = () => {
    switch (activeTab) {
      case 'UserAccount':
        return <UserAccount />;
      case 'Security':
        return <Security />;
      case 'Newsletter':
        return <Newsletter />;
      default:
        return null;
    }
  };

  return (
    <>
   
      <div className='w-full h-auto'>
        <div className="flex max-w-[1280px] justify-center mx-auto flex-row items-start pb-10">
          {/* <SidebarAccount /> */}
          <div className="w-full max-w-5xl ml-5 mx-auto rounded-lg">
            <h1 className="sm:text-2xl text-sm font-bold mb-4">Cài đặt</h1>
            <div className="flex mb-4">
              <button
                onClick={() => setActiveTab('UserAccount')}
                className={`py-2 text-sm px-4 mr-2 ${activeTab === 'UserAccount' ? 'bg-[#4CA771] rounded-md text-white' : 'bg-white rounded-md'}`}
              >
                Thông tin tài khoản
              </button>
              <button
                onClick={() => setActiveTab('Security')}
                className={`py-2 text-sm px-4 mr-2 ${activeTab === 'Security' ? 'bg-[#4CA771] rounded-md text-white' : 'bg-white rounded-md'}`}
              >
                Mật khẩu và bảo mật
              </button>
              <button
                onClick={() => setActiveTab('Newsletter')}
                className={`py-2 text-sm px-4 ${activeTab === 'Newsletter' ? 'bg-[#4CA771] text-white rounded-md' : 'bg-white rounded-md'}`}
              >
                Bản tin với khuyến mãi
              </button>
            </div>
            <div>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Settings;
