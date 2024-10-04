import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Modal from './Modal';

const TourInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const text = (
    <>
      Đắm chìm dưới ánh hoàng hôn rực rỡ trên đảo Phú Quốc<br />
      Học kỹ thuật câu mực từ ngư dân<br />
      Thưởng thức bữa tối hải sản ngon miệng trên thuyền<br />
      Chụp những bức ảnh độc đáo bạn bè phải ganh tỵ!<br />
      Ánh hoàng hôn buông đỏ trên bãi biển trong xanh tạo nên 1 hình ảnh đẹp như tranh vẽ cho Phú Quốc. Tham gia ngay tour này để đắm chìm vào khoảnh khắc rực rỡ nhất trong ngày tại đảo ngọc. Đặc biệt, bạn còn được học các kỹ thuật câu mực từ ngư dân và áp dụng ngay để tự tay câu mực giữa biển đêm. Khi tàu quay trở lại bờ cũng là lúc bạn được thưởng thức bữa tối với các món hải sản tươi ngon. Hãy dành thời gian khám phá nhiều khía cạnh khác nhau của Phú Quốc rồi bạn sẽ có nhiều kỷ niệm đáng nhớ đấy!
    </>
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100 flex justify-center items-center m-auto shadow-md w-[80%] p-6">
      <div className=' flex rounded-3xl justify-center items-center'>
        {loading ? (
          <Skeleton circle={true} height={56} width={56} className="bg-[#165448]" />
        ) : (
          <p className='text-[#35845F] font-bold text-xl'> ? </p>
        )}
      </div>
      <div className='flex flex-col  justify-center ml-4'>
        <div className='flex flex-row'>
          {loading ? (
            <Skeleton width={500} height={20} />
          ) : (
            <>
              <p className='text-[#35845F] font-bold text-lg'>Bạn sẽ trải nghiệm</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-[#35845F] font-bold"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </>
          )}
        </div>
        <div className="justify-center flex flex-col items-center">
          <div className="text-gray-700 text-sm justify-center items-center  flex-col overflow-hidden max-h-16">
            {loading ? (
              <Skeleton count={3} />
            ) : (
              text
            )}
          </div>
          {loading ? (
            <Skeleton width={100} height={20} />
          ) : (
            <button
              onClick={openModal}
              className="text-[#35845F] justify-center hover:text-green-700 focus:outline-none"
            >
              Đọc thêm
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <p className='text-black font-bold text-lg mb-5'>
            {loading ? <Skeleton width={120} height={20} /> : 'Bạn sẽ trải nghiệm'}
          </p>
          {loading ? <Skeleton count={5} /> : text}
        </Modal>
      )}
    </div>
  );
};

export default TourInfo;
