import React from 'react';
import logo from './logo.svg';
import './App.css';
import Checkout from './Checkout';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          PayPal SDK V5 vs V6 Comparison Demo
        </p>
        <Checkout />
      </header>
    </div>
  );
}

export default App;
