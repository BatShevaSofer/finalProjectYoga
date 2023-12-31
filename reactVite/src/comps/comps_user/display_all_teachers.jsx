import React from 'react';
import { Card, Col } from 'antd';
// import { Link } from 'react-router-dom';
import calculateAge from './helpers';

const DisplayAllTeachers = ({ teacher }) => {
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };
  return (
    <Col xs={24} sm={12} md={8} lg={6} className='mt-3 text-center'>
      {/* <Link to={`/teacher/${data.user_id?._id}`}> */}
      <Card
        className='shadow'
        cover={
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto',
          }}>
            {teacher.user_id.image_url ? (<div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto',
              backgroundImage: `url("${teacher.user_id.image_url}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
            </div>) : (
              <div style={{
                backgroundColor: '#a16e77',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2em',
                color: 'white'
              }}><strong>{getInitials(teacher.user_id.name.firstName)}</strong>
              </div>)}
          </div>}
      >
        <Card.Meta
          title={`${teacher.user_id.name.firstName} ${teacher.user_id.name?.lastName}`}
          description={`Age: ${calculateAge(teacher.user_id.birthDate)}`}
        />


      </Card>
      {/* </Link> */}
    </Col >
  );
};

export default DisplayAllTeachers;
