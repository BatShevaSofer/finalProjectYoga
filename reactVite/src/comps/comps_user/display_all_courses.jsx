import React from 'react';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ data }) => {
  const nav = useNavigate();
  const levels = ['Beginners', 'Advanced', 'Experts'];

  return (
    <div className='col-md-3' style={{ width: '30%', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>{`Level: ${levels[data.level - 1]}`}</h3>
      <p>{`Age Group: ${data.ageGroup}`}</p>
      <p>{`Gender: ${data.gender ? 'Male' : 'Female'}`}</p>
      <p>{data.description}</p>
      <button className='btn btn-info'onClick={() =>nav('/signUp')}>Join</button>
    </div>
  );
}

const DisplayAllCourses = ({ courses }) => {
  const groupByAge = courses.reduce((acc, course) => {
    acc[course.ageGroup] = [...(acc[course.ageGroup] || []), course];
    return acc;
  }, {});

  return (
    <div className='container'>
      <div className='row text-center my-4'>
        <h2 className='display-3'>KIDS</h2>
        {groupByAge['child'] && groupByAge['child'].map(course => (
          <CourseCard key={`${course.level}-${course.ageGroup}`} data={course} />
        ))}
      </div>
      <div className='row text-center my-4'>
        <h2 className='display-3'>TEENS</h2>
        {groupByAge['teen'] && groupByAge['teen'].map(course => (
          <CourseCard key={`${course.level}-${course.ageGroup}`} data={course} />
        ))}
      </div>
      <div className='row text-center my-4' >
        <h2 className='display-3'>ADULTS</h2>
        {groupByAge['adult'] && groupByAge['adult'].map(course => (
          <CourseCard key={`${course.level}-${course.ageGroup}`} data={course} />
        ))}
      </div>
    </div>
  );
}

export default DisplayAllCourses;
