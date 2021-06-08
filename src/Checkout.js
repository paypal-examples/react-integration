import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";
import loading from './three-dots.svg';

function Checkout(props) {

  const [{ options, isPending,  isInitial}, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  const saveDeferLoadingHandler = () => {
    props.onDeferLoading(false);
  }


  function onCurrencyChange({ target: { value }}) {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  }

  return (
    <div style={{ width: "75%", maxWidth: "500px" }}>
      {isInitial ? <button onClick={saveDeferLoadingHandler}>Load JS SDK</button> : null}

      {isPending ? <img src={loading} /> : null}
      <PayPalButtons 
        style={{ layout: "horizontal", tagline: "false" }} />

      <select value={currency} onChange={onCurrencyChange}>
            <option value="USD">United States dollar</option>
            <option value="EUR">Euro</option>
        </select>  
    </div>
  );
}

export default Checkout;
