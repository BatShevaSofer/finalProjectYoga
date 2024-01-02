import { useEffect, useState } from 'react';
import { useMain } from "../../services/mainService";
import DisplayAllCourses from './display_all_courses'; 

const App = () => {
  const { getCoursesDetails } = useMain();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getCoursesDetails();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    fetchData();
}, []);

  return (
    <div className='container'>
      <h1>OUR PROGRAMS: </h1>
      <DisplayAllCourses courses={courses} />
    </div>
  );
};

export default App;

