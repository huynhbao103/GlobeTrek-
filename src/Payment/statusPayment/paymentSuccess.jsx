import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';

function PaymentStatus({ orderId }) {
  return (
    <div>
      <Result
        status="success"
        title="Thanh toán thành công! Vui lòng kiểm tra Email."
        subTitle={`Mã đơn hàng: ${orderId}`}
        extra={[
          <Button type="primary" key="details">
            Chi tiết giao dịch
          </Button>,
          <Button key="continue">Tiếp tục mua hàng</Button>,
        ]}
      />
    </div>
  );
}
PaymentStatus.propTypes = {
  orderId: PropTypes.string.isRequired,
};

export default PaymentStatus;
