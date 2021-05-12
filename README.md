# React App PayPal Integration

A sample app demonstrating the use of [react-paypal-js](https://github.com/paypal/react-paypal-js) to add PayPal buttons to a basic React app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get started

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

## Further help

For more details and configuration options look at [react-paypal-js usasge](https://github.com/paypal/react-paypal-js#usage) and the [PayPal JavaScript SDK Complete Reference](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/)
