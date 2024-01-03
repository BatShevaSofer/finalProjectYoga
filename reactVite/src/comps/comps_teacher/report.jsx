// TeacherSchedule.js
import React, { useState, useEffect } from 'react';
import { useTeacher } from "../../services/teacherService";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const TeacherSchedule = () => {
    const { getCoursesTeacher } = (useTeacher);
    const [schedule, setSchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await getCoursesTeacher();
                setSchedule(response.data);
            } catch (error) {
                console.error('Error fetching teacher schedule:', error.message);
            }
        };

        fetchSchedule();
    }, []);

    return (
        <div>
            <h2>Teacher Weekly Schedule</h2>
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
            />
            <div>
                {/* Display the schedule for the selected date */}
                {/* You can style this section as needed */}
                {schedule.map((course) => (
                    <div key={course._id}>
                        <p>{`Course: ${course.courseName}`}</p>
                        <p>{`Day: ${course.day}`}</p>
                        <p>{`Hour: ${course.hour}`}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherSchedule;
