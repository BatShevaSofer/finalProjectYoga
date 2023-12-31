

// import * as React from 'react';
// // import Card from '@mui/material/Card';
// // import CardActions from '@mui/material/CardActions';
// // import CardContent from '@mui/material/CardContent';
// // import CardMedia from '@mui/material/CardMedia';
// // import Button from '@mui/material/Button';
// // import Typography from '@mui/material/Typography';
// // import { Grid } from '@mui/material';
// import { Button, Card, Col } from 'antd';
// const levels = ['Beginners', 'advanced', 'experts']
// const DisplayData = ({ data }) => {
//     return (
//         <>
//             <Col span={8} className='mt-3 text-center'>
//                 <Card title={`${levels[data.level-1]} - ${data.gender ? 'Male' : 'Female'} - ${data.ageGroup}`} className='shadow'>  
//                     <p>day: {data.dateTime.day}</p>
//                     <p>hour: {data.dateTime.hour}</p>
//                     <p>Teacher: {data.teacherId.user_id.name.firstName} {data.teacherId.user_id.name.lastName}</p>
//                 </Card>
//                 <Button >view students</Button>
//             </Col>
//         </>
//     );
// }

import { Button, Card, Col, Modal } from "antd";
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
                {data.students && data.students?.map((student) =>{
                    <p>{student.name.firstName} - {student.name.lastName}</p>
                })}
                
            </Modal>
        </>
    );
}

export default DisplayData;
