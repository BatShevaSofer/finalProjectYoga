import React from 'react';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ data }) => {
  const levels = ['Beginners', 'Advanced', 'Experts'];

  return (
    <div className='col-md-3 text-center shadow' style={{ width: '30%', margin: '10px', border: '1px solid rgb(226, 120, 141)', padding: '20px' }}>
      <h3>{`Level: ${levels[data.level - 1]}`}</h3>
      <p>{`Age Group: ${data.ageGroup}`}</p>
      <p>{`Gender: ${data.gender ? 'Male' : 'Female'}`}</p>
      <p>{data.description}</p>
    </div>
  );
}

const DisplayAllCourses = ({ courses }) => {
  const nav = useNavigate();

  const groupByAge = courses.reduce((acc, course) => {
    acc[course.ageGroup] = [...(acc[course.ageGroup] || []), course];
    return acc;
  }, {});

  return (
    <div className='container'>
      <div className='row  my-4'>
        <h2 className='display-3 all_program_title' >FOR KIDS</h2>
        {groupByAge['child'] && groupByAge['child'].map(course => (
          <CourseCard key={`${course.level}-${course.ageGroup}`} data={course} />
        ))}
      </div>
      <div className='row  my-4'>
        <h2 className='display-3 all_program_title'>FOR TEENS</h2>
        {groupByAge['teen'] && groupByAge['teen'].map(course => (
          <CourseCard key={`${course.level}-${course.ageGroup}`} data={course} />
        ))}
      </div>
      <div className='row  my-4 ' >
        <h2 className='display-3 all_program_title'>FOR ADULTS</h2>
        {groupByAge['adult'] && groupByAge['adult'].map(course => (
          <CourseCard key={`${course.level}-${course.ageGroup}`} data={course} />
        ))}
      </div>
      <div className='text-center'>
      <button className='btn btn-outline-secondary text-center m-4 col-md-3'onClick={() =>nav('/signUp')}>Join Us</button>
</div>
    </div>
    
  );
}

export default DisplayAllCourses;
