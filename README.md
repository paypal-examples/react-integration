# React App PayPal Integration

A sample app demonstrating the use of the Smart Payment Buttons React driver to add PayPal buttons to a basic React app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started

Install the dependencies...

```bash
cd react-integration
npm install
```

...log in to the [developer dashboard](https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdeveloper%2Fapplications) and get your client ID from your default application. Change `const CLIENT_ID = 'test';` in _src/App.js_ so CLIENT_ID matches your sandbox client ID...

> If you need help setting up your developer dashboard or finding your client ID, follow the first step in the getting started documentation to [get API credentials](https://developer.paypal.com/docs/business/get-started/#get-api-credentials)

...then start:

```bash
npm run start
```
Navigate to [localhost:3000](http://localhost:3000). You should see the app running.

## How It Works

1. Add `<script src="https://www.paypal.com/sdk/js?client-id=test"></script>` to _public/index.html_, replacing "test" with your own client ID.
2. At the top of the checkout component, _src/Checkout.js_, pull in the React driver `const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });`
3. Style, payment, and other options are specified on the `<PayPalButton/>` tag.

## Further help

For more details and configuration options look at [react-paypal-js usasge](https://github.com/paypal/react-paypal-js#usage) and the [PayPal JavaScript SDK Complete Reference](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/)
