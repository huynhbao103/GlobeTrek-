import React from 'react';
import PropTypes from 'prop-types';
import PaymentSuccess from '../statusPayment/paymentSuccess';
import PaymentFailure from '../statusPayment/paymentFailure';
import PaymentPending from '../statusPayment/paymentPending';
import Header from '../../header1/Header';

function MainStatus({ status }) {
  return (
    <div className='mt-20'>
      <Header /> 
      {status === 'success' && <PaymentSuccess />}
      {status === 'failure' && <PaymentFailure />}
      {status === 'pending' && <PaymentPending />}
    </div>
  );
}

MainStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default MainStatus;
