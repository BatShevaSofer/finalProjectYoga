import { useState } from 'react';
import { Card, Col, Modal, Button } from 'antd';
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
      
          

            <Card
              className='shadow px-4 pt-4'
              cover={
                <div style={{
                  display: 'flex',
                   flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <div style={{
                    flex: '2',
                    order: '1',
                  }}>
                    {teacher.user_id.image_url ? (
                      <div style={{
                        width: '150px', 
                        height: '150px',
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
                        width: '150px',
                        height: '150px', 
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
                  </div>
                  <div style={{
                    flex: '2',
                    order: '1',
                    paddingLeft: '20px',
                  }}>
                    <Card.Meta
                      title={`${teacher.user_id.name.firstName} ${teacher.user_id.name?.lastName}`}
                      description={`Age: ${calculateAge(teacher.user_id.birthDate)}`}
                    />
                    <br />
                    <Button onClick={showModal}>View Details</Button>
                  </div>
                </div>
              }
            >
            </Card>
       

          <Modal
            visible={visible}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <div style={{
                flex: '1',
                order: '2',
                paddingLeft: '20px',  // מרווח שמאלי
              }}>
                <h2 style={{ fontSize: '2em' }}>{`${teacher.user_id.name.firstName} ${teacher.user_id.name?.lastName}`}</h2>
                <p>{`Age: ${calculateAge(teacher.user_id.birthDate)}`}</p>
                <br />
                <p>{teacher.description}</p>
              </div>
              <div style={{
                flex: '1',
                order: '2',
                width: '300px',  // עדכון: הגדלת רוחב התמונה
                height: '300px',  // עדכון: הגדלת גובה התמונה
                // borderRadius: '50%',
                overflow: 'hidden',
                backgroundImage: `url("${teacher.user_id.image_url}")`,
                backgroundSize: 'cover',  // עדכון: כדי להביא את התמונה לגודל המלא
                backgroundPosition: 'center',  // עדכון: מרכז התמונה במודל
                backgroundRepeat: 'no-repeat'
              }}>
              </div>
            </div>
          </Modal>
      
    </>
  );
};

export default DisplayAllTeachers;
