import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaymentSuccess from '../statusPayment/paymentSuccess';
import PaymentFailure from '../statusPayment/paymentFailure';
import PaymentPending from '../statusPayment/paymentPending';
import Header from '../../header1/Header';

function MainStatus() {
  const [status, setStatus] = useState('pending'); // Trạng thái mặc định là 'pending'

  return (
    <div className='mt-20'>
      <Header />
      
      {/* Các nút điều hướng trạng thái */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setStatus('success')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Success
        </button>
        <button
          onClick={() => setStatus('failure')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Failure
        </button>
        <button
          onClick={() => setStatus('pending')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Pending
        </button>
      </div>

      {/* Hiển thị component theo trạng thái */}
      <div className="mt-8">
        {status === 'success' && <PaymentSuccess />}
        {status === 'failure' && <PaymentFailure />}
        {status === 'pending' && <PaymentPending />}
      </div>
    </div>
  );
}

MainStatus.propTypes = {
  status: PropTypes.string,
};

export default MainStatus;
