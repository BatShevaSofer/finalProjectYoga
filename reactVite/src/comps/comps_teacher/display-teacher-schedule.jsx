import React from 'react';
import styled from 'styled-components';

const WeeklyScheduleWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TimeColumn = styled.td`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`;

const DayHeader = styled.th`
  text-align: center;
  font-weight: bold;
  padding: 10px;
  background-color: #f0f0f0;
`;

const CourseCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;
const Container = styled.div`
  min-height: 100vh;
`;

const displayTeacherSchedule = ({ courses }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const levels = ['Beginners', 'Advanced', 'Experts'];

  const hours = Array.from({ length: 7 }, (_, i) => 16 + i);

  return (
    <Container>
      <div className='container'>
        <WeeklyScheduleWrapper>
          <thead>
            <tr>
              <TimeColumn></TimeColumn>
              {daysOfWeek.map((day, index) => (
                <DayHeader key={index}>{day}</DayHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hourIndex) => (
              <tr key={hourIndex}>
                <TimeColumn>{`${hour}:00`}</TimeColumn>
                {daysOfWeek.map((day, dayIndex) => {
                  const coursesAtThisTimeAndDay = courses
                    .filter(course => course.dateTime.day.toLowerCase() === day.toLowerCase())
                    .filter(course => course.dateTime.hour === hour);

                  return (
                    <React.Fragment key={dayIndex}>
                      <CourseCell>
                        {coursesAtThisTimeAndDay.map((course, courseIndex) => (
                          <div key={courseIndex} style={{ marginBottom: '10px' }}>
                            <p>Course: {levels[course.level - 1]}-{course.ageGroup}</p>
                            <p>Time: {course.dateTime.hour}:00</p>
                            <p>Gender: {course.gender ? 'Male' : 'Female'}</p>
                          </div>
                        ))}
                      </CourseCell>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </WeeklyScheduleWrapper>
      </div>
    </Container>

  );
};

export default displayTeacherSchedule;
