import React from 'react';
import { useMediaQuery } from 'react-responsive';
import '../fontawesome';
import Laptop from './Laptop';
import Mobile from './Mobile';

function Header() {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <div className=''>
      {isMobile ? <Mobile /> : <Laptop />}
    </div>
  );
}

export default Header;
