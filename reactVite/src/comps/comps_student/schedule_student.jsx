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
                const data = response.data;

                setCourse(data.course_id);
                // בדיקה אם המשתמש לא רשום לקורס
                if (course==null ) {
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
                    <DisplayStudentSchedule course={course} />
                </>
            )}
        </div>
    );
};

export default ScheduleStudent;
