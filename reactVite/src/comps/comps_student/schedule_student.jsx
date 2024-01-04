import { useState, useEffect } from 'react';
import { useStudent } from "../../services/studentService";
import DisplayStudentSchedule from './display-student-schedule'; 
import NotEnrolledMessage from './student_massage';

const ScheduleStudent = () => {
    const { getCourse } = useStudent();
    const [course, setCourse] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await getCourse();
                console.log('Response from getCoursesTeacher:', response);

                const data = response.data;
                setCourse(data.courses);

                // בדיקה אם המשתמש לא רשום לקורס
                if (!data.courses || data.courses.length === 0) {
                    setIsEnrolled(false);
                }

            } catch (error) {
                console.error('Error fetching teacher schedule:', error.message);
            }
        };

        fetchSchedule();
    }, [getCourse, setCourse, setIsEnrolled]);

    return (
        <div className='container mt-4'>
            {!isEnrolled ? (
                <NotEnrolledMessage />
            ) : (
                <>
                    <h2>Student Weekly Schedule</h2>
                    <DisplayStudentSchedule courses={course} />
                </>
            )}
        </div>
    );
};

export default ScheduleStudent;
