import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProcessingModal = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Processing"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-xl font-bold mb-4">Vui lòng đợi</h2>
      <p>Chúng tôi đang xử lý đặt chỗ cho bạn. Tiến trình này có thể mất vài phút.</p>
    </Modal>
  );
};

export default ProcessingModal;
