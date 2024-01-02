


// import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const PaypalPaymentButton = () => {
  return (
    // <h1>Welcome to My Page</h1>
    <PayPalButton
      currency="ILS"
      amount="1000000"
      options={{
        clientId: "AV3iTBSDgQD2TCLN2yd8hvE5nkigqS8h6TYcsV6IkIGjkosfo9mGF5v1rWoL6W1N1QPfF-erY15Rujch"
      }}
      onSuccess={(details, data) => {
        // המידע החשוב של העסקה נמצא ב- data כמו token ו-orderId
        console.log("Transaction details:", details);
        console.log("Transaction data:", data);
      }}
      onCancel={(err) => {
        console.log(err);
        alert("The payment process has been canceled, try again");
      }}
    />
  );
};

export default PaypalPaymentButton;
