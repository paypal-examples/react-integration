import React, { useMemo } from 'react';
import {
  PayPalProvider,
  PayPalOneTimePaymentButton,
  VenmoOneTimePaymentButton,
  PayPalGuestPaymentButton,
  PayPalSubscriptionButton,
  PayLaterOneTimePaymentButton,
  PayPalCreditOneTimePaymentButton,
  usePayPal,
  useEligibleMethods,
  type OnApproveDataOneTimePayments,
  type OnCancelDataOneTimePayments,
  type OnErrorData,
  type OnCompleteData
} from '@paypal/react-paypal-js/sdk-v6';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const CLIENT_ID = 'ASl9e-zXs-g68XtcbP9CszFbhX-juWzH1AulD-89qS6Z5wEnKfkP0SIecYE02Sq5VNpvr7ktncWOL5AG';

const V6Section: React.FC = () => {
  const { isHydrated, error, loadingStatus } = usePayPal();

  useEligibleMethods({
    payload: {
      currencyCode: "USD",
      paymentFlow: "ONE_TIME_PAYMENT",
    },
  });

  const createOrder = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/paypal-api/checkout/orders/create-order-for-one-time-payment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cart: [
                {
                  sku: '3xk9m4n2', // Official Baseball - $10.00
                  quantity: 1,
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Backend error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        return { orderId: data.id };
      } catch (err) {
        console.error('Error creating order:', err);
        throw err;
      }
    };
  }, []);

  // Create subscription
  const createSubscription = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/paypal-api/billing/create-subscription',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Backend error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        return { subscriptionId: data.id };
      } catch (err) {
        console.error('Error creating subscription:', err);
        throw err;
      }
    };
  }, []);

  // One-time payment callbacks
  const handlePaymentCallbacks = {
    onApprove: async (data: OnApproveDataOneTimePayments) => {
      console.log('Payment approved:', data);
      try {
        const response = await fetch(
          `http://localhost:8080/paypal-api/checkout/orders/${data.orderId}/capture`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Capture failed: ${response.status} ${errorText}`);
        }

        const captureResult = await response.json();
        console.log('Payment capture result:', captureResult);
        alert(`Transaction completed! Order ID: ${data.orderId}`);
      } catch (err) {
        console.error('Error capturing order:', err);
        alert(`Error capturing order: ${err instanceof Error ? err.message : String(err)}`);
      }
    },

    onCancel: (data: OnCancelDataOneTimePayments) => {
      console.log('Payment cancelled:', data);
    },

    onError: (data: OnErrorData) => {
      console.error('Payment error:', data);
    },

    onComplete: (data: OnCompleteData) => {
      console.log('Payment session completed');
      console.log('On Complete data:', data);
    },
  };

  // Subscription callbacks
  const handleSubscriptionCallbacks = {
    onApprove: async (data: OnApproveDataOneTimePayments) => {
      console.log('Subscription approved:', data);
      console.log('Payer ID:', data.payerId);
      alert(`Subscription completed! Subscription ID: ${data.orderId}`);
    },

    onCancel: (data: OnCancelDataOneTimePayments) => {
      console.log('Subscription cancelled:', data);
    },

    onError: (data: OnErrorData) => {
      console.error('Subscription error:', data);
    },

    onComplete: (data: OnCompleteData) => {
      console.log('Subscription session completed');
      console.log('On Complete data:', data);
    },
  };

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h3>SDK Error:</h3>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (!isHydrated) {
    return <div>Loading PayPal SDK... (Status: {loadingStatus})</div>;
  }

  return (
    <div style={{ 
      padding: '20px', 
      background: '#e8f5e9', 
      borderRadius: '8px',
      border: '2px solid #4caf50'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#2e7d32', fontWeight: 'bold' }}>
        🟢 SDK V6 (New)
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <PayPalOneTimePaymentButton
          createOrder={createOrder}
          presentationMode="auto"
          {...handlePaymentCallbacks}
        />
        <VenmoOneTimePaymentButton
          createOrder={createOrder}
          presentationMode="auto"
          {...handlePaymentCallbacks}
        />
        <PayPalGuestPaymentButton
          createOrder={createOrder}
          {...handlePaymentCallbacks}
        />
        <PayLaterOneTimePaymentButton
          createOrder={createOrder}
          presentationMode="auto"
          {...handlePaymentCallbacks}
        />
        <PayPalCreditOneTimePaymentButton
          createOrder={createOrder}
          presentationMode="auto"
          {...handlePaymentCallbacks}
        />
        <PayPalSubscriptionButton
          createSubscription={createSubscription}
          presentationMode="auto"
          {...handleSubscriptionCallbacks}
        />
      </div>
    </div>
  );
};

const Checkout: React.FC = () => {
  // V5 createOrder - returns order ID string directly
  const createOrderV5 = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/paypal-api/checkout/orders/create-order-for-one-time-payment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cart: [
                {
                  sku: '3xk9m4n2',
                  quantity: 1,
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Backend error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        return data.id; // V5 expects just the ID string
      } catch (err) {
        console.error('Error creating order:', err);
        throw err;
      }
    };
  }, []);

  // V5 Button callbacks
  const handleV5Callbacks = {
    onApprove: async (data: { orderID: string }) => {
      console.log('V5 Payment approved:', data);
      try {
        const response = await fetch(
          `http://localhost:8080/paypal-api/checkout/orders/${data.orderID}/capture`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Capture failed: ${response.status} ${errorText}`);
        }

        const captureResult = await response.json();
        console.log('V5 Payment capture result:', captureResult);
        alert(`V5 Transaction completed! Order ID: ${data.orderID}`);
      } catch (err) {
        console.error('Error capturing V5 order:', err);
        alert(`Error: ${err instanceof Error ? err.message : String(err)}`);
      }
    },

    onCancel: (data: any) => {
      console.log('V5 Payment cancelled:', data);
    },

    onError: (err: any) => {
      console.error('V5 Payment error:', err);
    },
  };

  return (
    <div style={{ width: '95%', maxWidth: '1400px', margin: '0 auto' }}>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* V5 Section */}
        <div style={{ flex: '1' }}>
          <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
            <div style={{ 
              padding: '20px', 
              background: '#e3f2fd', 
              borderRadius: '8px',
              border: '2px solid #2196f3',
              minHeight: '200px'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1976d2', fontWeight: 'bold' }}>
                🔵 SDK V5 (Legacy)
              </h3>
              <PayPalButtons
                createOrder={createOrderV5}
                onApprove={handleV5Callbacks.onApprove}
                onCancel={handleV5Callbacks.onCancel}
                onError={handleV5Callbacks.onError}
                style={{ layout: 'vertical' }}
              />
            </div>
          </PayPalScriptProvider>
        </div>

        {/* V6 Section */}
        <div style={{ flex: '1' }}>
          <PayPalProvider 
            clientId={CLIENT_ID}
            components={[
              'paypal-payments',
              'venmo-payments',
              'paypal-guest-payments',
              'paypal-subscriptions'
            ]}
            pageType="checkout"
          >
            <V6Section />
          </PayPalProvider>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
