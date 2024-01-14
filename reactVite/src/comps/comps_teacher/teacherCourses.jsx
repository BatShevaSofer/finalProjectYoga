
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // אייקון לסמל השעון
import PersonIcon from '@mui/icons-material/Person'; // אייקון לסמל האדם
import CakeIcon from '@mui/icons-material/Cake'; // אייקון לסמל העוגה
import RoomIcon from '@mui/icons-material/Room'; // אייקון לסמל המיקום
import { useTeacher } from '../../services/teacherService';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
`;
const TeacherCourses = () => {
  const [teacherCourses, setTeacherCourses] = useState(null);
  const { getCoursesTeacher } = useTeacher();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoursesTeacher();
        setTeacherCourses(data.data);
        console.log(teacherCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(teacherCourses);
  }, [teacherCourses]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Teacher Courses</h1>
        </Grid>
        {teacherCourses ? (
          teacherCourses.courses?.map(course => {
            const gender = course.gender ? 'female' : 'male';
            return (
              <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent style={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {`Level: ${course.level}`}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {`Gender: ${gender}`}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {`Age Group: ${course.ageGroup}`}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {`Day: ${course.dateTime.day}`}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {`Hour: ${course.dateTime.hour}:00`}
                    </Typography>
                  </CardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                    <AccessTimeIcon color="primary" />
                    <PersonIcon color="primary" />
                    <CakeIcon color="primary" />
                    <RoomIcon color="primary" />
                  </div>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <p>Loading teacher courses...</p>
          </Grid>
        )}
      </Grid>
    </Container>

  );
};

export default TeacherCourses;
