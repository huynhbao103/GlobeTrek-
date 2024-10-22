import React, { useState, useEffect } from 'react';

function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600)
  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);
  const getPaymentButtonLabel = () => {
    if (selectedPaymentMethod === 'wallet') {
      return 'Thanh toán bằng ví điện tử';
    } else if (selectedPaymentMethod === 'atm') {
      return 'Thanh toán bằng ATM';
    } else if (selectedPaymentMethod === 'credit') {
      return 'Thanh toán bằng thẻ';
    }
    return 'Thanh toán tại cửa hàng';
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-trek-color-1 bg-opacity-15 text-trek-color-1 p-4 rounded-lg shadow-lg mt-6">
        <p className="text-xl font-bold">Thời gian còn lại để hoàn thành thanh toán: {formatTime(timeRemaining)}</p>
      </div>

      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Bạn muốn thanh toán thế nào?</h2>
        <div className="flex">
          <div className="w-2/3 pr-4">
            <h3 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h3>

            <div className="mb-4">
              <input
                type="radio"
                id="wallet"
                name="payment"
                value="wallet"
                onChange={handlePaymentChange}
                className="mr-2"
              />
              <label htmlFor="wallet" className="font-semibold">Ví điện tử khác</label>
              {selectedPaymentMethod === 'wallet' && (
                <div className="bg-green-100 p-2 mt-2 rounded-lg">
                  <p className="font-bold text-green-700">Vui lòng thanh toán qua: </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <input
                type="radio"
                id="atm"
                name="payment"
                value="atm"
                onChange={handlePaymentChange}
                className="mr-2"
              />
              <label htmlFor="atm" className="font-semibold">ATM Cards/Mobile Banking</label>
              {selectedPaymentMethod === 'atm' && (
                <div className="bg-yellow-100 p-2 mt-2 rounded-lg">
                  <p className="font-bold text-yellow-700">Chức năng này hiện đang được phát triển.</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <input
                type="radio"
                id="credit"
                name="payment"
                value="credit"
                onChange={handlePaymentChange}
                className="mr-2"
              />
              <label htmlFor="credit" className="font-semibold">Thẻ thanh toán</label>
              {selectedPaymentMethod === 'credit' && (
                <div className="bg-yellow-100 p-2 mt-2 rounded-lg">
                  <p className="font-bold text-yellow-700">Chức năng này hiện đang được phát triển.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Tổng giá tiền</h3>
            <p className="text-xl font-bold">450.000 VND</p>
          </div>
          <button className="w-full bg-trek-color-1 bg-opacity-20 text-trek-color-1 text-opacity-50 py-3 font-bold rounded-md hover:text-white hover:bg-trek-color-1">
            {getPaymentButtonLabel()}
          </button>

          <p className="text-sm text-gray-600 mt-2">
            Bằng cách tiếp tục thanh toán, bạn đã đồng ý với 
             <a href="#" className="text-trek-color-1 font-bold">Điều khoản & Điều kiện</a>
             {" "}của chúng tôi và bạn đã đọc{" "}
             <a href="#" className="text-trek-color-1 font-bold">
             Chính Sách Quyền Riêng Tư
             </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
