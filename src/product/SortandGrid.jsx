import React from 'react';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS for Skeleton

const SortandGrid = ({ onSortChange, view, setView, loading }) => {
  const options = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'priceLowHigh', label: 'Price: Low to High' },
    { value: 'priceHighLow', label: 'Price: High to Low' },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4CA771' : state.isFocused ? '#d1fae5' : '#ffffff',
      color: '#000',
      '&:hover': {
        backgroundColor: '#d1fae5',
      },
    }),
    control: (provided) => ({
      ...provided,
      borderColor: '#4CA771',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#4CA771',
      },
    }),
  };

  return (
    <div className="flex justify-between items-center p-2 bg-[rgba(174,249,231,0.2)] flex-wrap">
      {loading ? (
        <Skeleton width={300} height={30} />
      ) : (
        <h1 className="text-md sm:text-lg font-bold flex-shrink-0">
          Showing <span className="text-red-500">Tours</span> activities
        </h1>
      )}
      <div className="flex items-center space-x-4">
        <div className="w-full flex items-center md:w-auto px-6">
          <label className="mr-2 font-bold text-sm text-gray-400">
            {loading ? <Skeleton width={80} height={20} /> : 'Sort by:'}
          </label>
          {loading ? (
            <Skeleton width={150} height={40} />
          ) : (
            <Select
              options={options}
              styles={customStyles}
              onChange={(selectedOption) => onSortChange(selectedOption.value)}
              className="w-full md:w-64 font-bold text-sm text-gray-400"
            />
          )}
        </div>
        <div className="flex space-x-2">
          <button
            className={`p-2 border rounded ${view === 'grid' ? 'bg-[#4CA771] text-white' : 'bg-white'}`}
            onClick={() => setView('grid')}
            disabled={loading}
          >
            {loading ? <Skeleton width={50} height={20} /> : 'Grid'}
          </button>
          <button
            className={`p-2 border rounded ${view === 'list' ? 'bg-[#4CA771] text-white' : 'bg-white'}`}
            onClick={() => setView('list')}
            disabled={loading}
          >
            {loading ? <Skeleton width={50} height={20} /> : 'List'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortandGrid;
