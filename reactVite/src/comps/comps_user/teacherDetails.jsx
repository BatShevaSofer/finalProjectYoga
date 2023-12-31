// // TeacherDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Card, Col } from 'antd';

// const TeacherDetails = () => {
//   const { id } = useParams();
//   const [teacherDetails, setTeacherDetails] = useState(null);

//   useEffect(() => {
//     const fetchTeacherDetails = async () => {
//       try {
//         // קוד קריאה לשרת בכדי לקבל את פרטי המורה לפי ה-id
//         const response = await fetch(`/api/teacherDetails/${id}`);
//         const data = await response.json();
//         setTeacherDetails(data);
//       } catch (error) {
//         console.error('Error fetching teacher details:', error);
//       }
//     };

//     fetchTeacherDetails();
//   }, [id]);

//   if (!teacherDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Col span={12} offset={6} className='mt-3 text-center'>
//       <Card
//         className='shadow'
//         cover={
//           <div style={{
//             width: '200px',
//             height: '200px',
//             borderRadius: '50%',
//             overflow: 'hidden',
//             margin: '0 auto',
//           }}>
//             <img
//               src={teacherDetails.image_url}
//               alt={`${teacherDetails.name?.firstName} ${teacherDetails.name?.lastName}`}
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             />
//           </div>
//         }
//       >
//         <Card.Meta
//           title={`${teacherDetails.name?.firstName} ${teacherDetails.name?.lastName}`}
//           description={`Age: ${teacherDetails.age}`}
//         />
//         <p>Additional Details: {teacherDetails.additionalDetails}</p>
//         {/* נוסיף כל פרט אחר שתרצה להציג */}
//       </Card>
//     </Col>
//   );
// };

// export default TeacherDetails;
