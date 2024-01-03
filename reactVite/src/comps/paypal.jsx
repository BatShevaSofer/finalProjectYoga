
// import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const PaypalPaymentButton = () => {
  console.log("Rendering PaypalPaymentButton");
  console.log("Rendering 111");
  return (
    
    <PayPalButton
      currency="ILS"
      amount="1"
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

// import React from "react";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// function Paypal() {
//     return (
//         <div className="App-body">

//           <PayPalScriptProvider
//             // options={{ "client-id": import.meta.env.VITE_CLIENT_ID }}
//           >
//             <PayPalButtons
//               createOrder={(data, actions) => {
//                 return actions.order.create({
//                   purchase_units: [
//                     {
//                       amount: {
//                         value: "13.99",
//                       },
//                     },
//                   ],
//                 });
//               }}
//               onApprove={async (data, actions) => {
//                 const details = await actions.order.capture();
//                 const name = details.payer.name.given_name;
//                 alert("Transaction completed by " + name);
//               }}
//             />
//           </PayPalScriptProvider>
//         </div>
//       );
//     }

// export default Paypal