// import React from 'react';

const DisplaySchedule = ({ courses }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

 const getCellContent = (day, hour) => {
  const course = courses[day] && courses[day][hour];
  return course ? `${course.courseName} (${day} ${hour})` : '';
};

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => (
            <tr key={index}>
              <td>{hour}</td>
              {days.map((day, index) => (
                <td key={index}>{getCellContent(day, hour)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplaySchedule;
