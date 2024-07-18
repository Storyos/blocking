import React from 'react';

const App = () => {
  const handleLogin = () => {
    console.log('Redirecting to Klip login page...');
    window.location.href = 'http://localhost:3001/klip/login';
  };

  return (
    <div>
      <button onClick={handleLogin}>Klip Login</button>
    </div>
  );
};

export default App;
