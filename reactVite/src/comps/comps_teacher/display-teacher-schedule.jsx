import React from 'react';
import styled from 'styled-components';

const WeeklyScheduleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 10px;
  background-color: #f0f0f0;
`;

const CourseCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const displayTeacherSchedule = ({ courses }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const levels = ['Beginners', 'Advanced', 'Experts'];

  return (
    <div className='container'>
      <WeeklyScheduleWrapper>
        {daysOfWeek.map((day, index) => (
          <div key={index}>
            <DayHeader>{day}</DayHeader>
            {courses
              .filter(course => course.dateTime.day.toLowerCase() === day.toLowerCase())
              .map(course => (
                <CourseCard key={course._id}>
                  <p>Course: {levels[course.level - 1]}-{course.ageGroup}</p>
                  <p>Time: {course.dateTime.hour}:00</p>
                  <p>Gender: {course.gender ? 'Male' : 'Female'}</p>
                  {/* <p>Teacher: {course.teacherId.user_id.name.firstName}</p> */}
                </CourseCard>
              ))}
          </div>
        ))}
      </WeeklyScheduleWrapper>
    </div>
  );
};

export default displayTeacherSchedule;
