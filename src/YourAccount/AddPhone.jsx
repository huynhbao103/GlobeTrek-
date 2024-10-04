import React from "react";

function AddEmail() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>Chưa có người dùng đăng nhập</p>;
  }

  return (
    <div>
      <div className="bg-white round-md p-8 mt-4">
      <div className="flex items-center justify-between mb-2">
        <div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Só di động</h3>
        
        <p className="text-gray-500 text-sm">Chỉ có thể sử dụng tối đa 3 só di động</p>
        </div>
        <button className=" text-white py-2 px-4 rounded-md bg-[#4CA771] hover:bg-[#00875A] mb-4">+ Thêm số di động</button>  
        </div>
        <hr className="mb-4" />
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center justify-normal">
          <p>Số điện thoại</p>
          <span className="text-[#4CA771] ml-4 ">
              Nơi nhận thông báo
            </span>
            </div>
          <div>
          
            <span className="text-red-500 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmail;
