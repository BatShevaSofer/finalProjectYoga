import { Button, Card, Col, Modal, Table } from 'antd';
import calculateAge from '../../comps_user/helpers'
import { useState } from 'react';
import { CardContent } from '@mui/material';
import { useAdmin } from '../../../services/adminService';
const DisplayData = ({ data, key }) => {
    const [visible, setVisible] = useState(false);
    const levels = ['Beginners', 'advanced', 'experts']
    const { addTeacher } = useAdmin();
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    const showModal = () => {
        setVisible(true);

    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleChangeRole = async() => {
        await addTeacher(data._id);
        setVisible(false);
        
        
    }
    return (
        <>
            <Col span={4} className='mt-3 text-center'>

                <Card title={`${data.name.firstName}  ${data.name.lastName}`} className='shadow'>
                    {data.image_url ? (<div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto',
                        backgroundImage: `url("${data.image_url}")`,
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
                        }}><strong>{getInitials(data.name.firstName)}</strong></div>

                    )}
                    <p> age : {calculateAge(data.birthDate)}</p>
                    <p>phone: {data.phone}</p>
                    <p>email: {data.email}</p>
                    <Button onClick={showModal}>view details</Button>
                </Card>
            </Col >
            <Modal
                // title="Students"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <Card className='text-center' title={`${data.name.firstName}  ${data.name.lastName}`}>
                    {data.image_url ? (<div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto',
                        backgroundImage: `url("${data.image_url}")`,
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
                        }}><strong>{getInitials(data.name.firstName)}</strong></div>

                    )}
                    <CardContent>

                        <Table
                            title={() => <h4>Personal details</h4>}
                            columns={[
                                {
                                    dataIndex: 'column1',
                                    key: 'column1',
                                },
                                {
                                    dataIndex: 'column2',
                                    key: 'column2',
                                },
                            ]}
                            dataSource={[
                                {
                                    // key: '1',
                                    column1: <strong>id number</strong>,
                                    column2: data.id_number,

                                },
                                {
                                    // key: '2',
                                    column1: <strong>age</strong>,
                                    column2: calculateAge(data.birthDate),
                                },
                                {
                                    // key: '3',
                                    column1: <strong>phone</strong>,
                                    column2: data.phone,
                                },
                                {
                                    // key: '4',
                                    column1: <strong>email</strong>,
                                    column2: data.email,
                                },
                                {
                                    // key: '5',
                                    column1: <strong>address</strong>,
                                    column2: `${data.location.city}, ${data.location.street}, ${data.location.home}`,
                                },
                                {
                                    // key: '6',
                                    column1: <strong>Join Date:</strong>,
                                    column2: data.date_created,
                                },
                                {
                                    // key: '7',
                                    column1: <strong>HMO</strong>,
                                    column2: data.HMO,
                                },
                                {
                                    // key: '8',
                                    column1: <strong>age group</strong>,
                                    column2: data.ageGroup,
                                },

                                data.course_id ? (
                                    {
                                        // key: '8',
                                        column1: <strong>course level:</strong>,
                                        column2: levels[data.course_id.level - 1]
                                    },
                                    {
                                        // key: '8',
                                        column1: <strong>teacher name:</strong>,
                                        column2: (data.course_id?.teacherId) ? `${data.course_id?.teacherId.user_id.name.firstName} ${data.course_id?.teacherId.user_id.name.lastName}` : ('no course'),
                                    }
                                ) : (
                                    {
                                        column1: <strong>course:</strong>,
                                        column2: "no course",

                                    }
                                )


                            ]}
                        />
                    </CardContent>
                    <Button
                        onClick={handleChangeRole}

                    >Chenge user to teacher</Button>

                </Card>
            </Modal>
        </>
    );
}

export default DisplayData;

