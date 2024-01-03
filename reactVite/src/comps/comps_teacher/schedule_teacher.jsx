// TeacherSchedule.js
import React, { useState, useEffect } from 'react';
import { useTeacher } from "../../services/teacherService";
import DisplayTeacherSchedule from './display-teacher-schedule';  // הוסף את היבוא של WeeklySchedule

const TeacherSchedule = () => {
    const { getCoursesTeacher } = useTeacher();
    const [courses, setCourses] = useState([]);


    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const data = await getCoursesTeacher();
                setCourses(data.data);
            } catch (error) {
                console.error('Error fetching teacher schedule:', error.message);
            }
        };

        fetchSchedule();
    }, []);

    return (
        <div className='container mt-4'>
          <h2>Teacher Weekly Schedule</h2>
          <DisplayTeacherSchedule courses={courses} />
        </div>
      );
    };

export default TeacherSchedule;
