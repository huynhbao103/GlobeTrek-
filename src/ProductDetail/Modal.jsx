import React from 'react';

function Modal({ closeModal, children }) {
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg w-[70%] z-50 overflow-y-auto ">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-900" onClick={closeModal}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>  
  );
}

export default Modal;
