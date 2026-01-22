import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalOrder {
  payer: {
    name: {
      given_name: string;
      surname?: string;
    };
    email_address?: string;
    payer_id?: string;
  };
  purchase_units?: Array<any>;
  status?: string;
}

interface OnApproveData {
  orderID: string;
  payerID?: string;
  paymentID?: string;
  billingToken?: string;
  facilitatorAccessToken?: string;
}

interface OnApproveActions {
  order: {
    capture: () => Promise<PayPalOrder>;
    get: () => Promise<PayPalOrder>;
  };
  redirect: (url: string) => void;
}

const Checkout: React.FC = () => {
  return (
    <div style={{ width: '75%', maxWidth: '500px' }}>
      <PayPalButtons
        onApprove={(data: OnApproveData, actions: OnApproveActions) => {
          return actions.order.capture().then((details: PayPalOrder) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </div>
  );
}

export default Checkout;
