import { useState } from 'react';
import { Card, Col, Modal,Button } from 'antd';
import calculateAge from './helpers';

const DisplayAllTeachers = ({ teacher }) => {
  const [visible, setVisible] = useState(false);

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Col xs={24} sm={12} md={8} lg={6} className='mt-3 text-center'>
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
              {teacher.user_id.image_url ? (
                <div style={{
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
                </div>
              ) : (
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
                </div>
              )}
            </div>}
        >
          <Card.Meta
            title={`${teacher.user_id.name.firstName} ${teacher.user_id.name?.lastName}`}
            description={`Age: ${calculateAge(teacher.user_id.birthDate)}`}
          />
          <br />
          <Button onClick={showModal}>View Details</Button>
        </Card>
      </Col>

      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {teacher.user_id.image_url ? (
            <div style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              backgroundImage: `url("${teacher.user_id.image_url}")`,
            }}>
            </div>
          ) : (
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
            }}><strong>{getInitials(teacher.user_id.name.firstName)}</strong></div>
          )}

          <h2>{`${teacher.user_id.name.firstName} ${teacher.user_id.name?.lastName}`}</h2>
          <p>{`Age: ${calculateAge(teacher.user_id.birthDate)}`}</p>
          <p>{teacher.description}</p>
        </div>
      </Modal>
    </>
  );
};

export default DisplayAllTeachers;
