import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from 'react';
import loadingSpinner from './three-dots.svg';

function Checkout() {

  const[{ options, isPending, isInitial}, dispatch] = usePayPalScriptReducer();

  const [currency, setCurrency] = useState(options.currency);

  function loadScript(){
    dispatch({
      type:"setLoadingStatus",
      value: "pending"
    });
  }

  function onCurrencyChange({target: {value}}){
    setCurrency(value);
    dispatch({
      type:"resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  }

  return (
    <div style={{ width: "75%", maxWidth: "500px" }}>

      {isInitial ? <button onClick={loadScript}>Load JS SDK</button> : null}

     {isPending ? <img src={loadingSpinner} /> : null}

      <PayPalButtons 
        style={{ layout: "horizontal", tagline: "false" }} />

      <select value={currency} onChange={onCurrencyChange}>
        <option value="USD">United States Dollar (USD)</option>
        <option value="EUR">Euro (EUR)</option>
        <option value="HKD">Hong Kong Dollar (HKD)</option>
      </select>

    </div>
  );
}

export default Checkout;
