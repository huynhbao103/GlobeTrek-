import React from 'react';
import { Button, Result } from 'antd';
import Header from '../header';

function PaymentPending() {
    <Header/>
  return (
    <Result
      title="Giao dịch đang được thực hiện"
      subTitle="Xin vui lòng chờ trong giây lát, chúng tôi đang xử lý giao dịch của bạn."
      extra={
        <Button type="primary" key="console">
          Kiểm tra trạng thái
        </Button>
      }
    />
  );
}

export default PaymentPending;
