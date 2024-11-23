/* eslint-disable no-unused-vars */
import React from 'react';
import TourItem from './TourItem';
import 'react-loading-skeleton/dist/skeleton.css';

// eslint-disable-next-line react/prop-types
const ToursList = ({ tours, view, loading }) => {
  return (
    <div className='mx-auto items-center justify-center bg-cover object-cover'>
      <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4' : 'space-y-4 p-4'}`}>
        {loading ? (
          Array(6).fill().map((_, index) => (
            <TourItem key={index} loading={true} />
          ))
        ) : (
          // eslint-disable-next-line react/prop-types
          tours.map((tour, index) => (
            <TourItem key={index} tour={tour} loading={false} />
          ))
        )}
      </div>
    </div>
  );
};

export default ToursList;