import React from 'react';
import logo from './logo.svg';
import './App.css';
import V5Checkout from './V5Checkout';
import V6Checkout from './V6Checkout';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          PayPal SDK V5 vs V6 Side-by-Side Comparison
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          width: '95%', 
          maxWidth: '1400px',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}>
          <V5Checkout />
          <V6Checkout namespace="paypalV6" />
        </div>
      </header>
    </div>
  );
}

export default App;

