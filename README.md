# React App PayPal Integration

A sample app demonstrating the use of [react-paypal-js](https://github.com/paypal/react-paypal-js) to add PayPal buttons to a basic React app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started

Install the dependencies...

```bash
cd react-integration
npm install
```

...set up your environment variables by creating a `.env.local` file:

```bash
cp .env.example .env.local
```

...then log in to the [developer dashboard](https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdeveloper%2Fapplications) and get your client ID from your default application. Update the `REACT_APP_PAYPAL_CLIENT_ID` value in `.env.local` with your sandbox client ID...

> If you need help setting up your developer dashboard or finding your client ID, follow the first step in the getting started documentation to [get API credentials](https://developer.paypal.com/docs/business/get-started/#get-api-credentials)

...then start:

```bash
npm run start
```
Navigate to [localhost:3000](http://localhost:3000). You should see the app running.

## How It Works

1. Install react-paypal-js by running `npm install @paypal/react-paypal-js`
2. Import `PayPalScriptProvider` into _src/App.js_ and wrap the main app component with the `<PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>` tag.
3. Import `PayPalButtons` into _src/Checkout.js_ and include style, payment, and other desired props on `<PayPalButton/>`

## Further help

For more details and configuration options look at [react-paypal-js usasge](https://github.com/paypal/react-paypal-js#usage) and the [PayPal JavaScript SDK Complete Reference](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/)
