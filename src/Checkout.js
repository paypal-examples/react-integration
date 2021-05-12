import { PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  return (
    <div style={{ width: "75%", maxWidth: "500px" }}>
      <PayPalButtons 
        style={{ layout: "horizontal", tagline: "false" }} />
    </div>
  );
}

export default Checkout;
