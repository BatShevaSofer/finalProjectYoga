

// import { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Grid } from '@mui/material';
// import { useTeacher } from '../../services/teacherService';
// const TeacherProfile = () => {
//   const [teacherInfo, setTeacherInfo] = useState(null);
//   const { getTeacherProfile } = useTeacher();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getTeacherProfile();
//         setTeacherInfo(data.data);
//       } catch (error) {
//         console.error("Error fetching teacher profile:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Grid container justifyContent="center" alignItems="center" height="100vh">
//       <Grid item xs={12} md={6}>
//         {teacherInfo ? (
//           <Card>
//             <CardContent>
//               <Typography variant="h4" gutterBottom>
//                 Teacher Profile
//               </Typography>
//               <Typography variant="h6" color="textSecondary">
//                 Name: {teacherInfo.name.firstName} {teacherInfo.name.lastName}
//               </Typography>
//               <Typography variant="h6" color="textSecondary">
//                 Email: {teacherInfo.email}
//               </Typography>
//               {/* Add more details as needed */}
//             </CardContent>
//           </Card>
//         ) : (
//           <p>Loading teacher info...</p>
//         )}
//       </Grid>
//     </Grid>
//   );
// };

// export default TeacherProfile;
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import { useTeacher } from '../../services/teacherService';

const TeacherProfile = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedName, setEditedName] = useState('');
  const { getTeacherProfile, updateTeacherEmail } = useTeacher();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeacherProfile();
        setTeacherInfo(data.data);
        setEditedEmail(data.data.email);
        setEditedName(`${data.data.name.firstName} ${data.data.name.lastName}`);
      } catch (error) {
        console.error("Error fetching teacher profile:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEmailClick = () => {
    setIsEditing(true);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const handleUpdateEmail = async () => {
    try {
      await updateTeacherEmail(editedEmail);
      setTeacherInfo((prevInfo) => ({ ...prevInfo, email: editedEmail }));
      // data=updateEmail(editedEmail)
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating teacher email:", error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} md={6}>
        {teacherInfo ? (
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Teacher Profile
              </Typography>
              <Typography variant="h6" color="textSecondary" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                Name: {editedName}
              </Typography>
              <Typography variant="h6" color="textSecondary" onClick={handleEmailClick} style={{ cursor: 'pointer' }}>
                Email: {editedEmail}
              </Typography>
              {isEditing ? (
                <div>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={editedEmail}
                    onChange={handleEmailChange}
                  />
                  <Button variant="contained" color="primary" onClick={handleUpdateEmail}>
                    Update Email
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : (
          <p>Loading teacher info...</p>
        )}
      </Grid>
    </Grid>
  );
};

export default TeacherProfile;
