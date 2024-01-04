import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate,useParams  } from 'react-router-dom';
import { useStudent } from '../services/studentService';
// import Cookies from 'js-cookie';


const PaypalPaymentButton = () => {
  const { courseId } = useParams(); 
  const nav = useNavigate();
  const { updateDetiles } = useStudent();

  console.log("Rendering PaypalPaymentButton");
  console.log("Rendering 111");

  const handleJoinButtonClick = async () => {
  
      try {
        console.log(courseId);
        // console.log(JSON.parse(Cookies.get('user')))
      // שליחת בקשת PATCH לעדכון המשתמש
      const response = await updateDetiles(
        "course_id",
        courseId
      );
  

      if (response) {
        // אם העדכון התבצע בהצלחה, אז נבצע את הניווט
        alert("Welcome, you have successfully joined");
        nav('/student/schedule');
      } else {
        alert('Failed to join the course. Please try again.');
      }
    } catch (error) {
      console.error('Error joining the course:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div  
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px'
      }}
    >
      <PayPalButton
        currency="ILS"
        amount="1"
        options={{
          clientId: "AV3iTBSDgQD2TCLN2yd8hvE5nkigqS8h6TYcsV6IkIGjkosfo9mGF5v1rWoL6W1N1QPfF-erY15Rujch"
        }}
        onSuccess={(details, data) => {
          console.log("Transaction details:", details);
          console.log("Transaction data:", data);
        }}
        onCancel={(err) => {
          console.log(err);
          alert("The payment process has been canceled, try again");
        }}
      />

      {/* כפתור "Join" */}
      <button
        style={{
          backgroundColor: '#FFB6C1', 
          color: 'white',              
          padding: '15px 30px',         
          borderRadius: '10px',         
          fontSize: '1.5em',            
          cursor: 'pointer'             
        }}
        onClick={handleJoinButtonClick}
      >
        Joining the course
      </button>
    </div>
  );
};

export default PaypalPaymentButton;




// import React from 'react';
// import { PayPalButton } from 'react-paypal-button-v2';

// const PaypalPaymentButton = () => {
//   console.log("Rendering PaypalPaymentButton");
//   console.log("Rendering 111");
//   return (
    
//     <PayPalButton
//       currency="ILS"
//       amount="1"
//       options={{
//         clientId: "AV3iTBSDgQD2TCLN2yd8hvE5nkigqS8h6TYcsV6IkIGjkosfo9mGF5v1rWoL6W1N1QPfF-erY15Rujch"
//       }}
//       onSuccess={(details, data) => {
//         // המידע החשוב של העסקה נמצא ב- data כמו token ו-orderId
//         console.log("Transaction details:", details);
//         console.log("Transaction data:", data);
//       }}
//       onCancel={(err) => {
//         console.log(err);
//         alert("The payment process has been canceled, try again");
//       }}
//     />
//   );
// };

// export default PaypalPaymentButton;
