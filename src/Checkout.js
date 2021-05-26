import React from "react";
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function Checkout(props) {
  //let cartTotal = 0.02;

  const createOrder = (data, actions) => {
    console.log("Creating order...");
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: props.cartTotal || 0.02
          },
        },
      ],
    });
  }

  const onApprove = (data, actions) => {
    console.log("Order approved...");
    return actions.order.capture().then(alert("Order complete!"));
  }

  return (
    <div style={{ width: "75%", maxWidth: "500px" }}>
      <PayPalButton
        style={{ layout: "horizontal", tagline: "false" }} 
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)} />
    </div>
  );
}

export default Checkout;
