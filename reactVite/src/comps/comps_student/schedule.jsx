import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const WeeklySchedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const businessHours = [16, 17, 18, 19, 20, 21, 22];
  
    const tileContent = ({ date }) => {
      const hour = date.getHours();
      return businessHours.includes(hour) ? <div className="available-hour" /> : null;
    };
  
    return (
      <div className="weekly-schedule-container">
        <h2>Weekly Schedule</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>
    );
  };
  
  export default WeeklySchedule;
  