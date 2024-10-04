import React, { useState } from 'react';

const Switch = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition duration-300 ${isOn ? 'bg-green-300' : ''}`}
      onClick={toggleSwitch}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-300 ${isOn ? 'translate-x-6' : ''}`}
      ></div>
    </div>
  );
};

export default Switch;
