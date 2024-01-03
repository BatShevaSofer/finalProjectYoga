// TeacherSchedule.js
import { useState, useEffect } from 'react';
import { useStudent } from "../../services/studentService";
import DisplayStudentSchedule from './display-student-schedule'; 

const ScheduleStudent = () => {
    const { getCourse } = useStudent();
    const [course, setCourse] = useState([]);


    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await getCourse();
                console.log('Response from getCoursesTeacher:', response); 
        
                const data = response.data;
                setCourse(data.courses);
            } catch (error) {
                console.error('Error fetching teacher schedule:', error.message);
            }
        };

        fetchSchedule();
    }, []);

    return (
        <div className='container mt-4'>
          <h2>Teacher Weekly Schedule</h2>
          <DisplayStudentSchedule courses={course} />
        </div>
      );
    };

export default ScheduleStudent;
