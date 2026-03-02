import React, { useMemo } from 'react';
import {
  PayPalProvider,
  PayPalOneTimePaymentButton,
  VenmoOneTimePaymentButton,
  PayPalGuestPaymentButton,
  PayPalSubscriptionButton,
  PayLaterOneTimePaymentButton,
  PayPalCreditOneTimePaymentButton,
  PayPalSavePaymentButton,
  PayPalCreditSavePaymentButton,
  usePayPal,
  useEligibleMethods,
  type OnApproveDataOneTimePayments,
  type OnApproveDataSubscriptionsPayments,
  type OnApproveDataSavePayments,
  type OnCancelDataOneTimePayments,
  type OnCancelDataSavePayments,
  type OnErrorData,
  type OnCompleteData
} from '@paypal/react-paypal-js/sdk-v6';

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';

const V6ButtonsWrapper: React.FC = () => {
  const { isHydrated, error, loadingStatus } = usePayPal();

  // Fetch eligibility
  useEligibleMethods({
    payload: {
      currencyCode: "USD",
      paymentFlow: "ONE_TIME_PAYMENT",
    },
  });

  // Create a PayPal order
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

  // Create vault token for save payment
  const createVaultToken = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/paypal-api/vault/create-setup-token-for-paypal-save-payment',
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
        return { vaultSetupToken: data.id };
      } catch (err) {
        console.error('Error creating vault token:', err);
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
      } catch (err) {
        console.error('Error capturing order:', err);
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
    onApprove: async (data: OnApproveDataSubscriptionsPayments) => {
      console.log('Subscription approved:', data);
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

  // Save payment callbacks
  const handleSavePaymentCallbacks = {
    onApprove: async (data: OnApproveDataSavePayments) => {
      console.log('Payment method saved:', data);
      console.log('Vault Setup Token:', data.vaultSetupToken);
    },

    onCancel: (data: OnCancelDataSavePayments) => {
      console.log('Save payment cancelled:', data);
    },

    onError: (data: OnErrorData) => {
      console.error('Save payment error:', data);
    },
  };

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        background: '#fee', 
        borderRadius: '8px',
        border: '2px solid #f00'
      }}>
        <h3 style={{ color: '#c00' }}>⚠️ SDK V6 Error</h3>
        <pre style={{ 
          background: '#fff', 
          padding: '10px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px'
        }}>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (!isHydrated) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>🔄 Loading PayPal SDK V6...</p>
        <p style={{ fontSize: '12px', color: '#666' }}>Status: {loadingStatus}</p>
      </div>
    );
  }

  return (
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
      <PayPalSavePaymentButton
        createVaultToken={createVaultToken}
        presentationMode="auto"
        {...handleSavePaymentCallbacks}
      />
      <PayPalCreditSavePaymentButton
        createVaultToken={createVaultToken}
        presentationMode="auto"
        {...handleSavePaymentCallbacks}
      />
      <PayPalSubscriptionButton
        createSubscription={createSubscription}
        presentationMode="auto"
        {...handleSubscriptionCallbacks}
      />
    </div>
  );
};

const V6Checkout: React.FC<{ namespace?: string }> = ({ namespace }) => {
  return (
    <div style={{ 
      padding: '20px', 
      background: '#e8f5e9', 
      borderRadius: '8px',
      border: '2px solid #4caf50',
      minHeight: '200px',
      flex: '1'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#2e7d32', fontWeight: 'bold' }}>
        🟢 SDK V6 (New)
      </h3>
      
      <PayPalProvider 
        clientId={CLIENT_ID}
        components={[
          'paypal-payments',
          'venmo-payments',
          'paypal-guest-payments',
          'paypal-subscriptions'
        ]}
        pageType="checkout"
        dataNamespace={namespace}
      >
        <V6ButtonsWrapper />
      </PayPalProvider>
    </div>
  );
};

export default V6Checkout;