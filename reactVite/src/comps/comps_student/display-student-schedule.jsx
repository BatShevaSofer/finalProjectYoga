import React from 'react';
import styled from 'styled-components';

const WeeklyScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  text-align: center;
  font-weight: bold;
  background-color: #f0f0f0;
`;

const ScheduleCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;
const Container = styled.div`
  min-height: 100vh;
`;
const DisplayStudentSchedule = ({ course }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const levels = ['Beginners', 'Advanced', 'Experts'];
  const hours = Array.from({ length: 7 }, (_, i) => i + 16);

  return (
    <Container>
      <WeeklyScheduleTable>
        <thead>
          <HeaderRow>
            <td></td> 
            {daysOfWeek.map((day, index) => (
              <ScheduleCell key={index}>{day}</ScheduleCell>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <ScheduleCell>{hour}:00</ScheduleCell>
              {daysOfWeek.map((day, index) => (
                <ScheduleCell key={index}>
                  {course && course.dateTime && course.dateTime.day.toLowerCase() === day.toLowerCase() && course.dateTime.hour === hour && (
                    <div>
                      <p>Course: {levels[course.level - 1]} ({course.gender ? 'Male' : 'Female'}-{course.ageGroup})</p>
                      <p>Time: {course.dateTime.hour}:00</p>
                      {/* <p>Teacher: {course.teacherId.user_id.name.firstName}</p> */}
                    </div>
                  )}
                </ScheduleCell>
              ))}
            </tr>
          ))}
        </tbody>
      </WeeklyScheduleTable>
      </Container>
    // </div>
  );
};

export default DisplayStudentSchedule;
