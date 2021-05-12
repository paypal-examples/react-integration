import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import logo from './logo.svg';
import './App.css';
import Checkout from './Checkout';

function App() {
  const CLIENT_ID = 'test';

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Buy an atom!
        </p>
      <Checkout />
      </header>
    </div>
    </PayPalScriptProvider>
  );
}

export default App;
