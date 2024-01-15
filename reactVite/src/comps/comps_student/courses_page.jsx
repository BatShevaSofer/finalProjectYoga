import { useState, useEffect } from 'react';
import { useMain } from "../../services/mainService";
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
`;
const CoursesPageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const PaymentButton = styled.button`
  background-color: darksalmon;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top:40px ;
`;
const CourseCard = styled.div`
border: 2px solid rgba(213, 156, 166, 0.871);
padding: 20px;
min-height:300px;
margin-bottom: 20px;
width: 250px;
display: flex;
flex-direction: column;
align-items: center;
`;

const LevelsHeader = styled.h3`
  text-align: center;
`;

const CourseDetails = styled.div`
  margin-top: 10px;
`;

const levels = ['Beginner', 'Advanced', 'Expert'];

const CoursesPage = () => {
  const { getCoursesDetails } = useMain();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCoursesDetails = async () => {
      try {
        const data = await getCoursesDetails();
        console.log('Response from fetchCoursesDetails:', data);
        console.log(data);
        const dataFilter = data.filter(course => (
          course.ageGroup === JSON.parse(Cookies.get('user')).ageGroup &&
          course.gender === JSON.parse(Cookies.get('user')).gender
        ));
        console.log(dataFilter);
        setCourses(dataFilter);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoursesDetails();
  }, []);

  return (
    <Container>
      <div className='container'>
        <div className='row mt-4'>
          <h2 >Available Courses</h2>
          {levels.map(level => (
            <div className='col-md-4 mt-4' key={level}>
              <CoursesPageWrapper>
                {courses
                  .filter(course => course.level == levels.indexOf(level) + 1)
                  .map(course => (
                    <CourseCard key={course._id} data={course}>
                      <LevelsHeader>{level} Level</LevelsHeader>
                      <CourseDetails>
                        <p><strong>day: </strong> {course?.dateTime.day}</p>
                        <p><strong>teacher: </strong>{  (course?.teacherId) ? `${course?.teacherId.user_id.name.firstName} ${course?.teacherId.user_id.name.lastName}` : ('no teacher yet')}</p>
                      
                      </CourseDetails>
                      <Link to={`/student/pay/${course._id}`}
                        state={{ courseDetails: course }}>
                        <PaymentButton>Pay Now</PaymentButton>
                      </Link>
                    </CourseCard>
                  ))}
              </CoursesPageWrapper>
            </div>
          ))}
          <div className='row mt-4'>
            <div className="text-center border shadow m-4 py-4">
              <h3>payment</h3>
              <h5>Monthly payment is collected via direct debit/credit, $200 per month.</h5>

            </div>
          </div>
        </div>
      </div>
    </Container>

  );
};

export default CoursesPage;
