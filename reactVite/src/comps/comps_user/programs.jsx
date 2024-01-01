import { useEffect, useState } from 'react';
import { useMain } from "../../services/mainService";
import DisplayAllCourses from './display_all_courses'; // הגדר את הנתיב לפי המיקום המתאים

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
    <div>
      <h1>OUR PROGRAMS: </h1>
      <DisplayAllCourses courses={courses} />
    </div>
  );
};

export default App;

// // import React from 'react'

// const Programs = () => {
//   const categories = ['kids', 'teens', 'adult'];

//   const levels = [1, 2, 3];

//   return (
//     <div className="container mt-4">
//       {categories.map(category => (
//         <div key={category}>
//           <h2>{category.toUpperCase()}</h2>
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             {levels.map(level => (
//               <div key={`${category}-${level}`} style={{ width: '30%', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
//                 <h3>{`Level ${level}`}</h3>
//                 <p>Card content goes here</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


// export default Programs