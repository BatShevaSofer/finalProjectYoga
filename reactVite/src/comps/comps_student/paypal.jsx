import React from 'react';
// import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate,useParams  } from 'react-router-dom';
import { useStudent } from '../../services/studentService';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
`;


const PaypalPaymentButton = () => {
  const { courseId } = useParams(); 
  const nav = useNavigate();
  const { addStudentToCourse} = useStudent();

  console.log("Rendering PaypalPaymentButton");
  const handleJoinButtonClick = async () => {
    try {
      console.log(courseId);
      const studentId = (JSON.parse(Cookies.get('user')))._id;
      console.log(studentId);
      
      const success = await addStudentToCourse(courseId, studentId);
  
      if (success) {
        // אם הוספת הסטודנט לקורס הצליחה, נפעיל את ה-alert
        alert("Welcome, you have successfully joined");
        nav('/student/schedule');
      } else {
        // אם הוספת הסטודנט לקורס נכשלה
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error joining the course:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <Container>

    <div  
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px'
      }}
    >
      <div style={{ margin: 'auto', width: '40%' }}> 
      {/* <PayPalButton
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
        style={{ width: '100%' }}  

      /> */}
    </div>

      <button
        style={{
          margin: 'auto',
          backgroundColor: '#FFB6C1', 
          color: 'white',              
          padding: '20px 30px',         
          borderRadius: '10px',         
          fontSize: '1.5em',            
          cursor: 'pointer'             
        }}
        onClick={handleJoinButtonClick}
        className='mt-4'
      >
        Joining the course
      </button>
    </div>
    </Container>

  );
};

export default PaypalPaymentButton;



