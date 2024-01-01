

import { Button, Card, Col, Modal } from "antd";
import { Profiler } from "react";
import { useState } from "react";

// export default DisplayData;


const DisplayData = ({ data }) => {
    const [visible, setVisible] = useState(false);
    const levels = ['Beginners', 'advanced', 'experts']

    const showModal = () => {
        setVisible(true);

    };
    

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Col span={8} className='mt-3 text-center'>
                <Card title={`${levels[data.level - 1]} - ${data.gender ? 'Male' : 'Female'} - ${data.ageGroup}`} className='shadow'>
                    <p>day: {data.dateTime.day}</p>
                    <p>hour: {data.hour}</p>
                    <p>Teacher: {data.teacherId?.user_id.name.firstName} {data.teacherId?.user_id.name.lastName}</p>
                    <Button onClick={showModal}>view students</Button>
                </Card>
            </Col>
            <Modal
                title="Students"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                {data.students && data.students.map((student) => {
                    return <p key={student._id}>{student.name.firstName}  {student.name.lastName}</p>;
                })}
                
            </Modal>
        </>
    );
}

export default DisplayData;
