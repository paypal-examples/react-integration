declare module '@paypal/react-paypal-js' {
  import { FC, ReactNode } from 'react';

  export interface PayPalScriptOptions {
    'client-id': string;
    currency?: string;
    intent?: string;
    locale?: string;
    'disable-funding'?: string;
    'data-client-token'?: string;
    components?: string;
    [key: string]: any;
  }

  export interface PayPalScriptProviderProps {
    options: PayPalScriptOptions;
    children: ReactNode;
    deferLoading?: boolean;
  }

  export const PayPalScriptProvider: FC<PayPalScriptProviderProps>;

  export interface PayPalButtonsProps {
    createOrder?: (data: any, actions: any) => Promise<string>;
    onApprove?: (data: any, actions: any) => Promise<void> | void;
    onCancel?: (data: any) => void;
    onError?: (err: any) => void;
    style?: {
      layout?: 'vertical' | 'horizontal';
      color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
      shape?: 'rect' | 'pill';
      height?: number;
      label?: 'paypal' | 'checkout' | 'buynow' | 'pay' | 'installment';
      tagline?: boolean;
    };
    disabled?: boolean;
    forceReRender?: any[];
  }

  export const PayPalButtons: FC<PayPalButtonsProps>;
  
  export const usePayPalScriptReducer: () => [any, any];
  export const SCRIPT_LOADING_STATE: {
    INITIAL: string;
    PENDING: string;
    REJECTED: string;
    RESOLVED: string;
  };
}