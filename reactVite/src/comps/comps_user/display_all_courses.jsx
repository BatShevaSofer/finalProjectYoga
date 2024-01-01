import React from 'react'

const CourseCard = ({ level, ageGroup, description }) => (
    <div style={{ width: '30%', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>{`Level ${level}`}</h3>
      <p>{`Age Group: ${ageGroup}`}</p>
      {/* <p>{`gender: ${gender}`}</p> */}
      <p>{description}</p>
    </div>
  );
  
  const DisplayAllCourses = ({ courses }) => (
    <div>
      {courses.map(course => (
        <CourseCard key={`${course.level}-${course.ageGroup}`} {...course} />
      ))}
    </div>
  );

export default DisplayAllCourses