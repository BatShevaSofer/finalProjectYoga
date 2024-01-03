import { useState, useEffect } from 'react';
import { useAdmin } from "../../services/adminService";
import DisplaySchedule from './display-schedule';  // הוסף את היבוא של WeeklySchedule

const Schedule = () => {
  const { getCorses } = useAdmin();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCorses();
        setCourses(data.data);
    } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className='container mt-4'>
      <h2>Weekly Schedule</h2>
      <DisplaySchedule courses={courses} />
    </div>
  );
};

export default Schedule;
