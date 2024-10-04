import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ConfirmBookingModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Booking"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-xl font-bold mb-4">Tất cả thông tin đặt chỗ của bạn đều đã chính xác?</h2>
      <p className="mb-4">Bạn sẽ không thể thay đổi thông tin đặt chỗ sau khi tiến hành thanh toán. Bạn có muốn tiếp tục?</p>
      <div className="flex justify-end">
        <button onClick={onRequestClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2">Kiểm tra lại</button>
        <button onClick={onConfirm} className="bg-[#4CA771] hover:bg-[#00875A] text-white font-bold py-2 px-4 rounded">Tiếp tục</button>
      </div>
    </Modal>
  );
};

export default ConfirmBookingModal;
