import React from 'react';
import Settings from './Settings';
import SetPlace from './SetPlace';
import SavedPassengers from './savedPassengers';
import Refunds from './Refunds';
import Transaction from './Transaction';

const MainContent = ({ selectedSection }) => {
  switch (selectedSection) {
    case 'Settings':
      return <Settings />;
    case 'SetPlace':
      return <SetPlace />;
    case 'SavedPassengers':
      // return <SavedPassengers />;
    case 'Refunds':
      return <Refunds />;
    case 'Transaction':
      return <Transaction />;
    default:
      return <Settings />;
  }
};

export default MainContent;
