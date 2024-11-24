import React from 'react';

const App = () => {
  const handleLogin = () => {
    console.log('Redirecting to Klip login page...');
    window.location.href = 'http://52.78.70.40:3001/klip/login';
  };

  return (
    <div>
      <button onClick={handleLogin}>Klip Login</button>
    </div>
  );
};

export default App;
