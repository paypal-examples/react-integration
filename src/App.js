import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Checkout from './Checkout';

function App() {
  const CLIENT_ID = 'test';

  const [DeferLoadingProp, setDeferLoadingProp] = useState(true);

  const deferLoadingHandler = (loading) => {
    setDeferLoadingProp(loading);
  }

  return (
    <PayPalScriptProvider deferLoading={DeferLoadingProp} options={{ "client-id": CLIENT_ID }}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Buy an atom!
        </p>
      <Checkout onDeferLoading={deferLoadingHandler}/>
      </header>
    </div>
    </PayPalScriptProvider>
  );
}

export default App;
