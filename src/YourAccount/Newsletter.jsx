import React from 'react'

import Switch from './Switch2'
function Newsletter() {
  return (
    <div>
        <div>
        <div>
      <div className="bg-white round-md p-8 mt-4">
      <div className="flex items-center justify-between mb-2">
        <div>
        <h3 className="text-lg font-semibold mt-2 mb-2">Quản lý đăng ký bản tin
        </h3>
        <p className='font-semibold text-gray-400 text-sm'>Chọn loại nội dung bạn muốn nhận</p>
        
   
        </div>
        </div>
        <hr className="mb-4" />
        
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center justify-normal">
              <div>
          <p className='font-semibold text-gray-400 text-lg'> GloBeTrek - Tin Khuyến Mãi</p>
          </div>
          
          </div>
          <Switch />
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Newsletter