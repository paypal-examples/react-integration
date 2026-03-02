import React, { useMemo } from 'react';
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';

const V5ButtonsWrapper: React.FC = () => {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

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
        return data.id;
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

  if (isPending) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        🔄 Loading PayPal SDK V5...
      </div>
    );
  }

  if (isRejected) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#c00' }}>
        <p>⚠️ Failed to load PayPal SDK V5</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{ 
            marginTop: '10px', 
            padding: '8px 16px', 
            cursor: 'pointer',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }
  // Check if PayPal Buttons component is available
  const hasButtons = isResolved && typeof window !== 'undefined' && 
                     (window as any).paypal && 
                     (window as any).paypal.Buttons;

  if (!hasButtons) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#c00' }}>
        ⚠️ PayPal Buttons not available
      </div>
    );
  }

  return (
    <PayPalButtons
      createOrder={createOrderV5}
      onApprove={handleV5Callbacks.onApprove}
      onCancel={handleV5Callbacks.onCancel}
      onError={handleV5Callbacks.onError}
      style={{ layout: 'vertical' }}
    />
  );
};

const V5Checkout: React.FC = () => {
  if (!CLIENT_ID) {
    return (
      <div style={{ 
        padding: '20px', 
        background: '#e3f2fd', 
        borderRadius: '8px',
        border: '2px solid #2196f3',
        minHeight: '200px',
        flex: '1'
      }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1976d2', fontWeight: 'bold' }}>
          🔵 SDK V5 (Legacy)
        </h3>
        <div style={{ padding: '20px', textAlign: 'center', color: '#c00' }}>
          ⚠️ CLIENT_ID is not set. Check your .env.local file.
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      background: '#e3f2fd', 
      borderRadius: '8px',
      border: '2px solid #2196f3',
      minHeight: '200px',
      flex: '1'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1976d2', fontWeight: 'bold' }}>
        🔵 SDK V5 (Legacy)
      </h3>
      <PayPalScriptProvider 
        options={{ 
          'client-id': CLIENT_ID, 
          components: 'buttons',
          currency: 'USD'
        }}
      >
        <V5ButtonsWrapper />
      </PayPalScriptProvider>
    </div>
  );
};

export default V5Checkout;

