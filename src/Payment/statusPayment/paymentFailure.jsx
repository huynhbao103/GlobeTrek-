import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

function PaymentFailure() {
  return (
    <Result
      status="error"
      title="Giao dịch thất bại"
      subTitle="Vui lòng kiểm tra và chỉnh sửa thông tin trước khi thử lại."
      extra={[
        <Button type="primary" key="retry">
          Thử lại
        </Button>,
        <Button key="support">Liên hệ hỗ trợ</Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            Lỗi xảy ra trong quá trình giao dịch:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Số dư tài khoản không đủ. <a>Thanh toán lại &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> gì gì đó. <a>rồi gì gì đó &gt;</a>
        </Paragraph>
      </div>
    </Result>
  );
}

export default PaymentFailure;
