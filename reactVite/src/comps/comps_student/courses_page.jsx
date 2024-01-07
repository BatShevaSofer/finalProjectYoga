import { useState, useEffect } from 'react';
import { useMain } from "../../services/mainService";
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CoursesPageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const PaymentButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;
const CourseCard = styled.div`
border: 1px solid #ddd;
padding: 20px;
margin-bottom: 20px;
width: 250px;
display: flex;
flex-direction: column;
align-items: center;
`;

const LevelsHeader = styled.h2`
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
    <div className='row'>
      <h2 >Available Courses</h2>
      {levels.map(level => (
        <div className='col-md-4' key={level}>
          <LevelsHeader>{level} Level</LevelsHeader>
          <CoursesPageWrapper>
            {courses
              .filter(course => course.level == levels.indexOf(level) + 1)
              .map(course => (
                <CourseCard key={course._id} data={course}>
                  <h3>Course Details</h3>
                  <CourseDetails>
                    <p>Age Group: {course?.ageGroup}</p>
                    <p>Gender: {course?.gender ? 'Male' : 'Female'}</p>
                    <p>Level: {level}</p>
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
    </div>
  );
};

export default CoursesPage;