import React, { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Modal from "./Modal.jsx";
import GoogleMap from "./MapGoogle.jsx";

function Mapview() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Simulate loading state
  setTimeout(() => setLoading(false), 1000);

  return (
    <div className="bg-gray-100 w-[80%] flex shadow-md h-28 p-6 m-6 cursor-pointer">
      {modalOpen && <Modal closeModal={closeModal}><GoogleMap /></Modal>}
      <div onClick={openModal} className="flex">
        {loading ? (
          <Skeleton width={32} height={32} circle={true} />
        ) : (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-id="IcSystemMapLocation"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 21.5C12 21.5 4 16 4 10C4 5 7.5 2 12 2C16.5 2 20 5 20 10C20 16 12 21.5 12 21.5Z"
              stroke="#687176"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
              stroke="#35845F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        )}
        <div className="flex flex-col justify-center ml-4">
          <div className="flex flex-row items-center">
            {loading ? (
              <Skeleton width={120} height={20} />
            ) : (
              <>
                <p className="text-[#35845F] font-bold text-lg">Xem bản đồ</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-500 font-bold"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </>
            )}
          </div>
          {loading ? (
            <Skeleton width={150} height={16} />
          ) : (
            <p className="font-bold text-md">thành phố Hồ Chí Minh</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mapview;
