import React, { useState } from 'react';
import VN from '../assets/VN.svg';
import EN from '../assets/EN.svg';

const Select = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <select value={selectedOption} onChange={handleChange} className="form-select  rounded-md ring-0 focus:border-[#00875A] focus:ring-[#00875A]">
      {options.map((option, index) => (
        <option key={index} value={option.value} className="hover:bg-green-100">
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Sử dụng component
const App = () => {
  const options = [
    { label: 'VI | VND', value: 'vn' },
    { label: 'EN | SGD', value: 'en' },
    // Thêm các lựa chọn khác tại đây
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(options[0].value);

  const handleSelect = (value) => {
    setSelectedLanguage(value);
    console.log('Bạn đã chọn:', value);
  };

  return (
    <div className='cursor-pointer rounded-md py-2 px-4 text-base font-medium'>
      <div className='flex items-center border-1'>
        <img src={selectedLanguage === 'vn' ? VN : EN} alt="Flag" className='border rounded-full border-[#00875A]' />
        <Select options={options} onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default App;
