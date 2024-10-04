import React, { useState, useEffect } from 'react';
import FacebookLoginComponent from './FacebookLoginComponent';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div>
      <FacebookLoginComponent />
      {user && (
        <div>
          <h2>Chào mừng, {user.name}</h2>
          <img src={user.picture.data.url} alt={user.name} />
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default App;
