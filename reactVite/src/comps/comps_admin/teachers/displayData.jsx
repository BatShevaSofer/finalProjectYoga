
import { CardContent } from '@mui/material';
import { Button, Card, Col, Modal, Table } from 'antd';
import { useState } from 'react';
const levels = ['Beginners', 'advanced', 'experts']
const DisplayData = ({ data }) => {
    const [visible, setVisible] = useState(false);
    const [visibleS, setVisibleS] = useState(false);
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    const showModal = () => {
        setVisible(true);

    };
    const handlestudents = () => {
        setVisibleS(true);
    }
    const handlestudentsC = () => {
        setVisibleS(false);
    }
    const handleCancel = () => {
        setVisible(false);
    };
    const dataSourceS = data.courses?.students?.map((student) => ({
        key: student.id,  // נוסיף key ייחודי לכל שורה
        column1: <strong>{student.name.firsName}</strong>,
        column2: <strong>{student.name.lastName}</strong>,
    })) || [];
    const dataSourceC = data.courses?.map((course) => ({
        key: course.id,  // נוסיף key ייחודי לכל שורה
        column1: <strong>{course.ageGroup}</strong>,
        column2: <strong>{course.gender}</strong>,
        column3: <strong>{course.level}</strong>,
        column4: <Button onClick={handlestudents}>view students</Button>
    })) || [];

    return (
        <>
            <Col span={4} className='mt-3 text-center'>

                <Card title={`${data.user_id?.name?.firstName} - ${data.user_id?.name?.lastName}`} className='shadow'>
                    {data.user_id.image_url ? (<div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto',
                        backgroundImage: `url("${data.user_id.image_url}")`,
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
                        }}><strong>{getInitials(data.user_id.name.firstName)}</strong></div>

                    )}
                    <Button onClick={showModal}>view courses</Button>
                </Card>
            </Col>
            <Modal
                // title="Students"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                {data.courses ? (
                    <Card className='text-center' title={`${data.user_id?.name?.firstName} - ${data.user_id?.name?.lastName}`}>
                        {data.image_url ? (<div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            margin: '0 auto',
                            backgroundImage: `url("${data.user_id.image_url}")`,
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
                            }}><strong>{getInitials(data.user_id?.name?.firstName)}</strong></div>

                        )}
                        <CardContent>

                            <Table
                                title={() => <h4>Courses</h4>}
                                columns={[
                                    {
                                        title: <strong>Age group</strong>,
                                        dataIndex: 'column1',
                                        key: 'column1',
                                    },
                                    {
                                        title: <strong>Gender</strong>,
                                        dataIndex: 'column2',
                                        key: 'column2',
                                    },
                                    {
                                        title: <strong>Level</strong>,
                                        dataIndex: 'column3',
                                        key: 'column3',
                                    },
                                    {
                                        title: <strong>view students</strong>,
                                        dataIndex: 'column4',
                                        key: 'column4',
                                    },
                                ]}
                                dataSource={dataSourceC}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    <p>there is not courses</p>
                )}


            </Modal>
            <Modal
                visible={visibleS}
                onCancel={handlestudentsC}
                footer={null}
            >
                <Table
                    title={() => <h4>Courses</h4>}
                    columns={[
                        {
                            title: <strong>first name</strong>,
                            dataIndex: 'column1',
                            key: 'column1',
                        },
                        {
                            title: <strong>last name</strong>,
                            dataIndex: 'column2',
                            key: 'column2',
                        }
                    ]}
                    dataSource={dataSourceS}
                />
            </Modal>
        </>
    );
}

export default DisplayData;