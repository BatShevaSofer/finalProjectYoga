import { useState, useEffect } from 'react';
import { useStudent } from "../../services/studentService";
import DisplayStudentSchedule from './display-student-schedule';
import NotEnrolledMessage from './student_massage';
import LinearProgress from '@mui/material/LinearProgress';

import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
`;
const ScheduleStudent = () => {
    const { getCourse } = useStudent();
    const [course, setCourse] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await getCourse();
                const data = response.data;

                setCourse(data.course_id);
                // בדיקה אם המשתמש לא רשום לקורס
                if (data.course_id  == null) {
                    setIsEnrolled(false);
                }

            } catch (error) {
                console.error('Error fetching teacher schedule:', error.message);
            }finally {
                // סיום פעולת הטעינה בכל מקרה (בצורת success או error)
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, [getCourse, setCourse, setIsEnrolled]);

    return (
        <Container>
            <div className='container mt-4'>
            {isLoading ? (
                    <LinearProgress /> // זמן טעינה
                ) : !isEnrolled ? (
                    <NotEnrolledMessage />
                ) : (
                    <>
                        <h2>Student Weekly Schedule</h2>
                        <DisplayStudentSchedule course={course} />
                    </>
                )}
            </div>
        </Container>

    );
};

export default ScheduleStudent;
