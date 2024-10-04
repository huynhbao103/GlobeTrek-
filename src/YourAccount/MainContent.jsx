import React from 'react';
import Settings from './Settings';
import SetPlace from './SetPlace';
import SavedPassengers from './savedPassengers';
import Refunds from './Refunds';
import Transaction from './Transaction';
// Import other components as needed

const MainContent = ({ selectedSection }) => {
  switch (selectedSection) {
    case 'Settings':
      return <Settings />;
    case 'SetPlace':
      return <SetPlace />;
    case 'SavedPassengers':
      return <SavedPassengers />;
    case 'Refunds':
      return <Refunds />;
    case 'Transaction':
      return <Transaction />;
    // Add cases for other sections as needed
    default:
      return <Settings />;
  }
};

export default MainContent;
