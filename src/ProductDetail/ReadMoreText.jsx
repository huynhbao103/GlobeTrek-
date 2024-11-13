import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchTourById } from '../API/apiService';
import { useParams } from 'react-router-dom';
import Modal from './Modal';

const TourInfo = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchTourSchedules = async () => {
      try {
        setLoading(true);
        const response = await fetchTourById(id);
        console.log("Full API Response:", response);

        if (response && response.schedules && Array.isArray(response.schedules)) {
          setSchedules(response.schedules);
        } else {
          console.error("Invalid or missing schedule data:", response);
          setSchedules([]);
        }
      } catch (error) {
        console.error("Error loading schedules:", error);
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTourSchedules();
  }, [id]);

  const handleDayClick = (index) => {
    setSelectedDayIndex(index);
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center m-auto shadow-md max-w-[80%] sm:max-w-7xl p-4 rounded-lg">
      <div className="flex items-center">
        {loading ? (
          <Skeleton circle height={56} width={56} className="bg-[#165448]" />
        ) : (
          <p className="text-[#35845F] font-bold text-xl">?</p>
        )}
      </div>
      <div className="ml-4 flex flex-col">
        <div className="flex items-center">
          {loading ? (
            <Skeleton width={300} height={20} />
          ) : (
            <>
              <p className="text-[#35845F] font-semibold text-lg">Bạn sẽ trải nghiệm</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-[#35845F] ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </>
          )}
        </div>
        <div className="mt-1 text-gray-700 text-sm text-center">
          {loading ? (
            <Skeleton count={2} />
          ) : (
            <p className="overflow-hidden max-h-14">
              {schedules.length > 0 ? schedules[selectedDayIndex]?.activity : 'No schedule data available.'}
            </p>
          )}
          {loading ? (
            <Skeleton width={80} height={20} />
          ) : (
            <button
              onClick={openModal}
              className="mt-3 text-[#35845F] font-medium hover:text-green-700 focus:outline-none transition-colors"
            >
              Đọc thêm
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="p-4 bg-white rounded-lg shadow-lg max-w-7xl w-full">
            <h2 className="text-black font-semibold text-lg text-center mb-3">
              {loading ? <Skeleton width={100} height={20} /> : 'Bạn sẽ trải nghiệm'}
            </h2>
            <div className="flex justify-center mb-3 space-x-2">
              {schedules.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDayClick(index)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    index === selectedDayIndex
                      ? 'bg-[#35845F] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-[#35845F] hover:text-white'
                  }`}
                >
                  Ngày {index + 1}
                </button>
              ))}
            </div>
            {loading ? (
              <Skeleton count={3} />
            ) : (
              <div className="text-gray-700 text-sm text-left">
                {schedules[selectedDayIndex]?.activity
                  .split('\n')
                  .map((line, idx) => (
                    <p key={idx} className="mb-2">
                      {line}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TourInfo;
