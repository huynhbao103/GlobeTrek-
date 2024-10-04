  import React from 'react';
import LogoGlobe from '../assets/LogoGlobe.png'; 

import iata from '../assets/iata.png'; 
import bsi from '../assets/bsi.png'; 
import registered from '../assets/registered.png';

import partner from '../assets/partner.png'; 

// ... import tất cả các hình ảnh đối tác thanh toán
import FacebookIcon from '../assets/Facebook.png';
import instagram from '../assets/instagram.png'; 
import tiktok from '../assets/tiktok.png'; 
import youtube from '../assets/youtube.png'; 
import telegram from '../assets/telegram.png'; 

import appStore from '../assets/app-store2.png'; 
import googlePlay from '../assets/google-play2.png'; // Thay thế bằng link hình ảnh Google Play

import IconMarketingPartnership from './IconMarketingPartnership';

const Footer = () => {
  return (
    <footer className="gradient-background h-full text-gray-400 py-4">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-start my-8">
          <div className="flex flex-col">
            <img src={LogoGlobe} alt="Logo" className="h-[50%] w-[50%] mb-4" />
            <div className="grid grid-cols-3 ">
              <img src={iata} alt="IATA" className="h-10" />
              <img src={bsi} alt="bsi" className="h-10" />
              <img src={registered} alt="Registered 1" className="h-10" />
              <img src={registered} alt="Registered 2" className=" mt-2 h-10" />
            </div>
            <button className="bg-[#013237] text-white py-3 px-3 items-center rounded my-4 flex w-[80%]">
        <IconMarketingPartnership />
        <span className="ml-2 font-bold text-sm">Hợp tác với Traveloka</span>
      </button>
            <h3 className="text-white font-bold mb-4">Đối tác thanh toán </h3>
            <div className="grid grid-cols-4 gap-4 p-2 ">
                
              <img src={partner} alt="Partner" className="p-2 h-16 bg-white rounded-md" />  </div>
          </div>
          <div className="flex space-x-16">
            <div>
            <div>
              <h3 className="text-white font-bold mb-4">Về Traveloka</h3>
              <ul>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237]  hover:underline">Cách đặt chỗ</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Liên hệ chúng tôi</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline ">Trợ giúp</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237]  hover:underline">Tuyển dụng</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237]  hover:underline">Về chúng tôi</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Tính năng mới ra mắt</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold my-4">Theo dõi chúng tôi trên</h3>
             
              <ul>
                <li className=' py-1 '><a href="#" className=" flex font-medium hover:text-white text-[#013237] hover:underline filter grayscale hover:filter-none hover:grayscale-0 ease-in-out"> <img src={FacebookIcon} alt="Facebook" className=" mr-4 h-5" /> FaceBook</a></li>
                <li className=' py-1 '><a href="#" className=" flex font-medium hover:text-white text-[#013237] hover:underline filter grayscale hover:filter-none hover:grayscale-0 ease-in-out"> <img src={instagram} alt="Instagram" className=" mr-4 h-5" /> Instagram</a></li>
                <li className=' py-1 '><a href="#" className=" flex font-medium hover:text-white text-[#013237] hover:underline filter grayscale hover:filter-none hover:grayscale-0 ease-in-out"> <img src={tiktok} alt="Tiktok" className=" mr-4 h-5" /> Tiktok</a></li>
                <li className=' py-1 '><a href="#" className=" flex font-medium hover:text-white text-[#013237] hover:underline filter grayscale hover:filter-none hover:grayscale-0 ease-in-out" > <img src={youtube} alt="Youtube" className=" mr-4 h-5" /> Youtube</a></li>
                <li className=' py-1 '><a href="#" className=" flex font-medium hover:text-white text-[#013237] hover:underline filter grayscale hover:filter-none hover:grayscale-0 ease-in-out"> <img src={telegram} alt="Telegram" className=" mr-4 h-5" /> Telegram</a></li>
              </ul>
            </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Sản phẩm</h3>
              <ul>
                <li className='py-1'><a href="#" className="hover:text-white text-[#013237] hover:underline ">Khách sạn</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Vé máy bay</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Vé xe khách</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Đưa đón sân bay</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Cho thuê xe</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Hoạt động & Vui chơi</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Du thuyền</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Biệt thự</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Căn hộ</a></li>
              </ul>
              
            </div>


            <div>
            <div>
              <h3 className="text-white font-bold mb-4">Khác</h3>
              <ul>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Traveloka Affiliate</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Traveloka Blog</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Chính Sách Quyền Riêng</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Điều khoản & Điều kiện</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Quy chế hoạt động</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Đăng ký nơi nghỉ của bạn</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Đăng ký doanh nghiệp hoạt động du lịch của bạn</a></li>
                <li className='py-1'><a href="#" className=" font-medium hover:text-white text-[#013237] hover:underline">Khu vực báo chí</a></li>
                <li className='py-1'><a href="#" className="font-medium hover:text-white text-[#013237] hover:underline" >Vulnerability Disclosure Program</a></li>
              </ul>
            </div>
            <div>
          <h4 className="font-bold text-white mb-4">Tải ứng dụng Traveloka</h4>
          <img src={googlePlay} alt="Google Play" className="mb-2 w-32  cursor-pointer filter grayscale hover:filter-none hover:grayscale-0 ease-in-out" />
          <img src={appStore} alt="App Store" className="mb-2 w-32  cursor-pointer filter grayscale hover:filter-none hover:grayscale-0 ease-in-out" />
        </div>
            </div>
            
          </div>
          
        </div>
     
        <div className="border-t border-gray-700 mt-4 pt-4 text-center text-gray-500 font-bold text-xs">
          Công ty TNHH Traveloka Việt Nam. Mã số DN: 0313581779. Tòa nhà An Phú, 117-119 Lý Chính Thắng, P. 7, Q. 3, TPHCM
        </div>
        <div className="text-center text-white font-bold text-sm mt-2">
          Copyright © 2024 Traveloka. All rights reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
