import { PayPalButtons } from '@paypal/react-paypal-js';

function Checkout() {
  return (
    <div style={{ width: '75%', maxWidth: '500px' }}>
      <PayPalButtons
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </div>
  );
}

export default Checkout;
