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
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Tài khoản của bạn đã bị đóng băng. <a>Khôi phục ngay &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" /> Tài khoản của bạn chưa đủ điều kiện để giao dịch. <a>Mở khóa &gt;</a>
        </Paragraph>
      </div>
    </Result>
  );
}

export default PaymentFailure;
