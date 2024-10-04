import React from 'react'
import Switch from './Switch'
import Tooltip from './Tooltip'
import DeleteAcount from './DeleteAcount'


function security() {
  return (
    <div>
        <div>
      <div className="bg-white round-md p-8 mt-4">
      <div className="flex items-center justify-between mb-2">
        <div>
        <h3 className="text-lg font-semibold mt-2 mb-2">Xác thực</h3>
        
   
        </div>
        </div>
        <hr className="mb-4" />
        <Tooltip text="Gửi mã xác thực mới khi tài khoản của tôi được đăng nhập trên thiết bị mới">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center justify-normal">
              <div>
          <p className='font-semibold text-gray-400 text-sm'>Gửi mã OTP khi đăng nhập</p>
          <p className='font-semibold text-gray-400 text-sm'>Gửi mã xác thực mới khi tài khoản của tôi được đăng nhập trên thiết bị mới</p>
          </div>
          
          </div>
          <Switch />
        </div>
        </Tooltip>
      </div>
      <DeleteAcount/>
    </div>
    </div>
  )
}

export default security