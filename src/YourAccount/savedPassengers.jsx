import  { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import Footer from '../footer/Footer';
import Header from '../header1/Header';

const SavedPassengers = () => {
  const [passengers, setPassengers] = useState([
    { id: Date.now(), firstName: '', lastName: '', email: '', phone: '', birthDate: '' },
  ]);

  const handleInputChange = (id, field, value) => {
    setPassengers(passengers.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { id: Date.now(), firstName: '', lastName: '', email: '', phone: '', birthDate: '' },
    ]);
  };

  const removePassenger = (id) => {
    setPassengers(passengers.filter(p => p.id !== id));
  };

  return (
    <>
      <Header />
      <div className="w-full mt-36 h-auto">
        <div className="flex max-w-[1280px] justify-center mx-auto flex-row items-start pb-10">
          <SidebarMenu />

          <div className="w-full max-w-5xl ml-5 mx-auto rounded-lg bg-white p-6">
            <h1 className="text-2xl font-bold mb-4">Thông tin hành khách</h1>
            <p className="mb-4">Bạn có thể lưu tối đa thông tin 20 hành khách</p>

            {passengers.map((passenger) => (
              <div key={passenger.id} className="mb-6 p-4 border border-green-500 rounded bg-white">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Hành khách {passenger.id}</span>
                  <button onClick={() => removePassenger(passenger.id)} className="text-red-500">
                    Xóa
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Tên"
                    className="border border-gray-300 rounded p-2"
                    value={passenger.firstName}
                    onChange={(e) => handleInputChange(passenger.id, 'firstName', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Họ"
                    className="border border-gray-300 rounded p-2"
                    value={passenger.lastName}
                    onChange={(e) => handleInputChange(passenger.id, 'lastName', e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 rounded p-2"
                    value={passenger.email}
                    onChange={(e) => handleInputChange(passenger.id, 'email', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Điện thoại"
                    className="border border-gray-300 rounded p-2"
                    value={passenger.phone}
                    onChange={(e) => handleInputChange(passenger.id, 'phone', e.target.value)}
                  />
                  <input
                    type="date"
                    className="border border-gray-300 rounded p-2"
                    value={passenger.birthDate}
                    onChange={(e) => handleInputChange(passenger.id, 'birthDate', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button onClick={addPassenger} className="bg-green-500 text-white px-4 py-2 rounded">
              Thêm hành khách
            </button>

            <div className="flex space-x-4 mt-4">
              <button className="bg-gray-300 px-4 py-2 rounded">Hủy</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Lưu</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SavedPassengers;
